import { format } from 'prettier';
import { scrapRawScript } from '~/helpers/reader';
import plugin from './plugin';

export default (async () => {
  const args = process.argv.slice(2);

  if (args[0] === '--target') {
    const rawScript = await scrapRawScript(args[1]);

    const formattedScript = format(rawScript, {
      plugins: [plugin],
    });
    console.log(formattedScript);
  }
})();
