import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { StrategiesList } from './StrategiesList';
import renderer from 'react-test-renderer';
import theme from 'themes/mainTheme';
import AccessProvider from 'component/providers/AccessProvider/AccessProvider';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import UIProvider from 'component/providers/UIProvider/UIProvider';

test('renders correctly', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <ThemeProvider theme={theme}>
                <UIProvider>
                    <AccessProvider permissions={[{ permission: ADMIN }]}>
                        <StrategiesList />
                    </AccessProvider>
                </UIProvider>
            </ThemeProvider>
        </MemoryRouter>
    );

    expect(tree).toMatchSnapshot();
});
