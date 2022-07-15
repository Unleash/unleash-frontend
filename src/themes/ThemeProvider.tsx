import React, { FC, useContext } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import mainTheme from 'themes/theme';
import darkTheme from 'themes/dark-theme';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import UIContext from 'contexts/UIContext';

export const muiCache = createCache({
    key: 'mui',
    prepend: true,
});

export const ThemeProvider: FC = ({ children }) => {
    const { mode } = useContext(UIContext);

    const resolveTheme = () => {
        if (mode === 'light') {
            return mainTheme;
        }

        return darkTheme;
    };

    return (
        <CacheProvider value={muiCache}>
            <MuiThemeProvider theme={resolveTheme()}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </CacheProvider>
    );
};
