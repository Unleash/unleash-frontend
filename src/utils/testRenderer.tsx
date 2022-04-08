
import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { MainThemeProvider } from 'themes/MainThemeProvider';

const Providers: FC = ({ children }) => (
    <MainThemeProvider>
        <Router>{children}</Router>
    </MainThemeProvider>
);

export const render = (
    ui: JSX.Element,
    {
        route = '/',
        ...renderOptions
    }: { route?: string } & Omit<RenderOptions, 'queries'> = {}
) => {
    window.history.pushState({}, 'Test page', route);

    return rtlRender(ui, {
        wrapper: Providers,
        ...renderOptions,
    });
};
