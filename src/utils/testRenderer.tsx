import { BrowserRouter as Router } from 'react-router-dom';
import { render as rtlRender, RenderOptions } from '@testing-library/react';

export const render = async (
    ui: JSX.Element,
    {
        route = '/list',
        ...renderOptions
    }: { route?: string } & Omit<RenderOptions, 'queries'> = {}
) => {
    window.history.pushState({}, 'Test page', route);

    return rtlRender(ui, {
        wrapper: Router,
        ...renderOptions,
    });
};
