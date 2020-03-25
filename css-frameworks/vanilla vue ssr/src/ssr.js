const renderer = __non_webpack_require__(
  "vue-server-renderer"
).createRenderer();
import { app } from "./App";

export default async function() {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>CSS-Test</title>
      </head>
      <body>
        <div id="root">
          ${await renderer.renderToString(app)}
        </div>
      </body>
    </html>
  `;
}
