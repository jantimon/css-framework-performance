const ReactDOMServer = __non_webpack_require__('react-dom/server');
import React from 'react';
import { App } from './App';

export default function () {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>CSS-Test</title>
</head>
<body>
  <div id="root">${ReactDOMServer.renderToString(<App />)}</div>
</body>
</html>`
};