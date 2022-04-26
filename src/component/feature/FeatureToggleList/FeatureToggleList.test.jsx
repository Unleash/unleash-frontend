import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import FeatureToggleList from './FeatureToggleList';
import renderer from 'react-test-renderer';
import theme from 'themes/mainTheme';
import { CREATE_FEATURE } from 'component/providers/AccessProvider/permissions';
import AccessProvider from 'component/providers/AccessProvider/AccessProvider';
import { AnnouncerProvider } from 'component/common/Announcer/AnnouncerProvider/AnnouncerProvider';

jest.mock('./FeatureToggleListItem/FeatureToggleListItem', () => ({
    __esModule: true,
    default: 'ListItem',
}));

jest.mock('component/common/ProjectSelect/ProjectSelect');

test('renders correctly with one feature', () => {
    const features = [
        {
            name: 'Another',
        },
    ];

    const tree = renderer.create(
        <MemoryRouter>
            <ThemeProvider theme={theme}>
                <AnnouncerProvider>
                    <AccessProvider
                        permissions={[{ permission: CREATE_FEATURE }]}
                    >
                        <FeatureToggleList
                            updateSetting={jest.fn()}
                            filter={{}}
                            setFilter={jest.fn()}
                            sort={{}}
                            setSort={jest.fn()}
                            features={features}
                            fetcher={jest.fn()}
                            flags={{}}
                        />
                    </AccessProvider>
                </AnnouncerProvider>
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
    const tree = renderer.create(
        <MemoryRouter>
            <ThemeProvider theme={theme}>
                <AnnouncerProvider>
                    <AccessProvider
                        permissions={[{ permission: CREATE_FEATURE }]}
                    >
                        <FeatureToggleList
                            filter={{}}
                            setFilter={jest.fn()}
                            sort={{}}
                            setSort={jest.fn()}
                            features={features}
                            fetcher={jest.fn()}
                            flags={{}}
                        />
                    </AccessProvider>
                </AnnouncerProvider>
            </ThemeProvider>
        </MemoryRouter>
    );

    expect(tree).toMatchSnapshot();
});
