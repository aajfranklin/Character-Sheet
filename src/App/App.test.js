import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Route } from 'react-router-dom';
import { deepCopy } from '../testUtils/testHelpers';
import testState from '../testUtils/testState';
import { App } from './App';
import Stats from './pages/Stats/Stats';
import Weapons from './pages/Weapons/Weapons';
import Ki from './pages/Ki/Ki';
import Abilities from './pages/Abilities/Abilities';
import Lore from './pages/Lore/Lore';
import Map from './pages/Map/Map';
import NotFound from './pages/NotFound/NotFound'

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

            expect(wrapper.find('NavLink').length).toBe(state.app.pages.length);

            for (let i = 0; i < state.app.pages.length; i++) {
                expect(wrapper.find('NavLink').at(i).key()).toBe(state.app.pages[i]);
            }
        });

        describe('when using the nav bar', () => {

            let pathMap = {};

            beforeAll(() => {
                wrapper = shallow(<App pages={testState.app.pages}/>);
                pathMap = wrapper.find(Route).reduce((pathMap, route) => {
                    const routeProps = route.props();
                    pathMap[routeProps.path] = routeProps.component;
                    return pathMap;
                }, {});
                console.log(pathMap)
            });

            it('should show Stats page for /Stats route', () => {
                expect(pathMap['/Stats']).toBe(Stats);
            });

            it('should show Weapons page for /Weapons route', () => {
                expect(pathMap['/Weapons']).toBe(Weapons);
            });

            it('should show Ki page for /Ki route', () => {
                expect(pathMap['/Ki']).toBe(Ki);
            });

            it('should show Abilities page for /Abilities route', () => {
                expect(pathMap['/Abilities']).toBe(Abilities);
            });

            it('should show Map page for /Map route', () => {
                expect(pathMap['/Map']).toBe(Map);
            });

            it('should show Lore page for /Lore route', () => {
                expect(pathMap['/Lore']).toBe(Lore);
            });

            it('should show Page not found for undefined route', () => {
                expect(pathMap['undefined']).toBe(NotFound);
            });

        });

    });

});
