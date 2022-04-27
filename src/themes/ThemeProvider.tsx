import React, { FC } from 'react';
import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
} from '@mui/material';
import StylesProvider from '@mui/styles/StylesProvider';
import mainTheme from 'themes/theme';

export const ThemeProvider: FC = ({ children }) => (
    <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={mainTheme}>
            <StylesProvider injectFirst>
                <CssBaseline />
                {children}
            </StylesProvider>
        </MuiThemeProvider>
    </StyledEngineProvider>
);
