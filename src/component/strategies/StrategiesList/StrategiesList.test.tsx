import { MemoryRouter } from 'react-router-dom';
import { StrategiesList } from './StrategiesList';
import renderer from 'react-test-renderer';
import AccessProvider from 'component/providers/AccessProvider/AccessProvider';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import UIProvider from 'component/providers/UIProvider/UIProvider';
import { AnnouncerProvider } from 'component/common/Announcer/AnnouncerProvider/AnnouncerProvider';
import { ThemeProvider } from 'themes/ThemeProvider';

test('renders correctly', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <ThemeProvider>
                <AnnouncerProvider>
                    <UIProvider>
                        <AccessProvider permissions={[{ permission: ADMIN }]}>
                            <StrategiesList />
                        </AccessProvider>
                    </UIProvider>
                </AnnouncerProvider>
            </ThemeProvider>
        </MemoryRouter>
    );

    expect(tree).toMatchSnapshot();
});
