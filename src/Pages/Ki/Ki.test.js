import React from 'react';
import Ki from './Ki';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Ki', () => {

    describe('On rendering the Ki page', () => {

        let wrapper;

        beforeAll(() => {
            wrapper = mount(<Ki/>);
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

    describe('when the user clicks \'Add Ability\'', () => {

        let wrapper;

        beforeAll(() => {
            wrapper = mount(<Ki/>);
            wrapper.find('Button').at(1).simulate('click');
        });

        it('should render ability toolbar', () => {
            expect(wrapper.find('form').length).toBe(1);
        });

        it('should show the submit and cancel buttons', () => {
            expect(wrapper.find('Button').length).toBe(4);
            expect(wrapper.find('Button').at(2).text()).toBe(' SUBMIT');
            expect(wrapper.find('Button').at(3).text()).toBe(' CANCEL');
        });

        describe('when the user clicks submit', () => {

            beforeAll(() => {
                wrapper = mount(<Ki/>);
                wrapper.find('Button').at(1).simulate('click');
                wrapper.find('Button').at(2).simulate('click');
            });

            it('should hide the ability toolbar', () => {
                expect(wrapper.find('form').length).toBe(0);
            });

        });

        describe('when the user clicks cancel', () => {

            beforeAll(() => {
                wrapper = mount(<Ki/>);
                wrapper.find('Button').at(1).simulate('click');
                wrapper.find('Button').at(3).simulate('click');
            });

            it('should hide the ability toolbar', () => {
                expect(wrapper.find('form').length).toBe(0);
            });

        });

    });

});
