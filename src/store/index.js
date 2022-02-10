import { combineReducers } from 'redux';
import features from './feature-toggle';
import error from './error';
import projects from './project';
import apiCalls from './api-calls';

const unleashStore = combineReducers({
    features,
    error,
    projects,
    apiCalls,
});

export default unleashStore;
