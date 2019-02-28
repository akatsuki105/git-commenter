import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./bootstrap.min.css";
import './index.css';
import { Provider } from 'react-redux';
import store from './Redux/store';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"));

serviceWorker.unregister();
