import React from 'react';
import {render} from 'react-dom';
import { createCss } from '@stitches/css'
import { App, Provider, config } from './App';

const css = createCss(config)

// render(<Provider css={css}><App /></Provider>, document.getElementById("root"));
