import React from 'react';
import {render} from 'react-dom';
import { createCss } from '@stitches/css'
import { App, Provider, config } from './App';

render(<Provider css={createCss(config)}><App /></Provider>, document.getElementById("root"));
