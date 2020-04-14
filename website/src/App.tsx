import { h, Fragment } from "preact";
import { useState, useEffect, useMemo } from "preact/hooks";

interface Report {
  name: string;
  description: string;
  projectFolderName: string;
  lighthouseReportSummary: {
    medianIndex: number;
    FirstContentfulPaint: number;
    FirstMeaningfulPaint: number;
    FirstCPUIdle: number;
    TimeToInteractive: number;
    MaxPotentialFirstInputDelay: number;
    Requests: number;
    TransferSize: number;
  };
}

interface AppProps {
  reportsUrl: string;
  reportMinValues: {
    FirstContentfulPaint: number;
    FirstMeaningfulPaint: number;
    FirstCPUIdle: number;
    TimeToInteractive: number;
    MaxPotentialFirstInputDelay: number;
    Requests: number;
    TransferSize: number;
  };
  reports: Array<Report>;
}

export const App = ({ reports, reportsUrl, reportMinValues }: AppProps) => {
  const [showScreenshots, setShowScreenshots] = useState(true);
  const [sortBy, setSortBy] = useState<keyof Report["lighthouseReportSummary"]>(
    "TimeToInteractive"
  );
  const sortedReports = useMemo(
    () =>
      Array.from(reports).sort((reportA, reportB) => {
        if (
          reportA.lighthouseReportSummary[sortBy] >
          reportB.lighthouseReportSummary[sortBy]
        ) {
          return 1;
        } else if (
          reportA.lighthouseReportSummary[sortBy] ===
          reportB.lighthouseReportSummary[sortBy]
        ) {
          return 0;
        }
        return -1;
      }),
    [sortBy, reports]
  );
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th onClick={() => setSortBy("TransferSize")}>
            <span className={sortBy === "TransferSize" ? "sorted" : "sortable"}>
              Transfer Size
            </span>
          </th>
          <th onClick={() => setSortBy("FirstMeaningfulPaint")}>
            <span
              className={
                sortBy === "FirstMeaningfulPaint" ? "sorted" : "sortable"
              }
            >
              First Meaningful Paint
            </span>
          </th>
          <th onClick={() => setSortBy("FirstContentfulPaint")}>
            <span
              className={
                sortBy === "FirstContentfulPaint" ? "sorted" : "sortable"
              }
            >
              First Contentful Paint
            </span>
          </th>
          <th onClick={() => setSortBy("TimeToInteractive")}>
            <span
              className={sortBy === "TimeToInteractive" ? "sorted" : "sortable"}
            >
              Time To Interactive
            </span>
          </th>
          <th onClick={() => setSortBy("FirstCPUIdle")}>
            <span className={sortBy === "FirstCPUIdle" ? "sorted" : "sortable"}>
              First Cpu Idle
            </span>
          </th>
          <th>Demo</th>
          <th>Full Report</th>
        </tr>
      </thead>
      <tbody>
        {sortedReports.map((report) => (
          <Report
            reportMinValues={reportMinValues}
            key={report.name}
            showScreenshots={showScreenshots}
            report={report}
            reportsUrl={reportsUrl}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}></td>
          <td colSpan={4}>
            <label>
              <input
                type="checkbox"
                checked={showScreenshots}
                onChange={() => setShowScreenshots(!showScreenshots)}
              />{" "}
              screenshots
            </label>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

interface ReportProps {
  report: Report;
  reportsUrl: string;
  showScreenshots: boolean;
  reportMinValues: {
    FirstContentfulPaint: number;
    FirstMeaningfulPaint: number;
    FirstCPUIdle: number;
    TimeToInteractive: number;
    MaxPotentialFirstInputDelay: number;
    Requests: number;
    TransferSize: number;
  };
}

const Report = ({
  report,
  reportsUrl,
  showScreenshots,
  reportMinValues,
}: ReportProps) => (
  <Fragment>
    <tr className="no-border">
      <td style={{ whiteSpace: "nowrap" }}>
        <strong>{report.name.replace(/-/g, "‑")}</strong>
      </td>
      <td style={{ textAlign: "center" }}>
        <Size label="Full transfer size of all requests (gzip)">
          {report.lighthouseReportSummary.TransferSize}
        </Size>
      </td>
      <td style={{ textAlign: "center" }}>
        <Time label="First Meaningful Paint">
          {report.lighthouseReportSummary.FirstMeaningfulPaint}
        </Time>
        <RelativeDifference
          label="slower than fastest"
          value={report.lighthouseReportSummary.FirstMeaningfulPaint}
          baseValue={reportMinValues.FirstMeaningfulPaint}
        />
      </td>
      <td style={{ textAlign: "center" }}>
        <Time label="First Contentful Paint">
          {report.lighthouseReportSummary.FirstContentfulPaint}
        </Time>
        <RelativeDifference
          label="slower than fastest"
          value={report.lighthouseReportSummary.FirstContentfulPaint}
          baseValue={reportMinValues.FirstContentfulPaint}
        />
      </td>
      <td style={{ textAlign: "center" }}>
        <Time label="Time To Interactive">
          {report.lighthouseReportSummary.TimeToInteractive}
        </Time>
        <RelativeDifference
          label="slower than fastest"
          value={report.lighthouseReportSummary.TimeToInteractive}
          baseValue={reportMinValues.TimeToInteractive}
        />
      </td>
      <td style={{ textAlign: "center" }}>
        <Time label="First Cpu Idle">
          {report.lighthouseReportSummary.FirstCPUIdle}
        </Time>
        <RelativeDifference
          label="slower than fastest"
          value={report.lighthouseReportSummary.FirstCPUIdle}
          baseValue={reportMinValues.FirstCPUIdle}
        />
      </td>
      <td>
        <a href={`reports/${report.projectFolderName}/page/`}>Demo</a>
        <br />
        <a
          href={`https://github.com/jantimon/css-framework-performance/tree/master/css-frameworks/vanilla`}
        >
          Code
        </a>
      </td>
      <td style={{ textAlign: "right" }}>
        <div style={{ whiteSpace: "nowrap" }}>
          <a
            href={`${reportsUrl}${report.projectFolderName}/index-${report.lighthouseReportSummary.medianIndex}.report.html`}
            title="Report 1"
          >
            Details
          </a>
        </div>
      </td>
    </tr>
    <tr className={(showScreenshots && "no-border") || ""}>
      <td colSpan={4}>
        <small style={{ maxWidth: "calc(100vw - 40px)" }}>
          {report.description}
        </small>
      </td>
      <td colSpan={4}></td>
    </tr>
    {showScreenshots && (
      <tr>
        <td colSpan={8}>
          <FilmStrip
            medianReportIndex={report.lighthouseReportSummary.medianIndex}
            projectFolderName={reportsUrl + report.projectFolderName}
            firstMeaningfulPaint={
              report.lighthouseReportSummary.FirstMeaningfulPaint
            }
            timeToInteractive={report.lighthouseReportSummary.TimeToInteractive}
          />
        </td>
      </tr>
    )}
  </Fragment>
);

const Time = ({ children, label }: { label: string; children: number }) => (
  <span
    title={`${label}: ${children} ms`}
    style={{ whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}
  >
    ⏱️ {(children / 1000).toFixed(1)} s
  </span>
);

const Size = ({ children, label }: { label: string; children: number }) => (
  <span
    title={`${label}: ${children} byte`}
    style={{ whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}
  >
    📏 {(children / 1000).toFixed(1)} kb
  </span>
);

const useAsyncEffect = (
  callback: (isMountedRef: { mounted: boolean }) => Promise<any>
) => {
  useEffect(() => {
    let ref = { mounted: true };
    callback(ref);
    return () => {
      ref.mounted = false;
    };
  }, []);
};

const transparent1x1pxGif =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const useScreenshotThumbnailsLoader = (
  projectFolderName: string,
  medianReportIndex: number
) => {
  const [thumbnails, setThumbnails] = useState<
    { timing: number; image: string }[]
  >(Array(10).fill({ timing: 0, image: transparent1x1pxGif }));
  useAsyncEffect(async (isMountedRef) => {
    // Don't load on server
    if (typeof window === "undefined") {
      return;
    }
    const thumbnails = await import(
      /* webpackChunkName: `thumbnails/[request]` */
      `!!./services/previewLoader!../../public/${projectFolderName}/index-${medianReportIndex}.report.json?javascript`
    );
    // Stop if component was unmounted during async loading
    if (!isMountedRef.mounted) {
      return;
    }
    setThumbnails(thumbnails.default);
  });
  return thumbnails;
};

const FilmStrip = ({
  projectFolderName,
  firstMeaningfulPaint,
  timeToInteractive,
  medianReportIndex,
}: {
  projectFolderName: string;
  firstMeaningfulPaint: number;
  timeToInteractive: number;
  medianReportIndex: number;
}) => {
  const thumbnails = useScreenshotThumbnailsLoader(
    projectFolderName,
    medianReportIndex
  );
  const firstFrameIndexAfterTimeToInteractive = useMemo(
    () =>
      thumbnails.findIndex(
        (thumbnail) => thumbnail.timing >= timeToInteractive
      ),
    [thumbnails, timeToInteractive]
  );
  const firstFrameIndexAfterFirstMeaningfulPaint = useMemo(
    () =>
      thumbnails.findIndex(
        (thumbnail) => thumbnail.timing >= firstMeaningfulPaint
      ),
    [thumbnails, timeToInteractive]
  );
  return (
    <div style={{ display: "flex" }}>
      {thumbnails.map(({ image, timing }, i) => (
        <div
          style={{
            display: "inline-block",
            position: "relative",
            height: 50,
            overflow: "hidden",
            width: "100%",
            border:
              "1px solid " +
              (i === firstFrameIndexAfterTimeToInteractive
                ? "green"
                : i === firstFrameIndexAfterFirstMeaningfulPaint
                ? "orange"
                : "#efefef"),
            marginRight: 2,
          }}
          title={
            i === firstFrameIndexAfterTimeToInteractive
              ? "First Interactive Frame"
              : i === firstFrameIndexAfterFirstMeaningfulPaint
              ? "First Meaningful Paint"
              : i > firstFrameIndexAfterTimeToInteractive
              ? undefined
              : "Loading"
          }
        >
          <img
            style={{
              objectFit: "contain",
              objectPosition: "0% 0%",
              width: "100%",
            }}
            key={i}
            src={image}
          />
          {timing > 0 && (
            <span
              style={{
                background: "white",
                position: "absolute",
                right: 3,
                bottom: 3,
                fontSize: "70%",
              }}
            >
              <Time label="Load time ">{timing}</Time>
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

const RelativeDifference = ({
  value,
  baseValue,
  label,
}: {
  value: number;
  baseValue: number;
  label: string;
}) => {
  const percantage = Math.round((100 * value) / baseValue - 100);
  return (
    <small
      style={{ display: "block", color: "#ababab" }}
      title={percantage + "% " + label}
    >
      {percantage > 0 ? "+" : percantage < 0 ? "-" : " "}
      {percantage}%
    </small>
  );
};
