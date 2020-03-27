import ReactDOMServer from "react-dom/server";
import React from "react";
import { App } from "./App";

export default function() {
  const html = ReactDOMServer.renderToString(<App />);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>CSS-Test</title>
</head>
<body>
  <div id="root">${html}</div>
</body>
</html>`;
}
