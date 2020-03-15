import ReactDOMServer from 'react-dom/server';
import { App } from './App';

module.exports = () => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>CSS-Test</title>
</head>
<body>
  <div id="root">${ReactDOMServer.renderToString(<App />)}</div>
</body>
</html>`;
