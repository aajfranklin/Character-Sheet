import reducer from './reducer.js'
import testState from '../testUtils/testState.js';
import { deepCopy } from '../testUtils/testHelpers.js';

const state = deepCopy(testState.app);

describe('Ki reducer', () => {

    it('should return the initial state', () => {

        expect(reducer(state, {})).toStrictEqual(state);

    });

});
