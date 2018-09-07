import React from 'react';
import moxios from 'moxios';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ResetPassword from './ResetPassword';

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
    const e = { preventDefault: jest.fn() };
    const props = {
        history: { push: jest.fn() }
    };
    it('renders without crashing', () => {
        // Render component in route to allow for link to appear
        const component = mount(
            <Router>
                <ResetPassword {...props}/>
            </Router>
        );
        expect(component.find('div').length).toEqual(6);
    });
    it('runs the submit form function', () => {
        const component = shallow(<ResetPassword {...props}/>);
        component.setState({ email: 'test@mail.com' });
        // Submit form and check if state is cleared
        component.instance().submitForm({ ...e });
        expect(component.state().email).toEqual('');
    });
});
