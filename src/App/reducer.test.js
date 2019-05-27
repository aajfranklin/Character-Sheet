import reducer from './reducer'
import testState from '../testUtils/testState';
import { deepCopy } from '../testUtils/testHelpers';
import * as types from './actions/actionTypes';

const state = deepCopy(testState.app);

describe('Ki reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(state, {})).toStrictEqual(state);
    });

    it('should handle TOGGLE_SHOW_ERROR', () => {
        const newState = reducer(state, {type: types.TOGGLE_SHOW_ERROR, errorMessage: 'testError'});
        expect(newState.showError).toBe(true);
        expect(newState.errorMessage).toBe('testError');
    });

});
