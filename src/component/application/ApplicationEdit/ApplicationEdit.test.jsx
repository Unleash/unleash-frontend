import { vi } from 'vitest';
import { ApplicationEdit } from './ApplicationEdit';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import UIProvider from 'component/providers/UIProvider/UIProvider';
import { ThemeProvider } from 'themes/ThemeProvider';
import { AccessProviderMock } from 'component/providers/AccessProvider/AccessProviderMock';
import { AnnouncerProvider } from 'component/common/Announcer/AnnouncerProvider/AnnouncerProvider';

test('renders correctly if no application', () => {
    const tree = renderer
        .create(
            <AccessProviderMock permissions={[{ permission: ADMIN }]}>
                <ThemeProvider>
                    <AnnouncerProvider>
                        <UIProvider>
                            <MemoryRouter initialEntries={['/test']}>
                                <ApplicationEdit
                                    fetchApplication={() => Promise.resolve({})}
                                    storeApplicationMetaData={vi.fn()}
                                    deleteApplication={vi.fn()}
                                    locationSettings={{ locale: 'en-GB' }}
                                />
                            </MemoryRouter>
                        </UIProvider>
                    </AnnouncerProvider>
                </ThemeProvider>
            </AccessProviderMock>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test('renders correctly without permission', () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <ThemeProvider>
                    <AnnouncerProvider>
                        <UIProvider>
                            <AccessProviderMock
                                permissions={[{ permission: ADMIN }]}
                            >
                                <ApplicationEdit
                                    fetchApplication={() => Promise.resolve({})}
                                    storeApplicationMetaData={vi.fn()}
                                    deleteApplication={vi.fn()}
                                    application={{
                                        appName: 'test-app',
                                        instances: [
                                            {
                                                instanceId: 'instance-1',
                                                clientIp: '123.123.123.123',
                                                lastSeen: '2017-02-23T15:56:49',
                                                sdkVersion: '4.0',
                                            },
                                        ],
                                        strategies: [
                                            {
                                                name: 'StrategyA',
                                                description: 'A description',
                                            },
                                            {
                                                name: 'StrategyB',
                                                description: 'B description',
                                                notFound: true,
                                            },
                                        ],
                                        seenToggles: [
                                            {
                                                name: 'ToggleA',
                                                description: 'this is A toggle',
                                                enabled: true,
                                                project: 'default',
                                            },
                                            {
                                                name: 'ToggleB',
                                                description: 'this is B toggle',
                                                enabled: false,
                                                notFound: true,
                                                project: 'default',
                                            },
                                        ],
                                        url: 'http://example.org',
                                        description: 'app description',
                                    }}
                                    locationSettings={{ locale: 'en-GB' }}
                                />
                            </AccessProviderMock>
                        </UIProvider>
                    </AnnouncerProvider>
                </ThemeProvider>
            </MemoryRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});

test('renders correctly with permissions', () => {
    const tree = renderer
        .create(
            <MemoryRouter>
                <ThemeProvider>
                    <AnnouncerProvider>
                        <UIProvider>
                            <AccessProviderMock
                                permissions={[{ permission: ADMIN }]}
                            >
                                <ApplicationEdit
                                    fetchApplication={() => Promise.resolve({})}
                                    storeApplicationMetaData={vi.fn()}
                                    deleteApplication={vi.fn()}
                                    application={{
                                        appName: 'test-app',
                                        instances: [
                                            {
                                                instanceId: 'instance-1',
                                                clientIp: '123.123.123.123',
                                                lastSeen: '2017-02-23T15:56:49',
                                                sdkVersion: '4.0',
                                            },
                                        ],
                                        strategies: [
                                            {
                                                name: 'StrategyA',
                                                description: 'A description',
                                            },
                                            {
                                                name: 'StrategyB',
                                                description: 'B description',
                                                notFound: true,
                                            },
                                        ],
                                        seenToggles: [
                                            {
                                                name: 'ToggleA',
                                                description: 'this is A toggle',
                                                enabled: true,
                                                project: 'default',
                                            },
                                            {
                                                name: 'ToggleB',
                                                description: 'this is B toggle',
                                                enabled: false,
                                                notFound: true,
                                                project: 'default',
                                            },
                                        ],
                                        url: 'http://example.org',
                                        description: 'app description',
                                    }}
                                    locationSettings={{ locale: 'en-GB' }}
                                />
                            </AccessProviderMock>
                        </UIProvider>
                    </AnnouncerProvider>
                </ThemeProvider>
            </MemoryRouter>
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
