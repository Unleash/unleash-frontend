import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import { FeatureToggleListItem } from './FeatureToggleListItem';
import renderer from 'react-test-renderer';

import theme from 'themes/mainTheme';

test('renders correctly with one feature', () => {
    const feature = {
        name: 'Another',
        description: "another's description",
        enabled: false,
        stale: false,
        project: 'default',
        strategies: [
            {
                id: '0',
                name: 'gradualRolloutRandom',
                constraints: [],
                parameters: {
                    percentage: 50,
                },
            },
        ],
        createdAt: '2018-02-04T20:27:52.127Z',
        archived: false,
        environments: [],
        type: '',
        variants: [],
        impressionData: false,
    };
    const tree = renderer.create(
        <MemoryRouter>
            <ThemeProvider theme={theme}>
                <FeatureToggleListItem
                    key={0}
                    feature={feature}
                    hasAccess={() => true}
                />
            </ThemeProvider>
        </MemoryRouter>
    );

    expect(tree).toMatchSnapshot();
});

test('renders correctly with one feature without permission', () => {
    const feature = {
        name: 'Another',
        description: "another's description",
        enabled: false,
        stale: false,
        project: 'default',
        strategies: [
            {
                id: '0',
                name: 'gradualRolloutRandom',
                constraints: [],
                parameters: {
                    percentage: 50,
                },
            },
        ],
        createdAt: '2018-02-04T20:27:52.127Z',
        archived: false,
        environments: [],
        type: '',
        variants: [],
        impressionData: false,
    };
    const tree = renderer.create(
        <MemoryRouter>
            <ThemeProvider theme={theme}>
                <FeatureToggleListItem
                    key={0}
                    feature={feature}
                    hasAccess={() => true}
                />
            </ThemeProvider>
        </MemoryRouter>
    );

    expect(tree).toMatchSnapshot();
});
