import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as actionCreators from './actionCreators';
import * as types from './actionTypes';
import testState from "../../testUtils/testState";
import {TOGGLE_SHOW_ERROR} from "./actionTypes";
import * as errors from "../components/Error/ErrorTypes";

jest.mock('../../apiGatewayClient');

describe('App action creator', () => {

    describe('synchronous actions', () => {

        it('should create an action to cache a stat', () => {
            const expectedAction = {
                type: types.CACHE_STAT,
                stat: 'kiTotal'
            };

            expect(actionCreators.cacheStat('kiTotal')).toStrictEqual(expectedAction);
        });

        it('should create an action to revert a stat', () => {
            const expectedAction = {
                type: types.REVERT_STAT,
                stat: 'kiTotal'
            };

            expect(actionCreators.revertStat('kiTotal')).toStrictEqual(expectedAction);
        });

        it('should create an action to toggle whether an error is being shown', () => {
            const expectedAction = {
                type: types.TOGGLE_SHOW_ERROR,
                errorMessage: 'testError'
            };

            expect(actionCreators.toggleShowError('testError')).toStrictEqual(expectedAction);
        });

        it('should create an action to update a stat directly', () => {
            const expectedAction = {
                type: types.UPDATE_STAT_SUCCESS,
                stat: 'kiTotal',
                value: 2
            };

            expect(actionCreators.updateStatSuccess('kiTotal', 2)).toStrictEqual(expectedAction);
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
                        testState.app.apiGatewayMockOutcome = 'noneFound';
                        const store = mockStore();
                        const expectedActions = [
                            {type: types.LOAD_STATS_SUCCESS, stats: []},
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
                    testState.app.apiGatewayMockOutcome = 'apiGatewayError';
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
                    testState.app.apiGatewayMockOutcome = 'dynamoDbError';
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

        describe('when updating a stat', () => {

            describe('when the PUT and PutItem calls succeed', () => {

                it('should create actions to update a stat', () => {
                    const store = mockStore();
                    const expectedActions = [
                        {type: types.UPDATE_STAT_SUCCESS, stat: 'kiAvailable', value: 2},
                    ];

                    return store.dispatch(actionCreators.updateStat('kiAvailable', 2)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });

                });

            });

            describe('when the PUT call to API gateway fails', () => {

                it('should create an action to show an error', () => {
                    testState.app.apiGatewayMockOutcome = 'apiGatewayError';
                    const store = mockStore();
                    const expectedActions = [
                        {type: TOGGLE_SHOW_ERROR, errorMessage: 'Error: kiAvailable' + errors.UPDATE_STAT_FAILED}
                    ];

                    return store.dispatch(actionCreators.updateStat('kiAvailable', 'putNetworkFailure')).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

            describe('when the PutItem call to DynamoDB fails', () => {

                it('should create an action to show an error', () => {
                    testState.app.apiGatewayMockOutcome = 'dynamoDbError';
                    const store = mockStore();
                    const expectedActions = [
                        {type: TOGGLE_SHOW_ERROR, errorMessage: 'Error: kiAvailable' + errors.UPDATE_STAT_FAILED}
                    ];

                    return store.dispatch(actionCreators.updateStat('kiAvailable', '')).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

        });

    });

});
