import React from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-enzyme';
import Dashboard from './index';

Enzyme.configure({ adapter: new Adapter() });

const mockGet = jest.fn().mockImplementation(() => Promise.resolve({}));
jest.mock('../../../services/Api/Lottoland', () => {
    class MockLottoland {
        // eslint-disable-next-line class-methods-use-this
        public get(value: string) {
            return mockGet();
        }
    }
    return MockLottoland;
});

describe('Dashboard Component', () => {
    let component: ReactWrapper;

    const renderComponent = () => {
        component = mount(<Dashboard />);
    };

    describe('Rendering', () => {
        it('WHEN component is rendering THEN componet is defined', () => {
            renderComponent();

            expect(component).toBeDefined();
        });

        it('WHEN Dropdown > onchange is called THEN mockGet should be called', () => {
            renderComponent();

            const event = {
                currentTarget: {
                    value: 'foo-bar',
                },
            } as React.ChangeEvent<HTMLInputElement>;

            const dropdownComponentProps = component.find('Dropdown').at(0).props();
            const { onChange = jest.fn() } = dropdownComponentProps;
            onChange(event);
            expect(mockGet).toHaveBeenCalled();
        });
    });
});
