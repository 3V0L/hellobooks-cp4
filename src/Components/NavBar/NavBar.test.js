import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';

describe('<NavBar />', () => {
    it('renders without crashing', () => {
        const component = shallow(<NavBar />);
        expect(component.find('div').length).toEqual(1);
    });
});
