import React from 'react';
import moxios from 'moxios';
import { shallow } from 'enzyme';
import Home from './Home';

describe('<Home />', () => {
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
        history: { push: jest.fn() }
    };
    it('renders without crashing', () => {
        const component = shallow(<Home {...props}/>);
        expect(component.find('div').length).toEqual(7);
    });
    it('runs the submit form function', () => {
        const component = shallow(<Home {...props}/>);
        component.setState({ password: 'Pass1234' });
        // Submit form and check if state is cleared
        component.instance().submitForm({ ...e });
        expect(component.state().password).toEqual('');
    });
});
