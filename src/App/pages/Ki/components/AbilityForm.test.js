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

function setUp() {
    wrapper = shallow(<AbilityForm newAbility={state.ki.newAbility}
                                   toggleAbilityForm={mockToggleAbilityForm}
                                   handleFormChange={mockHandleFormChange}
                                   submitNewAbility={mockSubmitNewAbility}
    />)
}

describe('AbilityForm', () => {

    describe('on rendering the ability form', () => {

        beforeAll(() => {
            setUp();
        });

        it('should contain one input field for each ability', ()=> {
            expect(wrapper.find('input').length).toBe(6);
        });

        describe('when input text changes', () => {

            it('should call handle form change ability', () => {
                wrapper.find('input').at(0).simulate('change');
                expect(mockHandleFormChange.mock.calls.length).toBe(1);
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
