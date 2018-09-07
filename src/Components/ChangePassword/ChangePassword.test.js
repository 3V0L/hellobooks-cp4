import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import ChangePassword from './ChangePassword';

describe('<ChangePassword />', () => {
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
        onChange: jest.fn(),
        handleChange: jest.fn(),
        history: { push: jest.fn() }
    };
    it('renders without crashing', () => {
        const component = mount(<ChangePassword {...props}/>);
        expect(component.find('div').length).toEqual(9);
    });
    it('changes textbox values to state', () => {
        const component = mount(<ChangePassword {...props}/>);
        component.setState({
            oldPassword: 'Pass1234',
            newPassword: 'NewPass00',
        });
        // Submit form and check if state is cleared
        component.instance().submitForm({ ...e });
        expect(component.state().oldPassword).toEqual('');
    });
});
