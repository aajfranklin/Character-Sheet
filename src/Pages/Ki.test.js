import React from 'react';
import Ki from './Ki';
import * as chai from 'chai';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from "../NavBar/NavBar";

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

    it('displays dummy data', () => {
        expect(wrapper.find('.labels').length).equals(1);
        expect(wrapper.find('.entries').length).equals(3);
    })

});
