
import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
// styles
// import 'assets/css/bootstrap.min.css';
// import './assets/css/paper-kit.css';
// import "assets/css/paper-kit.min.css";
// import "assets/css/paper-kit.css.map";
// import './assets/demo/demo.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
