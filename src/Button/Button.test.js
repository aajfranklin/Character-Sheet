import React from 'react';
import Button from './Button';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Button', () => {

    describe('On rendering a button', () => {

        let wrapper;

        const mockFunction = jest.fn();

        beforeAll(() => {
            Enzyme.configure({ adapter: new Adapter() });
            wrapper = mount(<Button clickHandler={mockFunction} label='testButton' icon='fas fa-check' isLeftToRight={true}/>);
        });

        it('has the correct label', () => {
            console.log(wrapper.find('.button').text());
            expect(wrapper.find('.button').text()).toBe(' testButton');
        });

        it('has the correct icon', () => {
            expect(wrapper.find('i').hasClass('fas fa-check')).toBe(true);
        });

        describe('when the button is clicked', () => {

            it('calls the passed in clickHandler function', () => {
                wrapper.find('.button').at(0).simulate('click');
                expect(mockFunction).toHaveBeenCalledTimes(1);
            });

        });

    });

});
