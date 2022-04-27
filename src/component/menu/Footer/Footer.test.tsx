import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import Footer from './Footer';
import theme from 'themes/mainTheme';

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
