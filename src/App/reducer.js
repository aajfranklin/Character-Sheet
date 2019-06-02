import update from 'immutability-helper';
import initialState from '../model';
import * as types from './actions/actionTypes';

export default function appReducer(state = { ...initialState.app }, action) {
  switch (action.type) {
    case types.CACHE_STAT: {
      return update(state, {
        statCache:
                    {
                      $set: {
                        stat: action.stat,
                        value: state.stats[action.stat],
                      },
                    },
      });
    }

    case types.LOAD_STATS_SUCCESS: {
      return update(state, {
        stats: { $set: action.stats },
      });
    }

    case types.POP_ERROR: {
      return update(state, {
        errorQueue: { $splice: [[0, 1]] },
      });
    }

    case types.PUSH_ERROR: {
      return update(state, {
        errorQueue: { $push: [action.errorMessage] },
      });
    }

    case types.REVERT_STAT: {
      return update(state, {
        stats: { [action.stat]: { $set: state.statCache.value } },
        statCache: { $set: { stat: undefined, value: undefined } },
      });
    }

    case types.UPDATE_STAT_SUCCESS: {
      return update(state, {
        stats: { [action.stat]: { $set: action.value } },
      });
    }

    default:
      return state;
  }
}
