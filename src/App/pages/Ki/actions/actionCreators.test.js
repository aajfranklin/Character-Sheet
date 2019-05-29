import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionCreators from './actionCreators';
import * as types from './actionTypes';
import { TOGGLE_SHOW_ERROR } from "../../../actions/actionTypes";
import * as errors from '../../../components/Error/ErrorTypes';
import testState from '../../../../testUtils/testState';

jest.mock('./apiGatewayPromises');

describe('Ki action creator', () => {

    describe('synchronous actions', () => {

        it('should create an action to cache an ability', () => {
            const expectedAction = {
                type: types.CACHE_ABILITY,
                uuid: '1'
            };

            expect(actionCreators.cacheAbility('1')).toStrictEqual(expectedAction);
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
                uuid: '1'
            };

            expect(actionCreators.clearAbilityCache('1')).toStrictEqual(expectedAction);
        });

        it('should create an action to revert an ability', () => {
            const expectedAction = {
                type: types.REVERT_ABILITY,
                uuid: '1'
            };

            expect(actionCreators.revertAbility('1')).toStrictEqual(expectedAction);
        });

        it('should create an action to sort abilities', () => {
            const expectedAction = {
                type: types.SORT_ABILITIES
            };

            expect(actionCreators.sortAbilities()).toStrictEqual(expectedAction);
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
                uuid: '1'
            };

            expect(actionCreators.toggleEditAbility('1')).toStrictEqual(expectedAction);
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
                index: '1'
            };

            expect(actionCreators.updateAbility(event, '1')).toStrictEqual(expectedAction);
        });

        it('should create an action to validate an ability', () => {
            const expectedAction = {
                type: types.VALIDATE_ABILITY,
                target: 'test',
                valid: false
            };

            expect(actionCreators.validateNewAbility('test')).toStrictEqual(expectedAction);
        });

        describe('when validating an ability', () => {

            it('should accept an exclusively numeric cost field', () => {
                const expectedAction = {
                    type: types.VALIDATE_ABILITY,
                    target: 'cost',
                    valid: true
                };

                expect(actionCreators.validateNewAbility('cost', '123')).toStrictEqual(expectedAction);
            });

            it('should reject a non-numeric cost field', () => {
                const expectedAction = {
                    type: types.VALIDATE_ABILITY,
                    target: 'cost',
                    valid: false
                };

                expect(actionCreators.validateNewAbility('cost', 'testValue')).toStrictEqual(expectedAction);
            });

            it('should reject a mixed cost field', () => {
                const expectedAction = {
                    type: types.VALIDATE_ABILITY,
                    target: 'cost',
                    valid: false
                };

                expect(actionCreators.validateNewAbility('cost', '1test')).toStrictEqual(expectedAction);
            });

            it('should accept a dice-roll formatted damage field', () => {
                const expectedAction = {
                    type: types.VALIDATE_ABILITY,
                    target: 'damage',
                    valid: true
                };

                expect(actionCreators.validateNewAbility('damage', '1D6')).toStrictEqual(expectedAction);
            });

            it('should accept a dice-roll formatted damage field with modifiers', () => {
                const expectedAction = {
                    type: types.VALIDATE_ABILITY,
                    target: 'damage',
                    valid: true
                };

                expect(actionCreators.validateNewAbility('damage', '1D6+1')).toStrictEqual(expectedAction);
                expect(actionCreators.validateNewAbility('damage', '1D6-1')).toStrictEqual(expectedAction);
                expect(actionCreators.validateNewAbility('damage', '1D6x1')).toStrictEqual(expectedAction);
                expect(actionCreators.validateNewAbility('damage', '1D6+WIS')).toStrictEqual(expectedAction);
            });

            it('should accept an exclusively numeric damage field', () => {
                const expectedAction = {
                    type: types.VALIDATE_ABILITY,
                    target: 'damage',
                    valid: true
                };

                expect(actionCreators.validateNewAbility('damage', '123')).toStrictEqual(expectedAction);
            });

            it('should reject a damage field without dice number', () => {
                const expectedAction = {
                    type: types.VALIDATE_ABILITY,
                    target: 'damage',
                    valid: false
                };

                expect(actionCreators.validateNewAbility('damage', 'D6')).toStrictEqual(expectedAction);
            });

            it('should reject a damage field without dice value', () => {
                const expectedAction = {
                    type: types.VALIDATE_ABILITY,
                    target: 'damage',
                    valid: false
                };

                expect(actionCreators.validateNewAbility('damage', '1D')).toStrictEqual(expectedAction);
            });

            it('should reject a damage field with partial or arbitrary modifier', () => {

                const expectedAction = {
                    type: types.VALIDATE_ABILITY,
                    target: 'damage',
                    valid: false
                };

                expect(actionCreators.validateNewAbility('damage', '1D6+')).toStrictEqual(expectedAction);
                expect(actionCreators.validateNewAbility('damage', '1D6-')).toStrictEqual(expectedAction);
                expect(actionCreators.validateNewAbility('damage', '1D6x')).toStrictEqual(expectedAction);
                expect(actionCreators.validateNewAbility('damage', '1D6+WISDOMTOOTH')).toStrictEqual(expectedAction);
            });

            it('should reject an arbitrary damage field', () => {
                const expectedAction = {
                    type: types.VALIDATE_ABILITY,
                    target: 'damage',
                    valid: false
                };

                expect(actionCreators.validateNewAbility('damage', 'test')).toStrictEqual(expectedAction);
            });

            it('should reject an empty name field', () => {
                const expectedAction = {
                    type: types.VALIDATE_ABILITY,
                    target: 'name',
                    valid: false
                };

                expect(actionCreators.validateNewAbility('name', '')).toStrictEqual(expectedAction);
            })

        });

    });

    describe('asynchronous actions', () => {

        const middleware = [thunk];
        const mockStore = configureMockStore(middleware);

        describe('when deleting an ability', () => {

            describe('when the DELETE and DeleteItem calls succeed', () => {

                it('should create an action to delete an ability', () => {
                    const store = mockStore();
                    const ability = {
                        uuid: '1',
                    };
                    const expectedActions = [
                        {type: types.DELETE_ABILITY, index: '1'},
                        {type: types.SORT_ABILITIES}
                    ];

                    return store.dispatch(actionCreators.deleteAbility(ability, '1')).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

            describe('when the DELETE call to API gateway fails', () => {

                it('should create action to show an error', () => {
                    const store = mockStore();
                    const ability = {uuid: 'deleteNetworkFailure'};
                    const expectedActions = [
                        {type: TOGGLE_SHOW_ERROR, errorMessage: errors.DELETE_ABILITY_FAILED}
                    ];

                    return store.dispatch(actionCreators.deleteAbility(ability)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

            describe('when the DeleteItem call to DynamoDB fails', () => {

                it('should create action to show an error', () => {
                    const store = mockStore();
                    const ability = {};
                    const expectedActions = [
                        {type: TOGGLE_SHOW_ERROR, errorMessage: errors.DELETE_ABILITY_FAILED}
                    ];

                    return store.dispatch(actionCreators.deleteAbility(ability)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

        });

        describe('when loading abilities', () => {

            describe('when the GET and Scan succeed', () => {

                describe('when there abilities in the DB', () => {

                    it('should create an action to return fetched abilities', () => {
                        const store = mockStore();
                        const expectedActions = [
                            {type: types.LOAD_ABILITIES_SUCCESS, abilities: testState.ki.abilities},
                            {type: types.SORT_ABILITIES}
                        ];

                        return store.dispatch(actionCreators.loadAbilities()).then(() => {
                            expect(store.getActions()).toEqual(expectedActions);
                        });
                    });

                });

                describe('when no abilities are returned', () => {

                    it('should create an actions to return empty fetched abilities and show an error', () => {
                        testState.ki.mockGetAbilitiesNetworkResult = 'noAbilitiesFound';
                        const store = mockStore();
                        const expectedActions = [
                            {type: types.LOAD_ABILITIES_SUCCESS, abilities: []},
                            {type: TOGGLE_SHOW_ERROR, errorMessage: errors.NO_ABILITIES_FOUND}
                        ];

                        return store.dispatch(actionCreators.loadAbilities()).then(() => {
                            expect(store.getActions()).toEqual(expectedActions);
                        });
                    })

                })

            });

            describe('when the GET call to API gateway fails', () => {

                it('should create an action to show an error', () => {
                    testState.ki.mockGetAbilitiesNetworkResult = 'getAllNetworkFailure';
                    const store = mockStore();
                    const expectedActions = [{
                        type: TOGGLE_SHOW_ERROR, errorMessage: errors.LOAD_ABILITIES_FAILED
                    }];

                    return store.dispatch(actionCreators.loadAbilities()).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

            describe('when the Scan call to DynamoDB fails', () => {

                it('should create an action to show an error', () => {
                    testState.ki.mockGetAbilitiesNetworkResult = 'getAllDynamoFailure';
                    const store = mockStore();
                    const expectedActions = [{
                        type: TOGGLE_SHOW_ERROR, errorMessage: errors.LOAD_ABILITIES_FAILED
                    }];

                    return store.dispatch(actionCreators.loadAbilities()).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

        });

        describe('when submitting a new ability', () => {

            describe('when all calls succeed', () => {

                it('should create actions to return the submitted ability and toggle the add ability form', () => {
                    const store = mockStore();
                    const ability = {uuid: '1'};
                    const expectedActions = [
                        {type: types.SUBMIT_NEW_ABILITY_SUCCESS, ability: {editing: false, uuid: '1'}},
                        {type: types.SORT_ABILITIES},
                        {type: types.TOGGLE_ADD_ABILITY_FORM}
                    ];

                    return store.dispatch(actionCreators.submitNewAbility(ability)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });

                });

            });

            describe('when the PUT call to API gateway fails', () => {

                it('should create actions to toggle add ability form and show an error', () => {
                    const store = mockStore();
                    const ability = {uuid: 'putNetworkFailure'};
                    const expectedActions = [
                        {type: types.TOGGLE_ADD_ABILITY_FORM},
                        {type: TOGGLE_SHOW_ERROR, errorMessage: errors.SUBMIT_ABILITY_FAILED_PUT}
                    ];

                    return store.dispatch(actionCreators.submitNewAbility(ability)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

            describe('when the PutItem call to DynamoDB fails', () => {

                it('should create actions to toggle add ability form and show an error', () => {
                    const store = mockStore();
                    const ability = {};
                    const expectedActions = [
                        {type: types.TOGGLE_ADD_ABILITY_FORM},
                        {type: TOGGLE_SHOW_ERROR, errorMessage: errors.SUBMIT_ABILITY_FAILED_PUT}
                    ];

                    return store.dispatch(actionCreators.submitNewAbility(ability)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

            describe('when the GET call to API gateway fails', () => {

                it('should create actions to toggle add ability form and show an error', () => {
                    const store = mockStore();
                    const ability = {uuid: 'getNetworkFailure'};
                    const expectedActions = [
                        {type: types.TOGGLE_ADD_ABILITY_FORM},
                        {type: TOGGLE_SHOW_ERROR, errorMessage: errors.SUBMIT_ABILITY_FAILED_GET}
                    ];

                    return store.dispatch(actionCreators.submitNewAbility(ability)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

            describe('when the GetItem call to DynamoDB fails', () => {

                it('should create actions to toggle add ability form and show an error', () => {
                    const store = mockStore();
                    const ability = {uuid: 'getDynamoFailure'};
                    const expectedActions = [
                        {type: types.TOGGLE_ADD_ABILITY_FORM},
                        {type: TOGGLE_SHOW_ERROR, errorMessage: errors.SUBMIT_ABILITY_FAILED_GET}
                    ];

                    return store.dispatch(actionCreators.submitNewAbility(ability)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

        });

        describe('when an updated ability is saved', () => {

            describe('when the PUT and PutItem calls succeed', () => {

                it('should create actions to clear ability cache and toggle ability editing', () => {
                    const store = mockStore();
                    const ability = {uuid: '1', name: 'preSave'};
                    const expectedActions = [
                        {type: types.CLEAR_ABILITY_CACHE, uuid: '1'},
                        {type: types.TOGGLE_EDIT_ABILITY, uuid: '1'},
                        {type: types.SORT_ABILITIES}
                    ];

                    return store.dispatch(actionCreators.saveAbility(ability)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

            describe('when the PUT call to API gateway fails', () => {

                it('should create actions to revert ability, clear ability cache, toggle ability editing, and show an error', () => {
                    const store = mockStore();
                    const ability = {name: 'preSave', uuid: 'putNetworkFailure'};
                    const expectedActions = [
                        {type: types.REVERT_ABILITY, uuid: 'putNetworkFailure'},
                        {type: types.CLEAR_ABILITY_CACHE, uuid: 'putNetworkFailure'},
                        {type: TOGGLE_SHOW_ERROR, errorMessage: errors.UPDATE_ABILITY_FAILED}
                    ];

                    return store.dispatch(actionCreators.saveAbility(ability)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

            describe('when the PutItem call to DynamoDB fails', () => {

                it('should create actions to revert ability, clear ability cache, toggle ability editing, and show an error', () => {
                    const store = mockStore();
                    const ability = {name: 'preSave'};
                    const expectedActions = [
                        {type: types.REVERT_ABILITY, uuid: undefined},
                        {type: types.CLEAR_ABILITY_CACHE, uuid: undefined},
                        {type: TOGGLE_SHOW_ERROR, errorMessage: errors.UPDATE_ABILITY_FAILED}
                    ];

                    return store.dispatch(actionCreators.saveAbility(ability)).then(() => {
                        expect(store.getActions()).toEqual(expectedActions);
                    });
                });

            });

        })

    });

});
