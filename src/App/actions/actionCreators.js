import * as types from './actionTypes';
import * as errors from "../components/Error/ErrorTypes";
import { apiGatewayGetStats } from './apiGatewayPromises';

export const loadStats = () => {
    return dispatch => {
        return(
            apiGatewayGetStats()
                .then(response => {
                    if (response.data.count === '') {
                        dispatch(loadStatsFailed());
                    } else if (response.data.count === '0') {
                        dispatch(loadStatsSuccess(response.data.stats));
                        dispatch(toggleShowError(errors.NO_STATS_FOUND));
                    } else {
                        dispatch(loadStatsSuccess(response.data.stats));
                    }
                })
                .catch(err => {
                    console.error(err);
                    dispatch(loadStatsFailed());
                })
        )
    };
};

const loadStatsSuccess = (stats) => {
    return({
        type: types.LOAD_STATS_SUCCESS,
        stats
    });
};

const loadStatsFailed = () => {
    return dispatch => {
        dispatch(toggleShowError(errors.LOAD_STATS_FAILED))
    }
};

export const restoreKi = () => {
    return({
        type: types.RESTORE_KI
    });
};

export const toggleShowError = (errorMessage) => {
    return({
        type: types.TOGGLE_SHOW_ERROR,
        errorMessage
    });
};

export const _useAbility = (cost) => {
    return({
        type: types.USE_ABILITY,
        cost
    });
};
