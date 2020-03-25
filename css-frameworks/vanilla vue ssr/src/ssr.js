const renderer = __non_webpack_require__(
  "vue-server-renderer"
).createRenderer();
import { app } from "./App";

let html;

renderer.renderToString(app).then(h => (html = h));

export default function() {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>CSS-Test</title>
      </head>
      <body>
        <div id="root">
          ${html}
        </div>
      </body>
    </html>
  `;
}
