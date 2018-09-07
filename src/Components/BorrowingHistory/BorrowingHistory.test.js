import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import BorrowingHistory from './BorrowingHistory';

describe('<BorrowingHistory />', () => {
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
        history: { push: jest.fn() }
    };
    it('renders without crashing', () => {
        const component = mount(<BorrowingHistory {...props}/>);
        expect(component.find('div').length).toEqual(2);
    });
    it('simulate next page click', () => {
        const component = mount(<BorrowingHistory {...props}/>);
        expect(component.state().page).toEqual(1);
        // Change page and check page number state
        component.find('#next').simulate('click');
        expect(component.state().page).toEqual(2);
    });
});
