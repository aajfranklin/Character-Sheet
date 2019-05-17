import React from 'react';
import NavBar from './NavBar';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('NavBar', () => {

    describe('On rendering the nav bar', () => {

        it('generates nav bar items from passed in pages prop', () => {

            const testPages = [
              'page1',
              'page2',
              'page3'
            ];

            Enzyme.configure({ adapter: new Adapter() });
            const wrapper = mount(<NavBar pages={testPages}/>);
            expect(wrapper.find('Link').length).toBe(wrapper.prop('pages').length);

            for (let i = 0; i < testPages.length; i++) {
                expect(wrapper.text().includes(wrapper.prop('pages')[0])).toBe(true);
            }
        });

    });

});
