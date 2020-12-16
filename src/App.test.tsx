import React from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-enzyme';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('Search Component', () => {
    let component: ReactWrapper;

    const renderComponent = () => {
        component = mount(<App />);
    };

    describe('Rendering', () => {
        it('WHEN component is rendering THEN componet is defined', () => {
            renderComponent();

            expect(component).toBeDefined();
        });
    });
});
