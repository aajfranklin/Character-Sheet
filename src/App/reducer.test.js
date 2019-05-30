import reducer from './reducer'
import testState from '../testUtils/testState';
import { deepCopy } from '../testUtils/testHelpers';
import * as types from './actions/actionTypes';

const state = deepCopy(testState.app);

describe('Ki reducer', () => {

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

    it('should handle RESTORE_KI', () => {
        const abilityUsedState = reducer(state, {
            type: types.USE_ABILITY,
            cost: '1'
        });
        expect(abilityUsedState.stats.kiAvailable).toBe(2);

        const newState = reducer(abilityUsedState,
            {
                type: types.RESTORE_KI
            }
        );
        expect(newState.stats.kiAvailable).toBe(3);
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

    it('should handle USE_ABILITY', () => {
        const newState = reducer(state,
            {
                type: types.USE_ABILITY,
                cost: '1'
            }
        );
        expect(newState.stats.kiAvailable).toBe(2);
    });

});
