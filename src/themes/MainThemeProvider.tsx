import React, { FC } from 'react';
import {
    CssBaseline,
    ThemeProvider,
    Theme,
    StyledEngineProvider,
} from '@mui/material';
import StylesProvider from '@mui/styles/StylesProvider';
import mainTheme from './mainTheme';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

export const MainThemeProvider: FC = ({ children }) => (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={mainTheme}>
            <StylesProvider injectFirst>
                <CssBaseline />
                {children}
            </StylesProvider>
        </ThemeProvider>
    </StyledEngineProvider>
);
