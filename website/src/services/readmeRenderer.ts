/**
 * @file render README.md to html
 */
declare var __non_webpack_require__: NodeRequire;
const fs = __non_webpack_require__("fs") as typeof import("fs");
const Markdown = __non_webpack_require__("markdown-it") as typeof import("markdown-it");
const util = __non_webpack_require__("util") as typeof import("util");
const readFile = util.promisify(fs.readFile);

export async function renderReadme(filename) {
  const readmeMarkdown = await readFile(filename, 'utf8');
  const md = new Markdown({ html: true});
  return md.render(readmeMarkdown);
}
