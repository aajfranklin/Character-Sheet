import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionCreators from './actionCreators';
import * as types from './actionTypes';
import testState from '../../../../testUtils/testState';

jest.mock('./apiGatewayPromises');

describe('Ki action creator', () => {

    describe('synchronous actions', () => {

        it('should create an action to cache an ability', () => {
            const expectedAction = {
                type: types.CACHE_ABILITY,
                id: 1
            };

            expect(actionCreators.cacheAbility(1)).toStrictEqual(expectedAction);
        });

        it('should create an action to change form text', () => {
            const event = {
                target: {
                    name: 'testName',
                    value: 'testValue'
                },
                persist: () => {}
            };

            const expectedAction = {
                type: types.CHANGE_FORM_TEXT,
                target: 'testName',
                value: 'testValue'
            };

            expect(actionCreators.changeFormText(event)).toStrictEqual(expectedAction);
        });

        it('should create an action to clear a cached ability', () => {
            const expectedAction = {
                type: types.CLEAR_ABILITY_CACHE,
                id: 1
            };

            expect(actionCreators.clearAbilityCache(1)).toStrictEqual(expectedAction);
        });

        it('should create an action to revert an ability', () => {
            const expectedAction = {
                type: types.REVERT_ABILITY,
                id: 1
            };

            expect(actionCreators.revertAbility(1)).toStrictEqual(expectedAction);
        });

        it('should create an action to toggle the add ability form', () => {
            const expectedAction = {
                type: types.TOGGLE_ADD_ABILITY_FORM,
            };

            expect(actionCreators.toggleAddAbilityForm()).toStrictEqual(expectedAction);
        });

        it('should create an action to toggle editing an ability', () => {
            const expectedAction = {
                type: types.TOGGLE_EDIT_ABILITY,
                id: 1
            };

            expect(actionCreators.toggleEditAbility(1)).toStrictEqual(expectedAction);
        });

        it('should create an action to update an ability', () => {
            const event = {
                target: {
                    name: 'testName',
                    value: 'testValue'
                },
                persist: () => {}
            };

            const expectedAction = {
                type: types.UPDATE_ABILITY,
                target: 'testName',
                value: 'testValue',
                id: 1
            };

            expect(actionCreators.updateAbility(event, 1)).toStrictEqual(expectedAction);
        });

    });

    describe('asynchronous actions', () => {

        const middleware = [thunk];
        const mockStore = configureMockStore(middleware);

        describe('when deleting an abilit', () => {

            describe('when the delete succeeds', () => {

                it('should create an action to delete an ability', () => {
                    const store = mockStore();
                    const expectedActions = [{
                        type: types.DELETE_ABILITY,
                        id: 1
                    }];

                    return store.dispatch(actionCreators.deleteAbility(1)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

        });

        describe('when loading abilities', () => {

            describe('when the get succeeds', () => {

                it('should create an action to return fetched abilities', () => {
                    const store = mockStore();
                    const expectedActions = [{
                        type: types.LOAD_ABILITIES_SUCCESS,
                        abilities: testState.ki.abilities
                    }];

                    return store.dispatch(actionCreators.loadAbilities()).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

        });

        describe('when submitting a new ability', () => {

            describe('when the post and get succeed', () => {

                it('should create actions to return the submitted ability and toggle the add ability form', () => {
                    const store = mockStore();
                    const ability = {uuid: '1'};
                    const expectedActions = [
                        {type: 'SUBMIT_NEW_ABILITY_SUCCESS', ability: {editing: false, uuid: '1'}},
                        {type: "TOGGLE_ADD_ABILITY_FORM"}
                    ];

                    return store.dispatch(actionCreators.submitNewAbility(ability)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });

                });

            });

        });

    });

});
