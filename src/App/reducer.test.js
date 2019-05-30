import reducer from './reducer'
import testState from '../testUtils/testState';
import { deepCopy } from '../testUtils/testHelpers';
import * as types from './actions/actionTypes';

const state = deepCopy(testState.app);

describe('App reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(state, {})).toStrictEqual(state);
    });

    it('should handle LOAD_STATS_SUCCESS', () => {
        const newState = reducer(state,
            {
                type: types.LOAD_STATS_SUCCESS,
                stats: {testStat: 'test'}
            }
        );
        expect(newState.stats).toStrictEqual({testStat: 'test'});
    });

    it('should handle TOGGLE_SHOW_ERROR', () => {
        const newState = reducer(state,
            {
                type: types.TOGGLE_SHOW_ERROR,
                errorMessage: 'testError'
            }
        );
        expect(newState.showError).toBe(true);
        expect(newState.errorMessage).toBe('testError');
    });

    it('should handle UPDATE_STAT', () => {
        const newState = reducer(state,
            {
                type: types.UPDATE_STAT,
                stat: 'kiAvailable',
                value: 2
            }
        );
        expect(newState.stats.kiAvailable).toBe(2);
    });

});
