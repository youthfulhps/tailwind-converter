import { AST } from 'prettier';

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

type ComponentEntity = {
  name: string;
  tag: string;
  styles: [];
};

export function extractComponentEntityFromVariableDeclaration(
  declaration: any,
): ComponentEntity {
  const innerDeclaration = declaration.declarations[0];

  const name = innerDeclaration?.id.name ?? '';
  const tag = innerDeclaration?.init?.tag?.property?.name ?? '';
  const styles = innerDeclaration?.init?.quasi?.quasis[0].value.raw
    .split(/[\n;]+/)
    .filter((style: string) => !!style)
    .map((style: string) => style.trim());

  return { name, tag, styles };
}

// * className 속성을 가지고 있지 않다면?

export function hasOpeningElementClassNameAttribute(openingElement: any) {
  if (!openingElement.attributes || !openingElement.attributes.length) {
    return false;
  }

  return openingElement.attributes.some(
    (attribute: any) => attribute === 'className',
  );
}

export function getClassNameAttributeIndexFromOpeningElement(
  openingElement: any,
) {
  const { attributes } = openingElement;

  let classNameAttributeIndex = 0;

  attributes.forEach((attribute: any, index: number) => {
    if (attribute.name === 'className') {
      classNameAttributeIndex = index;
    }
  });

  return classNameAttributeIndex;
}

export function overrideClassNameAttributeRawValue(
  ast: any,
  functionDeclarationIndex: number,
  returnStatementIndex: number,
  classNameAttributeIndex: number,
) {
  ast.program.body[functionDeclarationIndex].body.body[
    returnStatementIndex
  ].argument.openingElement.attributes[
    classNameAttributeIndex
  ].value.extra.rawValue = 'px-2 py-4';
  ast.program.body[functionDeclarationIndex].body.body[
    returnStatementIndex
  ].argument.openingElement.attributes[
    classNameAttributeIndex
  ].value.extra.raw = '"px-2 py-4"';
  ast.program.body[functionDeclarationIndex].body.body[
    returnStatementIndex
  ].argument.openingElement.attributes[classNameAttributeIndex].value.value =
    'px-2 py-4';

  return ast;
}
