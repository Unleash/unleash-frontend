import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import FeatureToggleList from '../FeatureToggleList';
import renderer from 'react-test-renderer';
import { CREATE_FEATURE } from '../../../Access/permissions';
import theme from '../../../../themes/main-theme';

jest.mock('../FeatureToggleListItem', () => ({
    __esModule: true,
    default: 'ListItem',
}));

jest.mock('../../../common/ProjectSelect');

test('renders correctly with one feature', () => {
    const features = [
        {
            name: 'Another',
        },
    ];
    const featureMetrics = { lastHour: {}, lastMinute: {}, seenApps: {} };
    const settings = { sort: 'name' };
    const tree = renderer.create(
        <MemoryRouter>
            <ThemeProvider theme={theme}>
                <FeatureToggleList
                    updateSetting={jest.fn()}
                    settings={settings}
                    history={{}}
                    featureMetrics={featureMetrics}
                    features={features}
                    toggleFeature={jest.fn()}
                    fetcher={jest.fn()}
                />
            </ThemeProvider>
        </MemoryRouter>
    );

    expect(tree).toMatchSnapshot();
});

test('renders correctly with one feature without permissions', () => {
    const features = [
        {
            name: 'Another',
        },
    ];
    const featureMetrics = { lastHour: {}, lastMinute: {}, seenApps: {} };
    const settings = { sort: 'name' };
    const tree = renderer.create(
        <MemoryRouter>
            <ThemeProvider theme={theme}>
                <FeatureToggleList
                    updateSetting={jest.fn()}
                    settings={settings}
                    history={{}}
                    featureMetrics={featureMetrics}
                    features={features}
                    toggleFeature={jest.fn()}
                    fetcher={jest.fn()}
                />
            </ThemeProvider>
        </MemoryRouter>
    );

    expect(tree).toMatchSnapshot();
});
