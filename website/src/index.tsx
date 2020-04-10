import {h, render} from "preact";
import './index.css';
import { App } from './App';

const reportData = JSON.parse(document.getElementById('reportData')!.innerHTML);
render(<App reportData={reportData} />, document.getElementById("root")!);

