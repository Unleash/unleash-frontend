import React, { FC } from 'react';
import {
    CssBaseline,
    ThemeProvider as MuiThemeProvider,
    StyledEngineProvider,
} from '@mui/material';
import mainTheme from 'themes/theme';

export const ThemeProvider: FC = ({ children }) => (
    <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={mainTheme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    </StyledEngineProvider>
);
