import * as types from './actionTypes';
import * as errors from "../components/Error/ErrorTypes";
import { apiGatewayGetStats, apiGatewayPutStat } from './apiGatewayPromises';
import {isEmpty} from "lodash";

export const cacheStat = (stat) => {
    return({
        type: types.CACHE_STAT,
        stat
    })
};

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
    Object.keys(stats).forEach((stat) => {
        stats[stat] = parseInt(stats[stat]);
    });

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

export const revertStat = (stat) => {
    return({
        type: types.REVERT_STAT,
        stat
    });
};

export const toggleShowError = (errorMessage) => {
    return({
        type: types.TOGGLE_SHOW_ERROR,
        errorMessage
    });
};

export const updateStat = (stat, value) => {
    return dispatch => {
        return(
            apiGatewayPutStat(stat, value)
                .then(response => {
                    if (isEmpty(response.data)) {
                        dispatch(updateStatSuccess(stat, value));
                    } else {
                        dispatch(updateStatFailed('Error: ' + stat + errors.UPDATE_STAT_FAILED));
                    }
                })
                .catch(err => {
                    console.error(err);
                    dispatch(updateStatFailed('Error: ' + stat + errors.UPDATE_STAT_FAILED));
                })
        )
    }
};

export const updateStatSuccess = (stat, value) => {
    return({
        type: types.UPDATE_STAT_SUCCESS,
        stat,
        value
    })
};

const updateStatFailed = (errorMessage) => {
    return({
        type: types.TOGGLE_SHOW_ERROR,
        errorMessage
    })
};
