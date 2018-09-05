import React from 'react';
import moxios from 'moxios';
import { shallow } from 'enzyme';
import NavBar from './NavBar';

describe('<NavBar />', () => {
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
        const component = shallow(<NavBar {...props}/>);
        expect(component.find('div').length).toEqual(1);
    });
});
