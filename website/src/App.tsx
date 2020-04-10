import { h, Fragment } from "preact";

interface Report {
  name: string;
  description: string;
  projectFolderName: string;
  lighthouseReportSummary: {
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
  reportData: Array<Report>;
}

export const App = ({ reportData }: AppProps) => (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Demo</th>
          <th>Transfer Size</th>
          <th>First Meaningful Paint</th>
          <th>First Contentful Paint</th>
          <th>Time To Interactive</th>
          <th>First Cpu Idle</th>
          <th>Full Report</th>
        </tr>
      </thead>
      <tbody>
        {reportData.map((report) => (
          <Report report={report} />
        ))}
      </tbody>
    </table>
);

interface ReportProps {
  report: Report;
}

const Report = ({ report }: ReportProps) => (
  <Fragment>
  <tr>
    <td style={{whiteSpace: 'nowrap'}}><strong>{report.name.replace(/-/g, '‑')}</strong></td>
    <td>
      <a href={`reports/${report.projectFolderName}/page/`}>Demo</a>
      <br />
      <a
        href={`https://github.com/jantimon/css-framework-performance/tree/master/css-frameworks/vanilla`}
      >
        Code
      </a>
    </td>
    <td style={{textAlign: 'center'}}>
      <Size label="Full transfer size of all requests (gzip)">{report.lighthouseReportSummary.TransferSize}</Size>
    </td>
    <td style={{textAlign: 'center'}}>
      <Time label="First Meaningful Paint">{report.lighthouseReportSummary.FirstMeaningfulPaint}</Time>
    </td>
    <td style={{textAlign: 'center'}}>
      <Time label="First Contentful Paint">{report.lighthouseReportSummary.FirstContentfulPaint}</Time>
    </td>
    <td style={{textAlign: 'center'}}>
      <Time label="Time To Interactive">{report.lighthouseReportSummary.TimeToInteractive}</Time>
    </td>
    <td style={{textAlign: 'center'}}>
      <Time label="First Cpu Idle">{report.lighthouseReportSummary.FirstCPUIdle}</Time>
    </td>
    <td style={{textAlign: 'right'}}>
    <div style={{whiteSpace: 'nowrap'}}>
      <a href={`reports/${report.projectFolderName}/index-0.3g.report.html`} title="Report 1">
        1
      </a>{' / '}
      <a href={`reports/${report.projectFolderName}/index-1.3g.report.html`} title="Report 2">
        2
      </a>{' / '}
      <a href={`reports/${report.projectFolderName}/index-2.3g.report.html`} title="Report 3">
        3
      </a>
      </div>
    </td>
  </tr>
  <tr>
    <td colSpan={4}><small style={{maxWidth: 'calc(100vw - 40px)'}}>{report.description}</small></td>
    <td colSpan={4}></td>
  </tr>
  </Fragment>
);

const Time = ({children, label}: {label: string, children: number}) => (
  <span title={`${label}: ${children} ms`} style={{whiteSpace: 'nowrap',fontVariantNumeric: 'tabular-nums'}}>⏱️ {(Math.round(children/ 100) / 10).toFixed(1)} s</span>
)

const Size = ({children, label}: {label: string, children: number}) => (
  <span title={`${label}: ${children} byte`} style={{whiteSpace: 'nowrap',fontVariantNumeric: 'tabular-nums'}}>📏 {(Math.round(children/ 100) / 10).toFixed(1)} kb</span>
)