import { isEmpty } from 'lodash';
import * as types from './actionTypes';
import * as errors from '../components/Error/ErrorTypes';
import { apiGatewayGetAll, apiGatewayPut } from '../../apiGatewayClient';

export const cacheStat = stat => ({
  type: types.CACHE_STAT,
  stat,
});

export const loadStats = () => dispatch => (
  apiGatewayGetAll('stats')
    .then((response) => {
      if (response.data.count === '') {
        dispatch(loadStatsFailed());
      } else if (response.data.count === '0') {
        dispatch(loadStatsSuccess(response.data.stats));
        dispatch(pushError(errors.NO_STATS_FOUND));
      } else {
        dispatch(loadStatsSuccess(response.data.stats));
      }
    })
    .catch(() => {
      dispatch(loadStatsFailed());
    })
);

const loadStatsSuccess = (stats) => {
  const loadedStats = {};
  Object.keys(stats).forEach((key) => {
    loadedStats[key] = parseInt(stats[key], 10);
  });

  return ({
    type: types.LOAD_STATS_SUCCESS,
    stats: loadedStats,
  });
};

const loadStatsFailed = () => (dispatch) => {
  dispatch(pushError(errors.LOAD_STATS_FAILED));
};

export const popError = () => ({
  type: types.POP_ERROR,
});

export const pushError = errorMessage => ({
  type: types.PUSH_ERROR,
  errorMessage,
});

export const revertStat = stat => ({
  type: types.REVERT_STAT,
  stat,
});

export const updateStat = (stat, value) => dispatch => (
  apiGatewayPut('stats', stat, { value })
    .then((response) => {
      if (isEmpty(response.data)) {
        dispatch(updateStatSuccess(stat, value));
      } else {
        dispatch(pushError(`Error: ${stat}${errors.UPDATE_STAT_FAILED}`));
      }
    })
    .catch(() => {
      dispatch(pushError(`Error: ${stat}${errors.UPDATE_STAT_FAILED}`));
    })
);

export const updateStatSuccess = (stat, value) => ({
  type: types.UPDATE_STAT_SUCCESS,
  stat,
  value,
});
