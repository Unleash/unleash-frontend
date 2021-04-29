import api from './api';
import { dispatchError } from '../util';
import { receiveConfig } from '../ui-config/actions';
import { receiveContext } from '../context/actions';
import { receiveFeatureTypes } from '../feature-type/actions';
import { receiveProjects } from '../project/actions';
import { receiveTagTypes } from '../tag-type/actions';
import { receiveStrategies } from '../strategy/actions';

export const RECEIVE_BOOTSTRAP = 'RECEIVE_CONFIG';
export const ERROR_RECEIVE_BOOTSTRAP = 'ERROR_RECEIVE_CONFIG';

export function fetchUiBootstrap() {
    return dispatch =>
        api
            .fetchUIBootstrap()
            .then(json => {
                dispatch(receiveProjects(json.projects));
                dispatch(receiveConfig(json));
                dispatch(receiveContext(json));
                dispatch(receiveTagTypes(json));
                dispatch(receiveFeatureTypes(json));
                dispatch(receiveStrategies(json));
            })
            .catch(dispatchError(dispatch, ERROR_RECEIVE_BOOTSTRAP));
}
