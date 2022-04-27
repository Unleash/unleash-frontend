import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { StrategiesList } from './StrategiesList';
import renderer from 'react-test-renderer';
import theme from 'themes/mainTheme';
import AccessProvider from 'component/providers/AccessProvider/AccessProvider';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import UIProvider from 'component/providers/UIProvider/UIProvider';
import { AnnouncerProvider } from 'component/common/Announcer/AnnouncerProvider/AnnouncerProvider';

test('renders correctly', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <AnnouncerProvider>
                        <UIProvider>
                            <AccessProvider
                                permissions={[{ permission: ADMIN }]}
                            >
                                <StrategiesList />
                            </AccessProvider>
                        </UIProvider>
                    </AnnouncerProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </MemoryRouter>
    );

    expect(tree).toMatchSnapshot();
});
