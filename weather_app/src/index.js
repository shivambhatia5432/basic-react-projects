import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navbarr from './Nav';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Navbarr />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
