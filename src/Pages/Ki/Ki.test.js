import React from 'react';
import {CHANGE_FORM_TEXT, SUBMIT_NEW_ABILITY, TOGGLE_ABILITY_FORM} from '../../reducer/actionTypes';
import { createMockStore } from 'redux-test-utils';
import { mountInProvider } from '../../utils/testUtils.js';
import { testKiAbilities, testNewAbility } from '../../utils/testConfig.js';
import Ki from './Ki.js';

let state;

describe('Ki', () => {

    describe('On rendering the Ki page', () => {

        state = { ki: { abilities: testKiAbilities, showAbilityForm: false, newAbility: {...testNewAbility} } };
        let wrapper;
        let store;

        beforeAll(() => {
            store = createMockStore(state);
            wrapper = mountInProvider(<Ki/>, store);
        });

        it('displays the Ki heading', () => {
            expect(wrapper.find('h1').length).toBe(1);
            expect(wrapper.find('h1').text()).toBe('Ki');
        });

        it('displays ability table labels once', () => {
            expect(wrapper.find('.labels').length).toBe(1);
        });

        it('displays one row per ability in the dummy data', () => {
            expect(wrapper.find('.entries').length).toBe(3);
        });

        it('contains 2 action buttons', () => {
           expect(wrapper.find('Button').length).toBe(2);
           expect(wrapper.find('Button').at(0).text()).toBe(' MEDITATE');
           expect(wrapper.find('Button').at(1).text()).toBe(' ADD ABILITY');
        });

        it('should not render ability toolbar', () => {
            expect(wrapper.find('form').length).toBe(0);
        });

    });

    describe('when add ability button is clicked', () => {

        let wrapper;
        let store;

        beforeAll(() => {
            store = createMockStore(state);
            wrapper = mountInProvider(<Ki/>, store);
            wrapper.find('Button').at(1).simulate('click');
        });

        it('should dispatch the toggle ability action', () => {
            expect(store.getActions()[0].type).toBe('TOGGLE_ABILITY_FORM');
        });

    });

    describe('when showAbilityForm state is set to true', () => {

        let state = { ki: { abilities: testKiAbilities, showAbilityForm: true} };
        let wrapper;
        let store;

        beforeAll(() => {
            store = createMockStore(state);
            wrapper = mountInProvider(<Ki/>, store);
        });

        it('should render ability toolbar', () => {
            expect(wrapper.find('form').length).toBe(1);
        });

        it('should show the submit and cancel buttons', () => {
            expect(wrapper.find('Button').length).toBe(4);
            expect(wrapper.find('Button').at(2).text()).toBe(' SUBMIT');
            expect(wrapper.find('Button').at(3).text()).toBe(' CANCEL');
        });

        it('should dispatch the change form text action', () => {
            wrapper.find('input').at(0).simulate('change');
            expect(store.getActions()[0].type).toBe(CHANGE_FORM_TEXT);
        });

        describe('when the user clicks submit', () => {

            beforeAll(() => {
                store = createMockStore(state);
                wrapper = mountInProvider(<Ki/>, store);
            });

            it('should dispatch the submit new ability action', () => {
                wrapper.find('Button').at(2).simulate('click');
                expect(store.getActions()[0].type).toBe(SUBMIT_NEW_ABILITY);
            });

        });

        describe('when the user clicks cancel', () => {

            beforeAll(() => {
                store = createMockStore(state);
                wrapper = mountInProvider(<Ki/>, store);
            });

            it('should dispatch the toggle ability action', () => {
                wrapper.find('Button').at(3).simulate('click');
                expect(store.getActions()[0].type).toBe(TOGGLE_ABILITY_FORM);
            });

        });

    });

});
