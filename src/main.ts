import { format } from 'prettier';
import { scrapRawScript, writeFormattedScript } from '~/helpers/reader';
import plugin from './plugin';

export default (async () => {
  const args = process.argv.slice(2);

  if (args[0] === '--target') {
    const rawScript = await scrapRawScript(args[1]);

    const formattedScript = format(rawScript, {
      plugins: [plugin],
    });

    const writeDirectory = args[1].split('/');
    const fileName = writeDirectory.pop();

    if (fileName) {
      const split = fileName.split('.');
      const directory = `${writeDirectory.join('/')}/${split[0]}.tailwind.${
        split[1]
      }`;
      await writeFormattedScript(directory, formattedScript);
    }
  }
})();
