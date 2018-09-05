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
    it('runs the submit form function', () => {
        const component = mount(<ReturnBooks {...props}/>);
        // Submit form and check if state is cleared
        component.instance().mapBooks();
        expect(component.find('h3').length).toEqual(1);
    });
});
