import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { AnnouncerProvider } from 'component/common/Announcer/AnnouncerProvider/AnnouncerProvider';
import { ThemeProvider } from 'themes/ThemeProvider';
import { IPermission } from 'interfaces/user';
import AccessProvider from 'component/providers/AccessProvider/AccessProvider';

export const render = (
    ui: JSX.Element,
    {
        route = '/',
        permissions = [],
        ...renderOptions
    }: { route?: string; permissions?: IPermission[] } & Omit<
        RenderOptions,
        'queries'
    > = {}
) => {
    window.history.pushState({}, 'Test page', route);

    const Wrapper: FC = ({ children }) => (
        <SWRConfig value={{ provider: () => new Map() }}>
            <AccessProvider permissions={permissions}>
                <ThemeProvider>
                    <AnnouncerProvider>
                        <Router>{children}</Router>
                    </AnnouncerProvider>
                </ThemeProvider>
            </AccessProvider>
        </SWRConfig>
    );

    return rtlRender(ui, {
        wrapper: Wrapper,
        ...renderOptions,
    });
};
