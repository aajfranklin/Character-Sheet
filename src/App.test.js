import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import App from './App';

const testPages = ['page1', 'page2', 'page3'];

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function reducer(state = { pages: testPages }) {
    return state;
}

describe('App', () => {

    describe('On loading the home page', () => {

        describe('when testing ReactDom directly', () => {

            it('renders without crashing', () => {
                const div = document.createElement('div');
                ReactDOM.render(
                    <ReactRedux.Provider store={store}>
                        <App/>
                    </ReactRedux.Provider>,
                    div
                );
                ReactDOM.unmountComponentAtNode(div);
            });

        });

        describe('when testing with Enzyme', () => {

            let wrapper;

            beforeAll(() => {
                Enzyme.configure({adapter: new Adapter()});
                wrapper = mount(
                    <ReactRedux.Provider store={store}>
                        <App/>
                    </ReactRedux.Provider>);
            });

            it('renders the nav bar', () => {
                expect(wrapper.find('nav').length).toBe(1);
            });

            it('generates nav bar items from passed in pages prop', () => {

                expect(wrapper.find('Link').length).toBe(testPages.length);

                for (let i = 0; i < testPages.length; i++) {
                    expect(wrapper.find('Link').at(i).key()).toBe(testPages[i]);
                }
            });

        });

    });

});
