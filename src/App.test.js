import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('App', () => {

    describe('On loading the home page', () => {

        const testState = {
            pages: ['page1']
        };

        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<App {...testState}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        });

        it('renders the nav bar', () => {
            Enzyme.configure({adapter: new Adapter()});
            const wrapper = shallow(<App {...testState}/>);

            expect(wrapper.find('NavBar').length).toBe(1);
        })

    });

});
