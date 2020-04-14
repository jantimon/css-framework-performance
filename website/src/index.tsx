import {h, render} from "preact";
import './index.css';
import { App } from './App';

const reportData3g = JSON.parse(document.getElementById('reportData3g')!.innerHTML);
render(<App {...reportData3g} />, document.getElementById("root3g")!);
