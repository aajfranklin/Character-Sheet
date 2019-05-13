import React from 'react';
import Button from './Button';
import * as chai from 'chai';
import sinon from 'sinon';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const expect = chai.expect;

describe('On rendering a button', () => {

    let wrapper;

    const mockFunction = sinon.spy();

    beforeAll(() => {
        Enzyme.configure({ adapter: new Adapter() });
        wrapper = mount(<Button clickHandler={mockFunction} label='testButton' icon='fas fa-check' isLeftToRight={true}/>);
    });

    it('has the correct label', () => {
        expect(wrapper.find('.button').text()).contains(' testButton');
    });

    it('has the correct icon', () => {
        expect(wrapper.find('i').hasClass('fas fa-check')).equals(true);
    });

    describe('when the button is clicked', () => {

        it('calls the passed in clickHandler function', () => {
            wrapper.find('.button').at(0).simulate('click');
            expect(mockFunction.calledOnce).equals(true);
        });

    });

});
