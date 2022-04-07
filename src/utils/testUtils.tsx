import { SWRConfig } from 'swr';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'themes/mainTheme';
import React from 'react';
import { SetupServerApi } from 'msw/node';
import { rest } from 'msw';

export const TestContext: React.FC = ({ children }) => {
    return (
        <SWRConfig value={{ provider: () => new Map() }}>
            <MemoryRouter>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </MemoryRouter>
        </SWRConfig>
    );
};

export const mswPathResponse = (
    server: SetupServerApi,
    path: string,
    json: object
) => {
    server.use(
        rest.get(path, (req, res, ctx) => {
            return res(ctx.json(json));
        })
    );
};
