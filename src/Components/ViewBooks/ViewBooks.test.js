import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import ViewBooks from './ViewBooks';

describe('<ViewBooks />', () => {
    beforeEach(() => {
        // Executed before each test
        moxios.install();
    });

    afterEach(() => {
        // Executed after each test
        moxios.uninstall();
    });
    // Setup Props for component
    const props = {
        match: { params: { page: 1 } },
        onChange: jest.fn(),
        handleChange: jest.fn(),
        preventDefault: jest.fn(),
        history: { push: jest.fn() }
    };
    it('renders without crashing', () => {
        const component = mount(<ViewBooks {...props}/>);
        expect(component.find('div').length).toEqual(2);
    });
    it('simulate next page click', () => {
        const component = mount(<ViewBooks {...props}/>);
        expect(component.state().page).toEqual(1);
        // Change page
        component.find('#next').simulate('click');
        expect(component.state().page).toEqual(2);
    });
    it('handles Component Methods', () => {
        const component = mount(<ViewBooks {...props}/>);
        component.instance().requestBooks();
        component.instance().mapBooks();
    });
});
