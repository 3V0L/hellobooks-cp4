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
    const props = {
        onChange: jest.fn(),
        handleChange: jest.fn(),
        preventDefault: jest.fn(),
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
        expect(component.find('#oldPassword').instance().value).toEqual('Pass1234');
        expect(component.find('#newPassword').instance().value).toEqual('NewPass00');
    });
});
