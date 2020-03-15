import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import React from 'react';
import { App } from './App';

export default function () {
  const sheet = new ServerStyleSheet();
  const StyledApp = () => <StyleSheetManager sheet={sheet.instance}>
    <App />
  </StyleSheetManager>;
  const html = ReactDOMServer.renderToString(
    <StyledApp />
  );
  const styles = sheet.getStyleTags();
  sheet.seal();
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>CSS-Test</title>
  ${styles}
</head>
<body>
  <div id="root">${html}</div>
</body>
</html>`
};