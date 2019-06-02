import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Error } from './Error';

Enzyme.configure({ adapter: new Adapter() });
let wrapper;

const mockRemoveError = jest.fn();

describe('Error', () => {
  describe('on rendering the error', () => {
    beforeAll(() => {
      wrapper = shallow(<Error removeError={mockRemoveError} errors={['testError']} />);
    });

    it('contains the error message', () => {
      expect(wrapper.find('p').text()).toBe('testError');
    });

    it('contains a button', () => {
      expect(wrapper.find('Button').length).toBe(1);
      expect(wrapper.find('Button').dive().text()).toBe(' OK');
    });

    describe('when the button is clicked', () => {
      it('calls remove error', () => {
        wrapper.find('Button').dive().simulate('click');
        expect(mockRemoveError.mock.calls.length).toBe(1);
      });
    });
  });
});
