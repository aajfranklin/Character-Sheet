import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import testState from '../../../../testUtils/testState';
import { deepCopy } from '../../../../testUtils/testHelpers';
import { AbilityForm } from './AbilityForm';

Enzyme.configure({adapter: new Adapter()});
let wrapper;

const state = deepCopy(testState);

const mockToggleAbilityForm = jest.fn();
const mockHandleFormChange = jest.fn();
const mockSubmitNewAbility = jest.fn();
const mockValidateAbility = jest.fn();

function setUp() {
    wrapper = shallow(<AbilityForm newAbility={state.ki.newAbility}
                                   isValid={state.ki.newAbilityIsValid}
                                   toggleAbilityForm={mockToggleAbilityForm}
                                   handleFormChange={mockHandleFormChange}
                                   submitNewAbility={mockSubmitNewAbility}
                                   validate={mockValidateAbility}
    />)
}

describe('AbilityForm', () => {

    describe('on rendering the ability form', () => {

        beforeAll(() => {
            setUp();
        });

        it('should contain one input field for each ability', ()=> {
            expect(wrapper.find('textarea').length).toBe(6);
        });

        describe('when input text changes', () => {

            it('should call handle form change ability', () => {
                wrapper.find('textarea').at(0).simulate('change');
                expect(mockHandleFormChange.mock.calls.length).toBe(1);
            });

        });

        describe('when the user exits an ability field', () => {

            it('should call validate', () => {
                wrapper.findWhere(node => node.prop('name') === 'name').at(0).simulate('blur');
                wrapper.findWhere(node => node.prop('name') === 'cost').at(0).simulate('blur');
                wrapper.findWhere(node => node.prop('name') === 'damage').at(0).simulate('blur');
                wrapper.findWhere(node => node.prop('name') === 'boost').at(0).simulate('blur');
                wrapper.findWhere(node => node.prop('name') === 'saving').at(0).simulate('blur');
                wrapper.findWhere(node => node.prop('name') === 'effect').at(0).simulate('blur');
                expect(mockValidateAbility.mock.calls.length).toBe(6);
            });

        });

        it('should contain no invalid field warnings', () => {
            expect(wrapper.find('.invalid').length).toBe(0);
        });

        it('should disable the submit button,', () => {
            expect(wrapper.find('Button').at(0).prop('disabled')).toBe(true);
        });

        describe('when one or more ability fields are invalid', () => {

            beforeAll(() => {
                const isValid = {name: false, cost: false, damage: true, boost: true, saving: true, effect: true};

                wrapper = shallow(<AbilityForm newAbility={state.ki.newAbility}
                                               isValid={isValid}
                                               toggleAbilityForm={mockToggleAbilityForm}
                                               handleFormChange={mockHandleFormChange}
                                               submitNewAbility={mockSubmitNewAbility}
                                               validate={mockValidateAbility}
                />)
            });

            it('should contain one invalid className for every invalid ability field', () => {
                expect(wrapper.find('.invalid').length).toBe(2);
            });

        });

        describe('when all ability fields are valid and contain soe text', () => {

            beforeAll(() => {
                const isValid = {name: true, cost: true, damage: true, boost: true, saving: true, effect: true};
                const newAbility = {name: 'test', cost: 'test', damage: 'test', boost: 'test', saving: 'test', effect: 'test'};

                wrapper = shallow(<AbilityForm newAbility={newAbility}
                                               isValid={isValid}
                                               toggleAbilityForm={mockToggleAbilityForm}
                                               handleFormChange={mockHandleFormChange}
                                               submitNewAbility={mockSubmitNewAbility}
                                               validate={mockValidateAbility}
                />)
            });

            it('should enable the submit button', () => {
                expect(wrapper.find('Button').at(0).prop('disabled')).toBe(false);
            });

        });

        it('should show the submit and cancel buttons', () => {
            expect(wrapper.find('Button').length).toBe(2);
            expect(wrapper.find('Button').at(0).prop('icon')).toBe('fas fa-check-circle');
            expect(wrapper.find('Button').at(1).prop('icon')).toBe('fas fa-times-circle');
        });

        describe('when the submit button is clicked', () => {

            it('should call submit ability', () => {
                wrapper.find('Button').at(0).dive().simulate('click');
                expect(mockSubmitNewAbility.mock.calls.length).toBe(1);
            });

        });

        describe('when the cancel button is clicked', () => {

            it('should call toggle ability form', () => {
                wrapper.find('Button').at(1).dive().simulate('click');
                expect(mockToggleAbilityForm.mock.calls.length).toBe(1);
            });

        });

    });

});
