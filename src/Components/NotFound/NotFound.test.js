import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe('<NotFound />', () => {
    it('renders without crashing', () => {
        const component = shallow(<NotFound />);
        expect(component.find('div').length).toEqual(1);
    });
});
