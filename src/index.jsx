import 'whatwg-fetch';

import './app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import mainTheme from './themes/main-theme';

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
            <ThemeProvider theme={mainTheme}>
                <ScrollToTop>
                    <Route path="/" component={App} />
                </ScrollToTop>
            </ThemeProvider>
        </HashRouter>
    </Provider>,
    document.getElementById('app')
);
