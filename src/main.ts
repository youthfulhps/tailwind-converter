import { format } from 'prettier';
import { scrapRawScript } from '~/helpers/parser';
import { parsers as babelParsers } from 'prettier/parser-babel';
import { parsers as typescriptParsers } from 'prettier/parser-typescript';

import { printers } from './helpers/printer';

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

const myCustomPlugin = {
  parsers,
  printers,
  astFormat: 'estree',
};

export default (async () => {
  const args = process.argv.slice(2);

  if (args[0] === '--target') {
    const rawScript = await scrapRawScript(args[1]);

    const formattedScript = format(rawScript, {
      plugins: [myCustomPlugin],
    });
    console.log(formattedScript);
  }
})();
