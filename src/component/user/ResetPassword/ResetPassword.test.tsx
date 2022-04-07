import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { INVALID_TOKEN_BUTTON } from 'utils/testIds';
import React from 'react';
import { TestContext, mswPathResponse } from 'utils/testUtils';
import ResetPassword from 'component/user/ResetPassword/ResetPassword';
import { MemoryRouter } from 'react-router-dom';
import { INVALID_TOKEN_ERROR } from 'hooks/api/getters/useResetPassword/useResetPassword';

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
    mswPathResponse(server, '/auth/reset/validate', {
        name: INVALID_TOKEN_ERROR,
    });

    render(
        <TestContext>
            <MemoryRouter initialEntries={['/new-user?token=invalid']}>
                <ResetPassword />
            </MemoryRouter>
        </TestContext>
    );

    await screen.findByTestId(INVALID_TOKEN_BUTTON);
    expect(document.body).toMatchSnapshot();
});
