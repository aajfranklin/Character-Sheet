import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as chai from "chai";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const expect = chai.expect;

describe('On loading the home page', () => {

    const testState = {
        navBarItems: ["item1"]
    };

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App {...testState}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the nav bar', () => {
        Enzyme.configure({ adapter: new Adapter() });
        const wrapper = shallow(<App {...testState}/>);

        expect(wrapper.find('NavBar').length).equals(1);
    })
});
