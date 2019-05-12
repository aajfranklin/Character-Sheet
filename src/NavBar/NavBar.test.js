import React from 'react';
import NavBar from './NavBar';
import * as chai from "chai";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const expect = chai.expect;

describe('On rendering the nav bar', () => {

    it('includes 6 navigation options', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const wrapper = shallow(<NavBar />);

        expect(wrapper.find('li').length).equals(6);
        expect(wrapper.text().includes('Stats')).equals(true);
        expect(wrapper.text().includes('Rolls')).equals(true);
        expect(wrapper.text().includes('Abilities')).equals(true);
        expect(wrapper.text().includes('Ki')).equals(true);
        expect(wrapper.text().includes('Lore')).equals(true);
        expect(wrapper.text().includes('Map')).equals(true);
    });

});
