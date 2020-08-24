declare var __non_webpack_require__: NodeRequire;
const fs = __non_webpack_require__("fs") as typeof import("fs");
const glob = __non_webpack_require__("fast-glob") as typeof import("fast-glob");
const path = __non_webpack_require__("path") as typeof import("path");
const util = __non_webpack_require__("util") as typeof import("util");
const readFile = util.promisify(fs.readFile);

export interface LighthouseSummary {
  medianIndex: number;
  FirstContentfulPaint: number;
  FirstMeaningfulPaint: number;
  FirstCPUIdle: number;
  TimeToInteractive: number;
  MaxPotentialFirstInputDelay: number;
  Requests: number;
  TransferSize: number;
}

/** Calculates the median and returns the index */
const medianIndex = (numbers: number[]): number => {
  return numbers.indexOf(Array.from(numbers).sort()[(numbers.length - 1) / 2]);
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
      projectReports.sort();
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

      const errorReport = lightHouseReports.find(
        (report) =>
          (report.runtimeError && report.runtimeError.message) ||
          report.audits.interactive.errorMessage
      );
      if (errorReport) {
        throw new Error(
          `in report '${projectFolderName}': "${
            (errorReport.runtimeError && errorReport.runtimeError.message) ||
            errorReport.audits.interactive.errorMessage
          }"`
        );
      }

      const medianReportIndex = medianIndex(
        lightHouseReports.map(
          (report) =>
            report.audits["interactive"].numericValue +
            report.audits["first-contentful-paint"].numericValue
        )
      );

      if (medianReportIndex === -1) {
        console.log(
          lightHouseReports[0].audits.interactive,
          lightHouseReports[0].audits["first-contentful-paint"]
        );
        throw new Error(
          'no median report not found for "' + projectFolderName + '"'
        );
      }

      const medianReport = lightHouseReports[medianReportIndex];
      const reportSummary: LighthouseSummary = {
        medianIndex: medianReportIndex,
        FirstContentfulPaint:
          medianReport.audits["first-contentful-paint"].numericValue,
        FirstMeaningfulPaint:
          medianReport.audits["first-meaningful-paint"].numericValue,
        FirstCPUIdle: medianReport.audits["first-cpu-idle"].numericValue,
        TimeToInteractive: medianReport.audits["interactive"].numericValue,
        MaxPotentialFirstInputDelay:
          medianReport.audits["max-potential-fid"].numericValue,
        Requests: medianReport.audits["network-requests"].details.items.length,
        TransferSize: medianReport.audits[
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

  return {
    reportMinValues: calculateMinValues(
      reportData.map((report) => report.lighthouseReportSummary)
    ),
    reports: reportData,
  };
};

const calculateMinValues = (
  lighthouseReportSummary: Array<LighthouseSummary>
) => {
  const keys = [
    "FirstContentfulPaint",
    "FirstMeaningfulPaint",
    "FirstCPUIdle",
    "TimeToInteractive",
    "MaxPotentialFirstInputDelay",
    "Requests",
    "TransferSize",
  ] as const;
  const minValues = {} as {
    [key in
      | "FirstContentfulPaint"
      | "FirstMeaningfulPaint"
      | "FirstCPUIdle"
      | "TimeToInteractive"
      | "MaxPotentialFirstInputDelay"
      | "Requests"
      | "TransferSize"]: number;
  };
  keys.forEach((key) => {
    minValues[key] = Math.min(
      ...lighthouseReportSummary.map((report) => report[key])
    );
  });
  return minValues;
};
