import { format } from 'prettier';
import { scrapRawScript, writeFormattedScript } from '~/helpers/reader';
import plugin from './plugin';
import chalk from 'chalk';

export default (async () => {
  const args = process.argv.slice(2);

  if (args[0] === '--target') {
    try {
      const filePath = args[1];
      const rawScript = await scrapRawScript(filePath);

      const formattedScript = format(rawScript, {
        plugins: [plugin],
      });

      const writeDirectory = args[1].split('/');
      const originFileName = writeDirectory.pop();

      if (originFileName) {
        const split = originFileName.split('.');
        const fileExtension = split.pop();
        const tailwindFileName = [...split, 'tailwind'].join('.');

        const directory = `${writeDirectory.join(
          '/',
        )}/${tailwindFileName}.${fileExtension}`;
        await writeFormattedScript(directory, formattedScript);

        console.log(
          chalk.green(
            `tailwind-converter: Conversion Completed!, Please check ${directory}`,
          ),
        );
      }
    } catch (e) {
      console.log(
        chalk.red(`tailwind-converter: Conversion Fail!, Please check error.`),
      );
      console.log(e);
    } finally {
      console.log(chalk.green('Done!'));
    }
  }
})();
