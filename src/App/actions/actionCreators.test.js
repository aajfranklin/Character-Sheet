import * as actionCreators from './actionCreators';
import * as types from './actionTypes';

describe('App action creator', () => {

    it('should create an action to toggle whether an error is being shown', () => {
        const expectedAction = {
            type: types.TOGGLE_SHOW_ERROR,
            errorMessage: 'testError'
        };

        expect(actionCreators.toggleShowError('testError')).toStrictEqual(expectedAction);
    });

});
