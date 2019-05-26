import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import testState from '../../../../testUtils/testState';
import { deepCopy } from '../../../../testUtils/testHelpers';
import { Ability } from './Ability';

Enzyme.configure({adapter: new Adapter()});
let wrapper;

const state = deepCopy(testState);

const mockCancelEdit = jest.fn();
const mockDeleteAbility = jest.fn();
const mockEditAbility = jest.fn();
const mockSaveAbility = jest.fn();
const mockUpdateAbility = jest.fn();

function setUp() {
    wrapper = shallow(<Ability abilities={state.ki.abilities} id={0}
                               cancelEdit={mockCancelEdit}
                               deleteAbility={mockDeleteAbility}
                               editAbility={mockEditAbility}
                               saveAbility={mockSaveAbility}
                               updateAbility={mockUpdateAbility}
    />)
}

describe('Ability', () => {

    describe('on rendering an ability with editing false', () => {

        beforeAll(() => {
            setUp();
        });

        it('contains one entry', () => {
            expect(wrapper.find('.entry').length).toBe(1);
        });

        it('should contain one column for each attribute of the ability', () => {
            expect(wrapper.find('.col-1').length).toBe(3);
            expect(wrapper.find('.col-2').length).toBe(3);
            expect(wrapper.find('.col-6').length).toBe(1);
        });

        it('should display the edit and delete buttons', () => {
            expect(wrapper.find('Button').length).toBe(2);
            expect(wrapper.find('Button').at(0).prop('icon')).toBe('fas fa-edit');
            expect(wrapper.find('Button').at(1).prop('icon')).toBe('fas fa-trash');
        });

        describe('when the edit button is clicked', () => {

            it('should call edit ability', () => {
                wrapper.find('Button').at(0).dive().simulate('click');
                expect(mockEditAbility.mock.calls.length).toBe(1);
            });

        });

        describe('when delete button is clicked', () => {

            it('should call delete ability', () => {
                wrapper.find('Button').at(1).dive().simulate('click');
                expect(mockDeleteAbility.mock.calls.length).toBe(1);
            });

        });

    });

    describe('on rendering an ability with editing true', () => {

        beforeAll(() => {
            state.ki.abilities[0].editing = true;
            setUp();
        });

        it('should contain one input text area for each attribute of the ability', () => {
            expect(wrapper.find('TextareaAutosize').length).toBe(6);
        });

        describe('when input text changes', () => {

            it('should call update ability', () => {
                wrapper.find('TextareaAutosize').at(0).simulate('change');
                expect(mockUpdateAbility.mock.calls.length).toBe(1);
            });

        });

        it('should display the save and cancel buttons', () => {
            expect(wrapper.find('Button').length).toBe(2);
            expect(wrapper.find('Button').at(0).prop('icon')).toBe('fas fa-save');
            expect(wrapper.find('Button').at(1).prop('icon')).toBe('fas fa-times-circle');
        });

        describe('when the save button is clicked', () => {

            it('should call save ability', () => {
                wrapper.find('Button').at(0).dive().simulate('click');
                expect(mockSaveAbility.mock.calls.length).toBe(1);
            });

        });

        describe('when delete cancel is clicked', () => {

            it('should call cancel edit', () => {
                wrapper.find('Button').at(1).dive().simulate('click');
                expect(mockCancelEdit.mock.calls.length).toBe(1);
            });

        });

    });

});
