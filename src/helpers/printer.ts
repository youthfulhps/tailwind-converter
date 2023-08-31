import type {
  AstPath,
  ParserOptions,
  Doc,
  Printer,
  AST,
  Options,
} from 'prettier';
import {
  extractVariableDeclarations,
  getVariableDeclarationThroughStyledRecursively,
  overrideClassnameAttributeRecursively,
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

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
function preprocess(ast: AST, options: Options): AST | Promise<AST> {
  // * Verify that the variable declaration is included.
  const variableDeclarations = extractVariableDeclarations(ast);

  if (!variableDeclarations.length) {
    throw new Error('Please check if the variable declaration is included.');
  }

  // * Verify that this is a variable declaration through the "styled" function.
  const componentDeclarations =
    getVariableDeclarationThroughStyledRecursively(ast);

  if (!componentDeclarations.length) {
    throw new Error('Please check if the function declaration is included.');
  }

  overrideClassnameAttributeRecursively(ast, componentDeclarations);

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
