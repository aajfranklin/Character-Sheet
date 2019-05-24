import React from 'react';
import {CHANGE_FORM_TEXT, SUBMIT_NEW_ABILITY, TOGGLE_ADD_ABILITY_FORM} from './actions/actionTypes';
import { createMockStore } from 'redux-test-utils';
import { deepCopy, mountInProvider } from '../../../testUtils/testHelpers';
import testState from '../../../testUtils/testState';
import Ki from './Ki';

let wrapper;
let store;
let state;

function setUp(customState) {
    state = customState ? deepCopy(customState) : deepCopy(testState);
    store = createMockStore(state);
    wrapper = mountInProvider(<Ki/>, store);
}

describe('Ki', () => {

    describe('On rendering the Ki page', () => {

        beforeAll(() => {
            setUp();
        });

        it('displays the Ki heading', () => {
            expect(wrapper.find('h1').length).toBe(1);
            expect(wrapper.find('h1').text()).toBe('Ki');
        });

        it('displays ability table labels once', () => {
            expect(wrapper.find('.labels').length).toBe(1);
        });

        it('displays one row per ability in the dummy data', () => {
            expect(wrapper.find('.entry').length).toBe(state.ki.abilities.length);
        });

        it('contains 1 delete and edit button per ability and 2 header action buttons', () => {
           expect(wrapper.find('Button').length).toBe(state.ki.abilities.length * 2 + 2);
           expect(wrapper.find('Button').at(0).text()).toBe(' MEDITATE');
           expect(wrapper.find('Button').at(1).text()).toBe(' ADD ABILITY');
        });

        it('should not render ability toolbar', () => {
            expect(wrapper.find('form').length).toBe(0);
        });

        describe('when delete button is clicked', () => {

            it('should dispatch the delete ability action', () => {
                wrapper.find({icon: 'fas fa-trash'}).at(0).simulate('click');
                expect(store.getActions()[0].type).toBe('DELETE_ABILITY');
            });

        });

        describe('when the edit button is clicked', () => {

            beforeAll(() => {
                setUp();
            });

            it('should dispatch the cache and toggle edit ability actions', () => {
                wrapper.find({icon: 'fas fa-edit'}).at(0).simulate('click');
                expect(store.getActions()[0].type).toBe('CACHE_ABILITY');
                expect(store.getActions()[1].type).toBe('TOGGLE_EDIT_ABILITY');
            });

            describe('when an ability is being edited', () => {

                beforeAll(() => {
                    const customState = deepCopy(testState);
                    customState.ki.abilities[0].editing = true;
                    setUp(customState);
                });

                it('should display the save and cancel buttons', () => {
                    expect(wrapper.find({icon: 'fas fa-save'}).length).toBe(1);
                    expect(wrapper.find({icon: 'fas fa-times-circle'}).length).toBe(1);
                });

                describe('when the save button is clicked', () => {

                    it('should dispatch the clear ability cache and toggle edit ability actions', () => {
                        wrapper.find({icon: 'fas fa-save'}).at(0).simulate('click');
                        expect(store.getActions()[0].type).toBe('CLEAR_ABILITY_CACHE');
                        expect(store.getActions()[1].type).toBe('TOGGLE_EDIT_ABILITY');
                    });

                });

                describe('when the cancel button is clicked', () => {

                    it('should dispatch the revert ability and clear ability cache actions', () => {
                        wrapper.find({icon: 'fas fa-times-circle'}).at(0).simulate('click');
                        expect(store.getActions()[2].type).toBe('REVERT_ABILITY');
                        expect(store.getActions()[3].type).toBe('CLEAR_ABILITY_CACHE');
                    });

                });

            });

        })

    });

    describe('when add ability button is clicked', () => {

        beforeAll(() => {
            setUp();
            wrapper.find({ label: 'ADD ABILITY'}).simulate('click');
        });

        it('should dispatch the toggle ability action', () => {
            expect(store.getActions()[0].type).toBe('TOGGLE_ADD_ABILITY_FORM');
        });

    });

    describe('when showAbilityForm state is set to true', () => {

        const customState = deepCopy(testState);
        customState.ki.showAbilityForm = true;

        beforeAll(() => {
            setUp(customState);
        });

        it('should render ability toolbar', () => {
            expect(wrapper.find('form').length).toBe(1);
        });

        it('should disable the add ability button', () => {
            expect(wrapper.find({label: 'ADD ABILITY'}).prop('disabled')).toBe(true);
        });

        it('should show the submit and cancel buttons', () => {
            expect(wrapper.find('Button').length).toBe(state.ki.abilities.length * 2 + 4);
            expect(wrapper.find('Button').at(2).text()).toBe(' SUBMIT');
            expect(wrapper.find('Button').at(3).text()).toBe(' CANCEL');
        });

        it('should dispatch the change form text action', () => {
            wrapper.find('input').at(0).simulate('change');
            expect(store.getActions()[0].type).toBe(CHANGE_FORM_TEXT);
        });

        describe('when the user clicks submit', () => {

            beforeAll(() => {
                setUp(customState);
            });

            it('should dispatch the submit new ability and toggle ability form actions', () => {
                wrapper.find('Button').at(2).simulate('click');
                expect(store.getActions()[0].type).toBe(SUBMIT_NEW_ABILITY);
                expect(store.getActions()[1].type).toBe(TOGGLE_ADD_ABILITY_FORM);
            });

        });

        describe('when the user clicks cancel', () => {

            beforeAll(() => {
                setUp(customState);
            });

            it('should dispatch the toggle ability action', () => {
                wrapper.find('Button').at(3).simulate('click');
                expect(store.getActions()[0].type).toBe(TOGGLE_ADD_ABILITY_FORM);
            });

        });

    });

});
