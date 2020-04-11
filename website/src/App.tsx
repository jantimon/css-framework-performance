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
  reportsUrl: string,
  reportData: Array<Report>;
}

export const App = ({ reportData, reportsUrl }: AppProps) => {
  const [showScreenshots, setShowScreenshots] = useState(true);
  const [sortBy, setSortBy] = useState<keyof Report["lighthouseReportSummary"]>('TimeToInteractive');
  const sortedReports = useMemo(() => Array.from(reportData).sort((reportA, reportB) => {
    if (reportA.lighthouseReportSummary[sortBy] > reportB.lighthouseReportSummary[sortBy]) {
      return 1;
    } else if (reportA.lighthouseReportSummary[sortBy] === reportB.lighthouseReportSummary[sortBy]) {
      return 0;
    }
    return -1;
  }), [sortBy, reportData])
  return (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th onClick={() => setSortBy('TransferSize')}>Transfer Size</th>
        <th onClick={() => setSortBy('FirstMeaningfulPaint')}>First Meaningful Paint</th>
        <th onClick={() => setSortBy('FirstContentfulPaint')}>First Contentful Paint</th>
        <th onClick={() => setSortBy('TimeToInteractive')}>Time To Interactive</th>
        <th onClick={() => setSortBy('FirstCPUIdle')}>First Cpu Idle</th>
        <th>Demo</th>
        <th>Full Report</th>
      </tr>
    </thead>
    <tbody>
      {sortedReports.map((report) => (
        <Report key={report.name} showScreenshots={showScreenshots} report={report} reportsUrl={reportsUrl} />
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan={4}></td>
        <td colSpan={4}><label><input type="checkbox" checked={showScreenshots} onChange={() => setShowScreenshots(!showScreenshots) }/> screenshots</label></td>
      </tr>
    </tfoot>
  </table>
  )
};

interface ReportProps {
  report: Report;
  reportsUrl: string,
  showScreenshots: boolean
}

const Report = ({ report, reportsUrl, showScreenshots }: ReportProps) => (
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
      </td>
      <td style={{ textAlign: "center" }}>
        <Time label="First Contentful Paint">
          {report.lighthouseReportSummary.FirstContentfulPaint}
        </Time>
      </td>
      <td style={{ textAlign: "center" }}>
        <Time label="Time To Interactive">
          {report.lighthouseReportSummary.TimeToInteractive}
        </Time>
      </td>
      <td style={{ textAlign: "center" }}>
        <Time label="First Cpu Idle">
          {report.lighthouseReportSummary.FirstCPUIdle}
        </Time>
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
            href={`${reportsUrl}/${report.projectFolderName}/index-${report.lighthouseReportSummary.medianIndex}.report.html`}
            title="Report 1"
          >
            Details
          </a>
        </div>
      </td>
    </tr>
    <tr className={showScreenshots && "no-border" || ""}>
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
          projectFolderName={reportsUrl.substr(1) + report.projectFolderName}
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
    ⏱️ {(Math.round(children / 100) / 10).toFixed(1)} s
  </span>
);

const Size = ({ children, label }: { label: string; children: number }) => (
  <span
    title={`${label}: ${children} byte`}
    style={{ whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}
  >
    📏 {(Math.round(children / 100) / 10).toFixed(1)} kb
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
      thumbnails.findIndex((thumbnail) => thumbnail.timing > timeToInteractive),
    [thumbnails, timeToInteractive]
  );
  const firstFrameIndexAfterFirstMeaningfulPaint = useMemo(
    () =>
      thumbnails.findIndex(
        (thumbnail) => thumbnail.timing > firstMeaningfulPaint
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
            height: 80,
            overflow: 'hidden',
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
                background: 'white',
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
