import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import EditBook from './EditBook';

describe('<EditBook />', () => {
    beforeEach(() => {
        // Executed before each test
        moxios.install();
    });

    afterEach(() => {
        // Executed after each test
        moxios.uninstall();
    });
    // Setup Props for component
    const e = { preventDefault: jest.fn() };
    const props = {
        match: { params: { id: 1 } },
        preventDefault: jest.fn(),
        history: { push: jest.fn() }
    };
    it('renders without crashing', () => {
        const component = mount(<EditBook {...props}/>);
        expect(component.find('div').length).toEqual(11);
    });
    it('runs submit form function', () => {
        const component = mount(<EditBook {...props}/>);
        component.setState({
            date_published: '2018-09-07'
        });
        // Submit form and check if date format is changed
        component.instance().submitForm({ ...e });
        expect(component.state().date_published).toEqual('07/09/2018');
    });
});
