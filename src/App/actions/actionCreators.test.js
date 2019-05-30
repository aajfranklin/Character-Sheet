import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as actionCreators from './actionCreators';
import * as types from './actionTypes';
import testState from "../../testUtils/testState";
import {TOGGLE_SHOW_ERROR} from "./actionTypes";
import * as errors from "../components/Error/ErrorTypes";

jest.mock('./apiGatewayPromises');

describe('App action creator', () => {

    describe('synchronous actions', () => {

        it('should create an action to toggle whether an error is being shown', () => {
            const expectedAction = {
                type: types.TOGGLE_SHOW_ERROR,
                errorMessage: 'testError'
            };

            expect(actionCreators.toggleShowError('testError')).toStrictEqual(expectedAction);
        });

        it('should create an action to restore Ki', () => {
            const expectedAction = {
                type: types.RESTORE_KI
            };

            expect(actionCreators.restoreKi()).toStrictEqual(expectedAction);
        });

        it('should create an action to use an ability', () => {
            const expectedAction = {
                type: types.USE_ABILITY,
                cost: '1'
            };

            expect(actionCreators._useAbility('1')).toStrictEqual(expectedAction);
        });

    });

    describe('asynchronous actions', () => {

        const middleware = [thunk];
        const mockStore = configureMockStore(middleware);

        describe('when loading stats', () => {

            describe('when the GET and Scan succeed', () => {

                it('should create an action to return fetched stats', () => {
                    const store = mockStore();
                    const expectedActions = [
                        {type: types.LOAD_STATS_SUCCESS, stats: testState.app.stats},
                    ];

                    return store.dispatch(actionCreators.loadStats()).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

                describe('when no abilities are returned', () => {

                    it('should create an actions to return empty fetched stats and show an error', () => {
                        testState.app.mockGetAllNetworkResult = 'noneFound';
                        const store = mockStore();
                        const expectedActions = [
                            {type: types.LOAD_STATS_SUCCESS, stats: {}},
                            {type: TOGGLE_SHOW_ERROR, errorMessage: errors.NO_STATS_FOUND}
                        ];

                        return store.dispatch(actionCreators.loadStats()).then(() => {
                            expect(store.getActions()).toEqual(expectedActions);
                        });
                    })

                })

            });

            describe('when the GET call to API gateway fails', () => {

                it('should create an action to show an error', () => {
                    testState.app.mockGetAllNetworkResult = 'getAllNetworkFailure';
                    const store = mockStore();
                    const expectedActions = [{
                        type: TOGGLE_SHOW_ERROR, errorMessage: errors.LOAD_STATS_FAILED
                    }];

                    return store.dispatch(actionCreators.loadStats()).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

            describe('when the Scan call to DynamoDB fails', () => {

                it('should create an action to show an error', () => {
                    testState.app.mockGetAllNetworkResult = 'getAllDynamoFailure';
                    const store = mockStore();
                    const expectedActions = [{
                        type: TOGGLE_SHOW_ERROR, errorMessage: errors.LOAD_STATS_FAILED
                    }];

                    return store.dispatch(actionCreators.loadStats()).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

        });

    });

});
