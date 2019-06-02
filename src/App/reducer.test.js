import reducer from './reducer';
import { testState, deepCopy } from '../testUtils';
import * as types from './actions/actionTypes';

const state = deepCopy(testState.app);

describe('App reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(state, {})).toStrictEqual(state);
  });

  it('should handle CACHE_STAT', () => {
    const newState = reducer(state,
      {
        type: types.CACHE_STAT,
        stat: 'kiAvailable',
      });
    expect(newState.statCache).toStrictEqual({ stat: 'kiAvailable', value: state.stats.kiAvailable });
  });

  it('should handle empty CACHE_STAT', () => {
    const newState = reducer(state,
      {
        type: types.CACHE_STAT,
        stat: '',
      });
    expect(newState.statCache).toStrictEqual({ stat: '', value: undefined });
  });

  it('should handle LOAD_STATS_SUCCESS', () => {
    const newState = reducer(state,
      {
        type: types.LOAD_STATS_SUCCESS,
        stats: { testStat: 'test' },
      });
    expect(newState.stats).toStrictEqual({ testStat: 'test' });
  });

  it('should handle PUSH_ERROR and POP_ERROR', () => {
    const pushState = reducer(state,
      {
        type: types.PUSH_ERROR,
        errorMessage: 'testError',
      });

    expect(pushState.errorQueue[0]).toBe('testError');

    const popState = reducer(pushState,
      {
        type: types.POP_ERROR,
      });

    expect(popState.errorQueue.length).toBe(0);
    expect(popState.errorQueue[0]).toBe(undefined);
  });

  it('should handle REVERT_STAT', () => {
    state.statCache = { stat: 'kiTotal', value: 3 };
    state.stats.kiTotal = 4;

    const newState = reducer(state,
      {
        type: types.REVERT_STAT,
        stat: 'kiTotal',
      });

    expect(newState.statCache).toStrictEqual({ stat: undefined, value: undefined });
    expect(newState.stats.kiTotal).toBe(3);
  });

  it('should handle UPDATE_STAT_SUCCESS', () => {
    const newState = reducer(state,
      {
        type: types.UPDATE_STAT_SUCCESS,
        stat: 'kiAvailable',
        value: 2,
      });
    expect(newState.stats.kiAvailable).toBe(2);
  });
});
