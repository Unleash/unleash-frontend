import {
    START_FETCH_FEATURE_TOGGLES,
    FETCH_FEATURE_TOGGLES_SUCCESS,
    FETCH_FEATURE_TOGGLE_ERROR,
} from '../feature-toggle/actions';

const apiCalls = (
    state = {
        fetchTogglesState: {
            loading: false,
            success: false,
            error: null,
        },
    },
    action
) => {
    switch (action.type) {
        case START_FETCH_FEATURE_TOGGLES:
            return {
                ...state,
                fetchTogglesState: {
                    loading: true,
                    success: false,
                    error: null,
                },
            };
        case FETCH_FEATURE_TOGGLES_SUCCESS:
            return {
                ...state,
                fetchTogglesState: {
                    loading: false,
                    success: true,
                    error: null,
                },
            };
        case FETCH_FEATURE_TOGGLE_ERROR:
            return {
                ...state,
                fetchTogglesState: {
                    loading: false,
                    success: false,
                    error: true,
                },
            };
        default:
            return state;
    }
};

export default apiCalls;
