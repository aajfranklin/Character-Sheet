import React from 'react';
import Ki from './Ki';
import * as chai from 'chai';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const expect = chai.expect;

describe('On rendering the Ki page', () => {

    let wrapper;

    beforeAll(() => {
        Enzyme.configure({ adapter: new Adapter() });
        wrapper = mount(<Ki/>);
    });

    it('displays the Ki heading', () => {
        expect(wrapper.find('h1').length).equals(1);
        expect(wrapper.find('h1').text()).equals('Ki');
    });

    it('displays ability table labels once', () => {
        expect(wrapper.find('.labels').length).equals(1);
    });

    it('displays one row per ability in the dummy data', () => {
        expect(wrapper.find('.entries').length).equals(3);
    });

    it('contains 2 action buttons', () => {
       expect(wrapper.find('Button').length).equals(2);
       expect(wrapper.find('Button').at(0).text()).contains('ADD ABILITY');
       expect(wrapper.find('Button').at(1).text()).contains('MEDITATE');
    });

});
