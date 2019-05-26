import * as actionCreators from './actionCreators';
import * as types from './actionTypes';

describe('Ki action creator', () => {

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

    it('should create an action to delete an ability', () => {
        const expectedAction = {
            type: types.DELETE_ABILITY,
            id: 1
        };

        expect(actionCreators.deleteAbility(1)).toStrictEqual(expectedAction);
    });

    describe('when fetching abilities', () => {

        describe('when the fetch succeeds', () => {

            it('should create an action to return fetched abilities', () => {
                // const abilities = [{name: 'testAbility'}];
                // const expectedAction = {
                //     type: types.FETCH_ABILITIES_SUCCESS,
                //     abilities
                // };
                //
                // expect(actionCreators.fetchAbilitiesSuccess(abilities)).toStrictEqual(expectedAction);

                expect(false).toBe(true);
            });

        });

    });

    it('should create an action to revert an ability', () => {
        const expectedAction = {
            type: types.REVERT_ABILITY,
            id: 1
        };

        expect(actionCreators.revertAbility(1)).toStrictEqual(expectedAction);
    });

    describe('when submitting a new ability', () => {

        describe('when the submit succeeds', () => {

            it('should create an action to return the submitted ability', () => {
                expect(false).toBe(true);
            });

            it('should create an action to toggle the add ability form', () => {
                expect(false).toBe(true);
            });

        });

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
