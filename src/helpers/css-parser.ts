/* eslint-disable @typescript-eslint/no-var-requires */
const sass = require('node-sass');
const css = require('css');

export function parseSass(rawScript: string) {
  const parsedSass = sass.renderSync({
    data: '_ {' + rawScript + '}',
  });
  const cssAst = css.parse(parsedSass.css.toString());

  return cssAst.stylesheet.rules;
}
