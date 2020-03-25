import './libs/polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./src/App";
import './cssForBrowserExtension.css';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<App />, root);
