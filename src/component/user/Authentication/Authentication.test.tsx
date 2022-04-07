import Authentication from 'component/user/Authentication/Authentication';
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import {
    LOGIN_PASSWORD_ID,
    LOGIN_EMAIL_ID,
    LOGIN_BUTTON,
    AUTH_PAGE_ID,
    SSO_LOGIN_BUTTON,
} from 'utils/testIds';
import React from 'react';
import { TestContext, mswPathResponse } from 'utils/testUtils';

const server = setupServer();

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close();
});

afterEach(() => {
    server.resetHandlers();
});

test('should render password auth', async () => {
    mswPathResponse(server, '*', {
        defaultHidden: false,
        message: 'You must sign in in order to use Unleash',
        path: '/auth/simple/login',
        type: 'password',
        options: [],
    });

    render(
        <TestContext>
            <Authentication redirect="/" />
        </TestContext>
    );

    await screen.findByTestId(AUTH_PAGE_ID);
    await screen.findByTestId(LOGIN_PASSWORD_ID);
    await screen.findByTestId(LOGIN_EMAIL_ID);
    await screen.findByTestId(LOGIN_BUTTON);
    expect(document.body).toMatchSnapshot();
});

test('should not render password auth if defaultHidden is true', async () => {
    mswPathResponse(server, '*', {
        defaultHidden: true,
        message: 'You must sign in in order to use Unleash',
        path: '/auth/simple/login',
        type: 'password',
        options: [],
    });

    render(
        <TestContext>
            <Authentication redirect="/" />
        </TestContext>
    );

    await screen.findByTestId(AUTH_PAGE_ID);
    expect(screen.queryByTestId(LOGIN_EMAIL_ID)).toBeNull();
    expect(screen.queryByTestId(LOGIN_PASSWORD_ID)).toBeNull();
    expect(screen.queryByTestId(LOGIN_BUTTON)).toBeNull();
    expect(document.body).toMatchSnapshot();
});

test('should render demo auth', async () => {
    mswPathResponse(server, '*', {
        defaultHidden: false,
        message: 'You must sign in in order to use Unleash',
        path: '/auth/demo/login',
        type: 'demo',
        options: [],
    });

    render(
        <TestContext>
            <Authentication redirect="/" />
        </TestContext>
    );

    await screen.findByTestId(AUTH_PAGE_ID);
    expect(screen.getByTestId(LOGIN_EMAIL_ID)).not.toBeNull();
    expect(screen.queryByTestId(LOGIN_PASSWORD_ID)).toBeNull();
    expect(screen.getByTestId(LOGIN_BUTTON)).not.toBeNull();
    expect(document.body).toMatchSnapshot();
});

test('should render email auth', async () => {
    mswPathResponse(server, '*', {
        defaultHidden: false,
        message: 'You must sign in in order to use Unleash',
        path: '/auth/unsecure/login',
        type: 'unsecure',
        options: [],
    });

    render(
        <TestContext>
            <Authentication redirect="/" />
        </TestContext>
    );

    await screen.findByTestId(AUTH_PAGE_ID);
    expect(screen.getByTestId(LOGIN_EMAIL_ID)).not.toBeNull();
    expect(screen.queryByTestId(LOGIN_PASSWORD_ID)).toBeNull();
    expect(screen.getByTestId(LOGIN_BUTTON)).not.toBeNull();
    expect(document.body).toMatchSnapshot();
});

test('should render Google auth', async () => {
    await testSSOAuthOption('google');
});

test('should render OIDC auth', async () => {
    await testSSOAuthOption('oidc');
});

test('should render SAML auth', async () => {
    await testSSOAuthOption('saml');
});

const testSSOAuthOption = async (authOption: string) => {
    const path = `/auth/${authOption}/login`;
    const testId = `${SSO_LOGIN_BUTTON}-${authOption}`;

    mswPathResponse(server, '*', {
        defaultHidden: true,
        message: 'You must sign in in order to use Unleash',
        options: [{ type: authOption, message: '...', path: path }],
        path: '/auth/simple/login',
        type: 'password',
    });

    render(
        <TestContext>
            <Authentication redirect="/" />
        </TestContext>
    );

    const ssoLink = await screen.findByTestId(testId);
    expect(ssoLink.getAttribute('href')).toEqual(path);
    expect(screen.queryByTestId(LOGIN_EMAIL_ID)).toBeNull();
    expect(screen.queryByTestId(LOGIN_PASSWORD_ID)).toBeNull();
    expect(screen.queryByTestId(LOGIN_BUTTON)).toBeNull();
    expect(document.body).toMatchSnapshot();
};
