import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { deepCopy } from '../testUtils/testHelpers';
import testState from '../testUtils/testState';
import { App } from './App';

Enzyme.configure({adapter: new Adapter()});
let wrapper;

const state = deepCopy(testState);

describe('App', () => {

    describe('On loading the home page', () => {

        beforeAll(() => {
            wrapper = shallow(<App pages={testState.app.pages}/>);
        });

        it('renders the nav bar', () => {
            expect(wrapper.find('nav').length).toBe(1);
        });

        it('generates nav bar items from passed in pages prop', () => {

            expect(wrapper.find('Link').length).toBe(state.app.pages.length);

            for (let i = 0; i < state.app.pages.length; i++) {
                expect(wrapper.find('Link').at(i).key()).toBe(state.app.pages[i]);
            }
        });

    });

});
