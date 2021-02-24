import 'whatwg-fetch';
import 'react-mdl/extra/material.js';

import 'react-mdl/extra/css/material.blue_grey-pink.min.css';
import './app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import store from './store';
import MetricsPoller from './metrics-poller';
import App from './component/app';
import ScrollToTop from './component/scroll-to-top';
import { writeWarning } from './security-logger';

let composeEnhancers;

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
    composeEnhancers = compose;
    writeWarning();
}

const unleashStore = createStore(store, composeEnhancers(applyMiddleware(thunkMiddleware)));
const metricsPoller = new MetricsPoller(unleashStore);
metricsPoller.start();

ReactDOM.render(
    <Provider store={unleashStore}>
        <HashRouter>
            <ScrollToTop>
                <Route path="/" component={App} />
            </ScrollToTop>
        </HashRouter>
    </Provider>,
    document.getElementById('app')
);
