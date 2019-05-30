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
const mockUseAbility = jest.fn();
const mockValidateEdit = jest.fn();

function setUp() {
    wrapper = shallow(<Ability ability={state.ki.abilities[0]} index={0}
                               cancelEdit={mockCancelEdit}
                               deleteAbility={mockDeleteAbility}
                               editAbility={mockEditAbility}
                               saveAbility={mockSaveAbility}
                               _useAbility={mockUseAbility}
                               updateAbility={mockUpdateAbility}
                               validate={mockValidateEdit}
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
            expect(wrapper.find('Button').length).toBe(3);
            expect(wrapper.find('Button').at(0).prop('icon')).toBe('fas fa-dice-d20');
            expect(wrapper.find('Button').at(1).prop('icon')).toBe('fas fa-edit');
            expect(wrapper.find('Button').at(2).prop('icon')).toBe('fas fa-trash');
        });

        describe('when the roll button is clicked', () => {

            it('should call use ability', () => {
                wrapper.find('Button').at(0).dive().simulate('click');
                expect(mockUseAbility.mock.calls.length).toBe(1);
            });

        });

        describe('when the edit button is clicked', () => {

            it('should call edit ability', () => {
                wrapper.find('Button').at(1).dive().simulate('click');
                expect(mockEditAbility.mock.calls.length).toBe(1);
            });

        });

        describe('when delete button is clicked', () => {

            it('should call delete ability', () => {
                wrapper.find('Button').at(2).dive().simulate('click');
                expect(mockDeleteAbility.mock.calls.length).toBe(1);
            });

        });

        describe('when the ability costs more than the currently available Ki', () => {

            beforeAll(() => {
                wrapper = shallow(<Ability ability={state.ki.abilities[0]} index={0}
                                           available={0}
                                           cancelEdit={mockCancelEdit}
                                           deleteAbility={mockDeleteAbility}
                                           editAbility={mockEditAbility}
                                           saveAbility={mockSaveAbility}
                                           useAbility={mockUseAbility}
                                           updateAbility={mockUpdateAbility}
                                           validate={mockValidateEdit}
                />)
            });

            it('should disable the roll button', () => {
                expect(wrapper.find('Button').at(0).prop('disabled')).toBe(true);
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

        it('should display the roll, save, and cancel buttons', () => {
            expect(wrapper.find('Button').length).toBe(3);
            expect(wrapper.find('Button').at(0).prop('icon')).toBe('fas fa-dice-d20');
            expect(wrapper.find('Button').at(1).prop('icon')).toBe('fas fa-save');
            expect(wrapper.find('Button').at(2).prop('icon')).toBe('fas fa-times-circle');
        });

        it('should disable the roll button', () => {
            expect(wrapper.find('Button').at(0).prop('disabled')).toBe(true);
        });

        it('should disable the save button', () => {
            expect(wrapper.find('Button').at(1).prop('disabled')).toBe(true);
        });

        describe('when input text changes', () => {

            it('should call update ability', () => {
                wrapper.find('TextareaAutosize').at(0).simulate('change');
                expect(mockUpdateAbility.mock.calls.length).toBe(1);
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
                expect(mockValidateEdit.mock.calls.length).toBe(6);
            });

        });

        describe('when some attributes are invalid', () => {

            beforeAll(() => {
                state.ki.abilities[0].editing = true;
                state.ki.abilities[0].editValidation.name = false;
                state.ki.abilities[0].editValidation.cost = false;
                setUp();
            });

            it('should contain one invalid className for each invalid attribute', () => {
                expect(wrapper.find('.invalid').length).toBe(2);
            });

            it('should disable the save button', () => {
                expect(wrapper.find('Button').at(1).prop('disabled')).toBe(true);
            });

        });

        describe('when no attributes are invalid and at least one has changed and is valid', () => {

            beforeAll(() => {
                state.ki.abilities[0].editing = true;
                state.ki.abilities[0].editValidation.name = true;
                state.ki.abilities[0].editValidation.cost = true;
                setUp();
            });

            it('should enable the save button', () => {
                expect(wrapper.find('Button').at(1).prop('disabled')).toBe(false);
            });

            describe('when the save button is clicked', () => {

                it('should call save ability', () => {
                    wrapper.find('Button').at(1).dive().simulate('click');
                    expect(mockSaveAbility.mock.calls.length).toBe(1);
                });

            });

        });

        describe('when the cancel button is clicked', () => {

            it('should call cancel edit', () => {
                wrapper.find('Button').at(2).dive().simulate('click');
                expect(mockCancelEdit.mock.calls.length).toBe(1);
            });

        });

    });

});
