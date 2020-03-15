import {h} from "preact";
import render from "preact-render-to-string";

import { App } from './App';

export default function () {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>CSS-Test</title>
</head>
<body>
  <div id="root">${render(<App />)}</div>
</body>
</html>`
};