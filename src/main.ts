import { scrapRawScript } from '~/helpers/scraper';

export default (async () => {
  const args = process.argv.slice(2);

  if (args[0] === '--target') {
    const rawScript = await scrapRawScript(args[1]);
    console.log(rawScript);
  }
})();
