import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { deepCopy } from '../../../testUtils/testHelpers';
import testState from '../../../testUtils/testState';
import { Stat } from './Stat';

Enzyme.configure({adapter: new Adapter()});
let wrapper;

const state = deepCopy(testState);
const mockCacheStat = jest.fn();
const mockRevertWithError = jest.fn();
const mockRevertWithoutError = jest.fn();
const mockUpdateStat = jest.fn();
const mockUpdateStatLocally = jest.fn();

function setUp(beingEdited, cachedValue) {
    wrapper = shallow(<Stat
        beingEdited={beingEdited}
        cacheStat={mockCacheStat}
        cachedValue={cachedValue}
        revertWithError={mockRevertWithError}
        revertWithoutError={mockRevertWithoutError}
        stat='kiTotal'
        stats={state.app.stats}
        updateStat={mockUpdateStat}
        updateStatLocally={mockUpdateStatLocally}
    />)
}

describe('Stat', () => {

    describe('on rendering the Stat component', () => {

        describe('when the current stat is not being edited', () => {

            beforeAll(() => {
                setUp();
            });

            it('should contain a span', () => {
                expect(wrapper.find('span').length).toBe(1);
            });

            it('should display the current stat value', () => {
                expect(wrapper.find('span').text()).toBe('3');
            });

            describe('when it is clicked', () => {

                it('should call cache stat', () => {
                    wrapper.find('span').at(0).simulate('click');
                    expect(mockCacheStat.mock.calls.length).toBe(1);
                });

            });

        });

        describe('when the current stat is being edited', () => {

            beforeAll(() => {
                setUp('kiTotal');
            });

            it('should contain a text area', () => {
                expect(wrapper.find('textarea').length).toBe(1);
            });

            it('should display the current stat value', () => {
                expect(wrapper.find('textarea').prop('value')).toBe(3);
            });

            describe('when it changes', () => {

                it('should call update stat locally', () => {
                    wrapper.find('textarea').at(0).simulate('change');
                    expect(mockUpdateStatLocally.mock.calls.length).toBe(1);
                });

            });

            describe('when it loses focus', () => {

                describe('if the value is not numeric', () => {

                    beforeAll(() => {
                        setUp('kiTotal');
                    });

                    it('it should call revert with error', () => {
                        wrapper.find('textarea').at(0).simulate('blur', {target: {value: 'test'}});
                        expect(mockRevertWithError.mock.calls.length).toBe(1);
                    });

                });

                describe('if the value has not changed', () => {

                    beforeAll(() => {
                        setUp('kiTotal', 3);
                    });

                    it('it should call revert without error', () => {
                        wrapper.find('textarea').at(0).simulate('blur', {target: {value: 3}});
                        expect(mockRevertWithoutError.mock.calls.length).toBe(1);
                    });

                });

                describe('if the value is numeric and has changed', () => {

                    beforeAll(() => {
                        setUp('kiTotal', 3);
                    });

                    it('it should call update stat', () => {
                        wrapper.find('textarea').at(0).simulate('blur', {target: {value: 4}});
                        expect(mockUpdateStat.mock.calls.length).toBe(1);
                    });

                });

            });

        });

    });

});
