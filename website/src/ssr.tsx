import { h } from "preact";
import render from "preact-render-to-string";
import { App } from "./App";
import { getReportData } from "./services/reportSummary";
import { renderReadme } from "./services/readmeRenderer";
declare var __non_webpack_require__: NodeRequire;
const path = __non_webpack_require__("path") as typeof import("path");

export default async function ({ __dirname }) {
  const reportData3g = await getReportData(
    path.resolve(__dirname, "../../css-frameworks/"),
    path.resolve(__dirname, "../../public/reports/3g")
  );
  const reportData4g = await getReportData(
    path.resolve(__dirname, "../../css-frameworks/"),
    path.resolve(__dirname, "../../public/reports/4g")
  );

  const readme = await renderReadme(path.resolve(__dirname, "../../README.md"));

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>CSS-Framework Lighthouse Scores</title>
      <meta name="author" content="Jan Nicklas">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
  </head>
  <body style="margin: 100px 0">

    <div style="display:flex">
      <div style="flex-grow:1;minWidth: 20px"></div>
      
      <div>

        <div style="position:sticky; left: 20px; max-width: calc(100vw - 20px)">
          <div style="max-width: 800px">
          ${readme
            .replace('<span id="badges"></span>', 
              `&nbsp;<a class="github-button" href="https://github.com/jantimon/css-framework-performance" data-icon="octicon-star" aria-label="Star jantimon/css-framework-performance on GitHub">Star</a>
               <a class="github-button" href="https://github.com/jantimon/css-framework-performance" aria-label="View on GitHub">View on GitHub</a>
              <script defer src="https://buttons.github.io/buttons.js"></script>
            `)
            .replace(/<a[^>]+id="report-table".*?<\/a>/i, `
          </div>
        </div>

        <h2>3g</h2>
        <div id="root3g">${render(<App reportsUrl="reports/4g/" reportData={reportData3g} />)}</div>
        <script id="reportData3g" type="text/json">${JSON.stringify(
          reportData3g
        )}</script>

        <h2>4g</h2>
        <div id="root4g">${render(<App reportsUrl="reports/4g/" reportData={reportData4g} />)}</div>
        <script id="reportData4g" type="text/json">${JSON.stringify(
          reportData3g
        )}</script>


        <div style="position:sticky; left: 20px; max-width: calc(100vw - 20px)">
          <div style="max-width: 800px">
          `)}
          </div>
        </div>

      </div>
      
      <div style="flex-grow:1;minWidth: 20px"></div>
    </div>

    </body>
  </html>`;
}
