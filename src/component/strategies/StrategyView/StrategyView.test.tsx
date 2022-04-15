import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { StrategyView } from './StrategyView';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import theme from 'themes/mainTheme';
import AccessProvider from 'component/providers/AccessProvider/AccessProvider';

test('renders correctly with one strategy', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <AccessProvider>
                <ThemeProvider theme={theme}>
                    <StrategyView />
                </ThemeProvider>
            </AccessProvider>
        </MemoryRouter>
    );

    expect(tree).toMatchSnapshot();
});
