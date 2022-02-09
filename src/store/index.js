import { combineReducers } from 'redux';
import features from './feature-toggle';
import featureTypes from './feature-type';
import featureMetrics from './feature-metrics';
import featureTags from './feature-tags';
import tagTypes from './tag-type';
import tags from './tag';
import strategies from './strategy';
import error from './error';
import user from './user';
import applications from './application';
import uiConfig from './ui-config';
import projects from './project';
import addons from './addons';
import apiCalls from './api-calls';
import invoiceAdmin from './e-admin-invoice';
import feedback from './feedback';

const unleashStore = combineReducers({
    features,
    featureTypes,
    featureMetrics,
    strategies,
    tagTypes,
    tags,
    featureTags,
    error,
    user,
    applications,
    uiConfig,
    projects,
    addons,
    apiCalls,
    invoiceAdmin,
    feedback,
});

export default unleashStore;
