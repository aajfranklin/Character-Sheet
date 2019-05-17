import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('App', () => {

    describe('On loading the home page', () => {

        const testState = {
            pages: ['page1', 'page2', 'page3']
        };

        let wrapper;

        beforeAll(() => {
            Enzyme.configure({adapter: new Adapter()});
            wrapper = shallow(<App {...testState}/>);
        });

        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<App {...testState}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });

        it('renders the nav bar', () => {
            expect(wrapper.find('nav').length).toBe(1);
        });

        it('generates nav bar items from passed in pages prop', () => {

            expect(wrapper.find('Link').length).toBe(testState.pages.length);

            for (let i = 0; i < testState.pages.length; i++) {
                expect(wrapper.find('Link').at(i).key()).toBe(testState.pages[i]);
            }
        });

    });

});
