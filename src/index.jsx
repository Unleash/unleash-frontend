import 'whatwg-fetch';
import 'react-mdl/extra/material.js';

import 'react-mdl/extra/css/material.blue_grey-pink.min.css';

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
import fetchIntercept from 'fetch-intercept';
import { retrieveTokenBearer } from './data/helper'

let composeEnhancers;

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
} else {
    composeEnhancers = compose;
}

const unleashStore = createStore(store, composeEnhancers(applyMiddleware(thunkMiddleware)));
const metricsPoller = new MetricsPoller(unleashStore);

// fetch interceptor
const unregister = fetchIntercept.register({
    request: async function (url, config) {
        if (url === process.env.UPLOAN_AUTH_URL) {
            return [url, config];
        }

        let token = await retrieveTokenBearer()
        if (typeof config.headers === 'undefined') {
            config.headers = {}
        }
        config.headers["Authorization"] = `Bearer ${token}`
        config.headers["Accept"] = 'application/json'
        config.headers["Content-Type"] = 'application/json';

        return [url, config];
    },

    requestError: err => Promise.reject(err),
    response: res => res,
    responseError: err => Promise.reject(err)
});
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
