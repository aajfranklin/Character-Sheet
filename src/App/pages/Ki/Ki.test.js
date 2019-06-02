import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { testState, deepCopy } from '../../../testUtils';
import { Ki } from './Ki';

Enzyme.configure({ adapter: new Adapter() });
let wrapper;

const state = deepCopy(testState);

jest.mock('./components/Ability');
jest.mock('../../components/Stat/Stat');
const mockLoadAbilities = jest.fn();
const mockToggleAbilityForm = jest.fn();
const mockUpdateStat = jest.fn();

function setUp(abilities, showAbilityForm) {
  wrapper = shallow(<Ki
    load={mockLoadAbilities}
    update={mockUpdateStat}
    toggleForm={mockToggleAbilityForm}
    showAbilityForm={showAbilityForm}
    abilities={abilities}
    total={state.app.stats.kiTotal}
    available={state.app.stats.kiAvailable}
  />);
}

describe('Ki', () => {
  describe('On rendering the Ki page with no abilities in state', () => {
    beforeAll(() => {
      wrapper = mount(<Ki
        load={mockLoadAbilities}
        update={mockUpdateStat}
        toggleForm={mockToggleAbilityForm}
        showAbilityForm={false}
        abilities={null}
        total={state.app.stats.kiTotal}
        available={state.app.stats.kiAvailable}
      />);
    });

    it('should call loadAbilities', () => {
      expect(mockLoadAbilities.mock.calls.length).toBe(1);
    });

    it('should display a loading message', () => {
      expect(wrapper.find('Loading').length).toBe(1);
    });
  });

  describe('On rendering the Ki page with any abilities in state and showAbilityForm false', () => {
    beforeAll(() => {
      setUp(state.ki.abilities, false);
    });

    it('displays the Ki heading', () => {
      expect(wrapper.find('h1').length).toBe(1);
      expect(wrapper.find('h1').text()).toBe('Ki');
    });

    it('displays ability table labels once', () => {
      expect(wrapper.find('.labels').length).toBe(1);
    });

    it('displays one row per ability in the test state', () => {
      expect(wrapper.find('Ability').length).toBe(state.ki.abilities.length);
    });

    it('contains 2 header action buttons', () => {
      expect(wrapper.find('Button').length).toBe(2);
      expect(wrapper.find('Button').at(0).dive().text()).toBe(' MEDITATE');
      expect(wrapper.find('Button').at(1).dive().text()).toBe(' ADD ABILITY');
    });

    it('should not render add ability form', () => {
      expect(wrapper.find('CSSTransition').at(0).prop('mountOnEnter')).toBe(true);
      expect(wrapper.find('CSSTransition').at(0).prop('unmountOnExit')).toBe(true);
      expect(wrapper.find('CSSTransition').at(0).prop('in')).toBe(false);
    });

    describe('when add ability button is clicked', () => {
      it('should call toggle ability', () => {
        wrapper.find('Button').at(1).dive().simulate('click');
        expect(mockToggleAbilityForm.mock.calls.length).toBe(1);
      });
    });

    describe('when meditate is clicked', () => {
      beforeAll(() => {
        setUp(state.ki.abilities, false);
      });

      it('should call action creator to update ki available', () => {
        wrapper.find('Button').at(0).dive().simulate('click');
        expect(mockUpdateStat.mock.calls.length).toBe(1);
      });
    });
  });

  describe('On rendering the Ki page with any abilities in state and showAbilityForm true', () => {
    beforeAll(() => {
      setUp(state.ki.abilities, true);
    });

    it('should render ability form', () => {
      expect(wrapper.find('CSSTransition').at(0).prop('mountOnEnter')).toBe(true);
      expect(wrapper.find('CSSTransition').at(0).prop('unmountOnExit')).toBe(true);
      expect(wrapper.find('CSSTransition').at(0).prop('in')).toBe(true);
    });

    it('should disable the add ability button', () => {
      expect(wrapper.find('Button').at(1).dive().prop('disabled')).toBe(true);
    });
  });
});
