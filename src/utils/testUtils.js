import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as ReactRedux from 'react-redux';

export const mountInProvider = (component, store) => {
    Enzyme.configure({adapter: new Adapter()});

    return(
        mount(
            <ReactRedux.Provider store={store}>
                {component}
            </ReactRedux.Provider>
        )
    )
};
