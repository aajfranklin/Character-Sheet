import reducer from './reducer'
import testState from '../testUtils/testState';
import { deepCopy } from '../testUtils/testHelpers';

const state = deepCopy(testState.app);

describe('Ki reducer', () => {

    it('should return the initial state', () => {

        expect(reducer(state, {})).toStrictEqual(state);

    });

});
