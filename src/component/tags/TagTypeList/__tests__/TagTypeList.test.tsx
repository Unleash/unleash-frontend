import React from 'react';
import { TagTypeList } from 'component/tags/TagTypeList/TagTypeList';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import AccessProvider from 'component/providers/AccessProvider/AccessProvider';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import UIProvider from 'component/providers/UIProvider/UIProvider';
import { ThemeProvider } from 'themes/ThemeProvider';

test('renders an empty list correctly', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <ThemeProvider>
                <UIProvider>
                    <AccessProvider permissions={[{ permission: ADMIN }]}>
                        <TagTypeList />
                    </AccessProvider>
                </UIProvider>
            </ThemeProvider>
        </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
});
