import type {
  AstPath,
  ParserOptions,
  Doc,
  Printer,
  AST,
  Options,
} from 'prettier';
import {
  extractComponentEntityFromVariableDeclaration,
  extractFunctionDeclarationsThatReturnJSXElement,
  extractVariableDeclarations,
  getClassNameAttributeIndexFromOpeningElement,
  getJSXElementReturnStatementIndexFromFunctionDeclaration,
  isVariableDeclarationThroughStyledFunction,
  overrideClassNameAttributeRawValue,
} from '~/helpers/extractor';

export function extractPrinter(options: ParserOptions): Printer | undefined {
  const pluginOrNot = (
    options.plugins.filter((plugin) => typeof plugin !== 'string') as Plugin[]
  )
    // eslint-disable-next-line
    // @ts-ignore
    .find((plugin) => plugin.printers?.estree);

  if (pluginOrNot) {
    // eslint-disable-next-line
    // @ts-ignore
    return pluginOrNot.printers!.estree;
  }

  return undefined;
}

let defaultPrinter: Printer | undefined;

function preprocess(ast: AST, options: Options): AST | Promise<AST> {
  console.log(options);
  console.log('===========start!===========');

  // * Verify that the variable declaration is included.
  const variableDeclarations = extractVariableDeclarations(ast);
  const functionDeclarationsThatReturnJSXElement =
    extractFunctionDeclarationsThatReturnJSXElement(ast);

  if (!variableDeclarations.length) {
    throw new Error('Please check if the variable declaration is included.');
  }

  if (!functionDeclarationsThatReturnJSXElement.length) {
    throw new Error('Please check if the function declaration is included.');
  }

  // * Verify that this is a variable declaration through the "styled" function.
  const componentDeclarations = variableDeclarations
    .filter((declaration) =>
      isVariableDeclarationThroughStyledFunction(declaration),
    )
    .map((declaration) =>
      extractComponentEntityFromVariableDeclaration(declaration),
    );

  functionDeclarationsThatReturnJSXElement.forEach(
    (functionDeclarationThatReturnJSXElement) => {
      const { declaration, index: functionDeclarationIndex } =
        functionDeclarationThatReturnJSXElement;

      const returnStatementIndex =
        getJSXElementReturnStatementIndexFromFunctionDeclaration(declaration);

      const extractedComponentNames = componentDeclarations.map(
        (componentDeclaration) => componentDeclaration.name,
      );

      if (
        extractedComponentNames.includes(
          declaration.body.body[returnStatementIndex[0]].argument.openingElement
            .name.name,
        )
      ) {
        const classNameAttributeIndex =
          getClassNameAttributeIndexFromOpeningElement(
            ast.program.body[functionDeclarationIndex].body.body[
              returnStatementIndex[0]
            ].argument.openingElement,
          );

        ast = overrideClassNameAttributeRawValue(
          ast,
          functionDeclarationIndex,
          returnStatementIndex[0],
          classNameAttributeIndex,
        );
      }
    },
  );

  // * returnStatement를 가지고 있는 declaration 인덱스도 함께 가져와야 함
  // * 그 declaration의 returnStatement 또한 가져와야 함 (returnStatement가 중복이면.?)
  // * returnStatement안의 body에서 openingElement를 가지고 있는 바디를 순회해서 컴포넌트 사용처의 속성에 오버라이드를 해야함

  // * jsxElementReturnStatement 의 body.argument에 openingElement, closingElement가 있음
  // * componentDeclarations에서 일치하는 녀석을 가져와 스타일을 삽입
  // * 컴포넌트가 속성을 가지고 있다면, attributes에 담김. classNames을 찾아서 변환된 tailwind 스타일로 삽입해주면 됨

  return ast;
}

function print(
  path: AstPath,
  options: ParserOptions,
  print: (path: AstPath) => Doc,
): Doc {
  const node = path.getValue();

  if (!defaultPrinter && node) {
    if (
      (options.parser === 'babel' && node.type === 'File') ||
      (options.parser === 'typescript' && node.type === 'Program')
    ) {
      defaultPrinter = extractPrinter(options);
    }
  }

  if (!defaultPrinter) {
    throw new Error('Default printer does not exist.');
  }

  const defaultDoc = defaultPrinter.print(path, options, print);

  // console.log(defaultDoc);

  return defaultDoc;
}

export const printers: { [astFormat: string]: Printer } = {
  'babel-ast': {
    print,
    preprocess,
  },
  'typescript-ast': {
    print,
    preprocess,
  },
};
