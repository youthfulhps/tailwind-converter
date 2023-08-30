/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { AST } from 'prettier';
import { generateJSXOpeningElementClassNameAttribute } from '~/helpers/generator';
import { JSXElement } from 'estree-jsx';
import { convertStyles } from '~/helpers/converter';

export function extractVariableDeclarations(ast: AST): any[] {
  if (!ast.program || !ast.program.body.length) {
    return [];
  }

  return ast.program.body.filter(
    (declaration: any) => declaration.type === 'VariableDeclaration',
  );
}

export function extractFunctionDeclarationsThatReturnJSXElement(
  ast: AST,
): any[] {
  if (!ast.program || !ast.program.body.length) {
    return [];
  }

  const functionDeclarationsWithIndex: { declaration: any; index: number }[] =
    [];

  ast.program.body.forEach((declaration: any, index: number) => {
    if (declaration.type === 'FunctionDeclaration') {
      functionDeclarationsWithIndex.push({
        declaration,
        index,
      });
    }
  });

  return functionDeclarationsWithIndex.filter((declaration) =>
    isJSXElementIncludedInFunctionReturns(declaration.declaration),
  );
}

export function getJSXElementReturnStatementIndexFromFunctionDeclaration(
  declaration: any,
) {
  const { body } = declaration.body;

  if (!body.length) {
    return [];
  }

  const returnStatementIndex: number[] = [];

  body.forEach((statement: any, index: number) => {
    if (statement.type === 'ReturnStatement') {
      returnStatementIndex.push(index);
    }
  });

  return returnStatementIndex;
}

export function isJSXElementIncludedInFunctionReturns(declaration: any) {
  const { body } = declaration.body;

  if (!body.length) {
    return false;
  }

  const returnStatement = body.filter(
    (statement: any) => statement.type === 'ReturnStatement',
  );

  if (!returnStatement.length) {
    return false;
  }

  const { argument } = returnStatement[0];

  return (
    argument?.type === 'JSXElement' &&
    argument?.openingElement?.type === 'JSXOpeningElement' &&
    // It's either a self-closing tag or a close tag
    (argument?.selfClosing ||
      argument?.closingElement?.type === 'JSXClosingElement')
  );
}

export function isVariableDeclarationThroughStyledFunction(
  declaration: any,
): boolean {
  const innerDeclaration = declaration.declarations[0];

  if (innerDeclaration?.type !== 'VariableDeclarator') {
    return false;
  }

  const { init } = innerDeclaration;

  if (init?.type !== 'TaggedTemplateExpression') {
    return false;
  }

  const { quasi, tag } = init;

  if (
    quasi?.type !== 'TemplateLiteral' ||
    quasi?.quasis[0].type !== 'TemplateElement'
  ) {
    return false;
  }

  return tag?.object.name === 'styled';
}

export type StyleEntity = {
  property: string;
  value: string;
};

export type ComponentEntity = {
  name: string;
  tag: string;
  styles: StyleEntity[];
};

export function extractComponentEntityFromVariableDeclaration(
  declaration: any,
): ComponentEntity {
  const innerDeclaration = declaration.declarations[0];

  const name = innerDeclaration?.id.name ?? '';
  const tag = innerDeclaration?.init?.tag?.property?.name ?? '';
  const styles = extractStylePropertyAndValue(
    innerDeclaration?.init?.quasi?.quasis[0].value.raw
      .split(/[\n;]+/)
      .filter((style: string) => !!style)
      .map((style: string) => style.trim()),
  );

  return { name, tag, styles };
}

export function extractStylePropertyAndValue(styles: string[]): StyleEntity[] {
  return styles.map((style) => {
    const [property, value] = style.split(':').map((value) => value.trim());
    return { property, value };
  });
}

export function overrideClassnameAttributeRecursively(
  parent: JSXElement,
  componentDeclarations: ComponentEntity[],
) {
  const styles = componentDeclarations.filter(
    (declaration) => declaration.name === parent.openingElement.name.name,
  )[0].styles;
  parent.openingElement.attributes =
    generateJSXOpeningElementClassNameAttribute(
      parent.openingElement.attributes,
      convertStyles(styles),
    );

  if (parent.children.length) {
    parent.children.forEach((children, index) => {
      if (children.type === 'JSXElement') {
        overrideClassnameAttributeRecursively(
          parent.children[index],
          componentDeclarations,
        );
      }
    });
  }

  return parent;
}
