import * as fs from 'fs/promises';

export async function scrapRawScript(target: string) {
  const response = await fs.readFile(target, 'utf-8');
  return response;
}