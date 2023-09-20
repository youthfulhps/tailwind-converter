/* eslint-disable @typescript-eslint/no-var-requires */
const sass = require('sass');
const css = require('css');

export function parseSass(rawScript: string) {
  const parsedSass = sass.compileString(`_ { ${rawScript} }`);
  const cssAst = css.parse(parsedSass.css.toString());

  return cssAst.stylesheet.rules;
}
