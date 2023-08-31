import { AST } from 'prettier';
import { generateJSXOpeningElementClassNameAttribute } from '~/helpers/generator';
import { convertStyles } from '~/helpers/converter';

export function extractVariableDeclarations(ast: AST): any[] {
  if (!ast.program || !ast.program.body.length) {
    return [];
  }

  return ast.program.body.filter(
    (declaration: any) => declaration.type === 'VariableDeclaration',
  );
}

export type StyleEntity = {
  property: string;
  value: string;
};

type ComponentDeclaration = {
  name: string;
  tag: string;
  styles: StyleEntity[];
};

export function extractStylePropertyAndValue(styles: string[]): StyleEntity[] {
  return styles.map((style) => {
    const [property, value] = style.split(':').map((value) => value.trim());
    return { property, value };
  });
}

export function isObject(arg: unknown): arg is object {
  return typeof arg === 'object' && arg !== null;
}

export function getVariableDeclarationThroughStyledRecursively(ast: AST) {
  const componentDeclarations: ComponentDeclaration[] = [];

  function recursion(node: unknown) {
    if (!isObject(node) || !('type' in node)) {
      return;
    }

    Object.entries(node).forEach(([key, value]) => {
      if (key === 'type') {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((childNode: unknown) => {
          recursion(childNode);
        });
        return;
      }

      recursion(value);
    });

    if (
      node.type === 'VariableDeclarator' &&
      'id' in node &&
      isObject(node.id) &&
      'type' in node.id &&
      'name' in node.id &&
      node.id.type === 'Identifier' &&
      typeof node.id.name === 'string' && // 요게 컴포넌트 이름
      'init' in node &&
      isObject(node.init) &&
      'type' in node.init &&
      node.init.type === 'TaggedTemplateExpression' &&
      'tag' in node.init &&
      isObject(node.init.tag) &&
      'object' in node.init.tag &&
      isObject(node.init.tag.object) &&
      'type' in node.init.tag.object &&
      'name' in node.init.tag.object &&
      node.init.tag.object.type === 'Identifier' &&
      node.init.tag.object.name === 'styled' &&
      'property' in node.init.tag &&
      isObject(node.init.tag.property) &&
      'name' in node.init.tag.property &&
      typeof node.init.tag.property.name === 'string' && // 요게 태그 이름
      'quasi' in node.init &&
      isObject(node.init.quasi) &&
      'type' in node.init.quasi &&
      node.init.quasi.type === 'TemplateLiteral' &&
      'quasis' in node.init.quasi &&
      Array.isArray(node.init.quasi.quasis) &&
      'type' in node.init.quasi.quasis[0] &&
      node.init.quasi.quasis[0].type === 'TemplateElement' &&
      'value' in node.init.quasi.quasis[0] &&
      isObject(node.init.quasi.quasis[0].value)
    ) {
      const componentDeclaration: ComponentDeclaration = {
        name: node.id.name,
        tag: node.init.tag.property.name,
        styles: extractStylePropertyAndValue(
          node.init.quasi.quasis[0].value.raw
            .split(/[\n;]+/)
            .filter((style: string) => !!style)
            .map((style: string) => style.trim()),
        ),
      };

      componentDeclarations.push(componentDeclaration);
    }
  }

  recursion(ast);

  return componentDeclarations;
}

export function overrideClassnameAttributeRecursively(
  ast: AST,
  componentDeclarations: ComponentDeclaration[],
) {
  console.log(componentDeclarations);
  function recursion(
    node: unknown,
    parentNode?: object & Record<'type', unknown>,
  ) {
    if (!isObject(node) || !('type' in node)) {
      return;
    }

    Object.entries(node).forEach(([key, value]) => {
      if (key === 'type') {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((childNode: unknown) => {
          recursion(childNode, node);
        });
        return;
      }

      recursion(value, node);
    });

    if (node.type === 'JSXOpeningElement') {
      if (
        parentNode?.type === 'JSXElement' &&
        'name' in node &&
        isObject(node.name) &&
        'type' in node.name &&
        node.name.type === 'JSXIdentifier' &&
        'name' in node.name &&
        typeof node.name.name === 'string' &&
        'attributes' in node &&
        Array.isArray(node.attributes)
      ) {
        const elementName = node.name.name;

        const targetComponentDeclarations = componentDeclarations.filter(
          (componentDeclaration) => componentDeclaration.name === elementName,
        );

        if (targetComponentDeclarations.length) {
          const newAttributes = generateJSXOpeningElementClassNameAttribute(
            node.attributes,
            convertStyles(targetComponentDeclarations[0].styles),
          );

          node.attributes = newAttributes;
        }
      }
    }
  }

  recursion(ast);
}
