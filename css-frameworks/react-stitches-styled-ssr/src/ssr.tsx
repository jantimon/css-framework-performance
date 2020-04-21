import ReactDOMServer from 'react-dom/server';
import { createCss } from '@stitches/css'
import React from 'react';
import { App, Provider, config } from './App';

export default function () {
  const css = createCss(config)
  const html = ReactDOMServer.renderToString(
    <Provider css={css}><App /></Provider>
  );
  
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>CSS-Test</title>
  ${css.getStyles().map((style) => `<style>${style}</style>`).join('\n')}
</head>
<body>
  <div id="root">${html}</div>
</body>
</html>`
};