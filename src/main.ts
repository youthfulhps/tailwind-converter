import { format } from 'prettier';
import { scrapRawScript } from '~/helpers/parser';
import { parsers as babelParsers } from 'prettier/parser-babel';
import { parsers as typescriptParsers } from 'prettier/parser-typescript';

import { printers } from './helpers/printer';
import { ComponentEntity } from '~/helpers/extractor';
import { convertStyles } from '~/helpers/converter';

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

    let formattedScript = format(rawScript, {
      plugins: [myCustomPlugin],
    });

    global.componentDeclarations.forEach((declaration: ComponentEntity) => {
      const { name, tag, styles } = declaration;
      const openingElementRegex = new RegExp(`<${name}`, 'g');
      formattedScript = formattedScript.replace(
        openingElementRegex,
        `<${tag} className="${convertStyles(styles)}" `,
      );

      const closingElementRegex = new RegExp(`</${name}`, 'g');

      formattedScript = formattedScript.replace(
        closingElementRegex,
        `</${tag}`,
      );
    });

    console.log(global.componentDeclarations);

    console.log(formattedScript);
  }
})();
