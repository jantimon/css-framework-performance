declare var __non_webpack_require__: NodeRequire;
const fs = __non_webpack_require__("fs") as typeof import("fs");
const glob = __non_webpack_require__("fast-glob") as typeof import("fast-glob");
const path = __non_webpack_require__("path") as typeof import("path");
const util = __non_webpack_require__("util") as typeof import("util");
const readFile = util.promisify(fs.readFile);

/** Calculates the median value (only for odd array sizes) */
const median = (numbers: number[]): number => {
  return numbers.sort()[(numbers.length - 1) / 2];
};

/**
 * Read package.json and *.report.json for all projects
 */
export const getReportData = async (codePath: string, reportPath: string) => {
  const projectFolderNames = await glob("*", {
    onlyDirectories: true,
    cwd: reportPath,
  });
  const reportData = await Promise.all(
    projectFolderNames.map(async (projectFolderName) => {
      const projectReports = await glob("*.report.json", {
        cwd: path.join(reportPath, projectFolderName),
      });
      const projectPackageJson = await readFile(
        path.join(codePath, projectFolderName, "package.json")
      );
      const projectPackageData = JSON.parse(projectPackageJson.toString());
      const lighthouseReports = await Promise.all(
        projectReports.map(
          async (report) =>
            await readFile(
              path.join(reportPath, projectFolderName, report),
              "utf8"
            )
        )
      );
      const lightHouseReports = lighthouseReports.map(
        (report) => JSON.parse(report) as typeof import("./demo.report.json")
      );

      const reportSummary = {
        FirstContentfulPaint: median(
          lightHouseReports.map(
            (report) => report.audits["first-contentful-paint"].numericValue
          )
        ),
        FirstMeaningfulPaint: median(
          lightHouseReports.map(
            (report) => report.audits["first-meaningful-paint"].numericValue
          )
        ),
        FirstCPUIdle: median(
          lightHouseReports.map(
            (report) => report.audits["first-cpu-idle"].numericValue
          )
        ),
        TimeToInteractive: median(
          lightHouseReports.map(
            (report) => report.audits["interactive"].numericValue
          )
        ),
        MaxPotentialFirstInputDelay: median(
          lightHouseReports.map(
            (report) => report.audits["max-potential-fid"].numericValue
          )
        ),
        Requests:
          lightHouseReports[0].audits["network-requests"].details.items.length,
        TransferSize: lightHouseReports[0].audits[
          "network-requests"
        ].details.items.reduce((sum, item) => sum + item.transferSize, 0),
      };

      return {
        name: projectPackageData.name as string,
        description: projectPackageData.description as string,
        projectFolderName,
        lighthouseReportSummary: reportSummary,
      };
    })
  );
  reportData.sort((reportA, reportB) =>
    reportA.lighthouseReportSummary.TimeToInteractive >
    reportB.lighthouseReportSummary.TimeToInteractive
      ? 1
      : reportA.lighthouseReportSummary.TimeToInteractive <
        reportB.lighthouseReportSummary.TimeToInteractive
      ? -1
      : 0
  );
  return reportData;
};
