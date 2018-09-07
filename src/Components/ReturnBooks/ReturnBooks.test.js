import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import ReturnBooks from './ReturnBooks';

describe('<Register />', () => {
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
        history: { push: jest.fn() }
    };
    it('renders without crashing', () => {
        const component = mount(<ReturnBooks {...props}/>);
        expect(component.find('div').length).toEqual(1);
    });
    it('runs map books function', () => {
        const component = mount(<ReturnBooks {...props}/>);
        // Map books and check for <h3> for no available books
        component.instance().mapBooks();
        expect(component.find('h3').length).toEqual(1);
    });
});
