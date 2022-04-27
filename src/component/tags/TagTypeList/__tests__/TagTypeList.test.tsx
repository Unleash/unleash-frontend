import React from 'react';
import { TagTypeList } from 'component/tags/TagTypeList/TagTypeList';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/styles';
import theme from 'themes/mainTheme';
import AccessProvider from 'component/providers/AccessProvider/AccessProvider';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import UIProvider from 'component/providers/UIProvider/UIProvider';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


test('renders an empty list correctly', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <UIProvider>
                        <AccessProvider permissions={[{ permission: ADMIN }]}>
                            <TagTypeList />
                        </AccessProvider>
                    </UIProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
});
