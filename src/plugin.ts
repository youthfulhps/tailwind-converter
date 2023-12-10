import { parsers as babelParsers } from 'prettier/parser-babel';
import { parsers as typescriptParsers } from 'prettier/parser-typescript';

import { printers } from './printer';

export const parsers: { [parserName: string]: any } = {
  babel: {
    ...babelParsers.babel,
    astFormat: 'babel-ast',
  },
  typescript: {
    ...typescriptParsers.typescript,
    astFormat: 'typescript-ast',
  },
};

const plugin = {
  parsers,
  printers,
  astFormat: 'estree',
};

export default plugin;
