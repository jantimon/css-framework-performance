import {h, render} from "preact";
import './index.css';
import { App } from './App';

const reportData3g = JSON.parse(document.getElementById('reportData3g')!.innerHTML);
render(<App reportsUrl="/reports/3g/" reportData={reportData3g} />, document.getElementById("root3g")!);

const reportData4g = JSON.parse(document.getElementById('reportData4g')!.innerHTML);
render(<App reportsUrl="/reports/4g/" reportData={reportData4g} />, document.getElementById("root4g")!);

