import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';

import Footer from './Footer';
import theme from 'themes/mainTheme';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


test('should render DrawerMenu', () => {
    const tree = renderer.create(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <MemoryRouter>
                    <Footer />
                </MemoryRouter>
            </ThemeProvider>
        </StyledEngineProvider>
    );

    expect(tree).toMatchSnapshot();
});

test('should render DrawerMenu with "features" selected', () => {
    const tree = renderer.create(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <MemoryRouter initialEntries={['/features']}>
                    <Footer />
                </MemoryRouter>
            </ThemeProvider>
        </StyledEngineProvider>
    );

    expect(tree).toMatchSnapshot();
});
