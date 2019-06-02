import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Route } from 'react-router-dom';
import { testState, deepCopy } from '../testUtils';
import { App } from './App';
import Stats from './pages/Stats/Stats';
import Inventory from './pages/Inventory/Inventory';
import Weapons from './pages/Weapons/Weapons';
import ConnectedKi from './pages/Ki/Ki';
import Features from './pages/Features/Features';
import Lore from './pages/Lore/Lore';
import Map from './pages/Map/Map';
import NotFound from './pages/NotFound/NotFound';

Enzyme.configure({ adapter: new Adapter() });
let wrapper;

const state = deepCopy(testState);

jest.mock('./components/Error/Error');
const mockLoadStats = jest.fn();

function setUp(stats, errors) {
  wrapper = shallow(
    <App
      loadOnStart={mockLoadStats}
      pages={state.app.pages}
      stats={stats}
      errors={errors}
    />,
  );
}

describe('App', () => {
  describe('On loading the home page', () => {
    describe('if stats have not been loaded', () => {
      beforeAll(() => {
        wrapper = mount(
          <App
            loadOnStart={mockLoadStats}
            pages={state.app.pages}
            stats={{}}
            errors={state.app.errorQueue}
          />,
        );
      });

      it('should load stats', () => {
        expect(mockLoadStats.mock.calls.length).toBe(1);
      });

      it('should display a loading message', () => {
        expect(wrapper.find('Loading').length).toBe(1);
      });
    });

    describe('if there are errors', () => {
      it('should display the error component', () => {
        wrapper = mount(
          <App
            loadOnStart={mockLoadStats}
            pages={state.app.pages}
            stats={{}}
            errors={['testError']}
          />,
        );
        expect(wrapper.find('Error').length).toBe(1);
      });
    });

    beforeAll(() => {
      setUp(state.app.stats, state.app.errorQueue);
    });

    it('renders the nav bar', () => {
      expect(wrapper.find('nav').length).toBe(1);
    });

    it('generates nav bar items from passed in pages prop', () => {
      expect(wrapper.find('NavLink').length).toBe(state.app.pages.length);

      for (let i = 0; i < state.app.pages.length; i += 1) {
        expect(wrapper.find('NavLink').at(i).key()).toBe(state.app.pages[i]);
      }
    });

    describe('when using the nav bar', () => {
      const pathMap = {};

      beforeAll(() => {
        setUp(state.app.stats, state.app.errorQueue);
        wrapper.find(Route).forEach((route) => {
          const routeProps = route.props();
          pathMap[routeProps.path] = routeProps.component;
        });
      });

      it('should show Stats page for /Stats route', () => {
        expect(pathMap['/Stats']).toBe(Stats);
      });

      it('shoud show Inventory page for /Inventory route', () => {
        expect(pathMap['/Inventory']).toBe(Inventory);
      });

      it('should show Weapons page for /Weapons route', () => {
        expect(pathMap['/Weapons']).toBe(Weapons);
      });

      it('should show Ki page for /Ki route', () => {
        expect(pathMap['/Ki']).toBe(ConnectedKi);
      });

      it('should show Features page for /Features route', () => {
        expect(pathMap['/Features']).toBe(Features);
      });

      it('should show Map page for /Map route', () => {
        expect(pathMap['/Map']).toBe(Map);
      });

      it('should show Lore page for /Lore route', () => {
        expect(pathMap['/Lore']).toBe(Lore);
      });

      it('should show Page not found for undefined route', () => {
        expect(pathMap.undefined).toBe(NotFound);
      });
    });
  });
});
