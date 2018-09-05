import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import AddBook from './AddBook';

describe('<AddBook />', () => {
    beforeEach(() => {
        // Executed before each test
        moxios.install();
    });

    afterEach(() => {
        // Executed after each test
        moxios.uninstall();
    });
    // Mock prevent default function
    const e = { preventDefault: jest.fn() };
    // Setup Props for component
    const props = {
        match: { params: { page: 1 } },
        onChange: jest.fn(),
        handleChange: jest.fn(),
        history: { push: jest.fn() }
    };
    it('renders without crashing', () => {
        const component = mount(<AddBook {...props}/>);
        expect(component.find('div').length).toEqual(11);
    });
    it('check field changes according to state', () => {
        const component = mount(<AddBook {...props}/>);
        component.setState({ author: 'Example' });
        expect(component.find('#author').instance().value).toEqual('Example');
    });
    it('handles Component Methods', () => {
        const component = mount(<AddBook {...props} />);
        component.instance().submitForm({ ...e });
    });
});
