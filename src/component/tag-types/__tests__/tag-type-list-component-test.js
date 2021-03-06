import React from 'react';

import TagTypesList from '../TagTypeList';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../../themes/main-theme';
import { createFakeStore } from '../../../accessStoreFake';
import AccessProvider from '../../AccessProvider/AccessProvider';

import {
    ADMIN,
    CREATE_TAG_TYPE,
    UPDATE_TAG_TYPE,
    DELETE_TAG_TYPE,
} from '../../AccessProvider/permissions';

test('renders an empty list correctly', () => {
    const tree = renderer.create(
        <MemoryRouter>
            <ThemeProvider theme={theme}>
                <AccessProvider
                    store={createFakeStore([{ permission: ADMIN }])}
                >
                    <TagTypesList
                        tagTypes={[]}
                        fetchTagTypes={jest.fn()}
                        removeTagType={jest.fn()}
                        history={{}}
                    />
                </AccessProvider>
            </ThemeProvider>
        </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
});

test('renders a list with elements correctly', () => {
    const tree = renderer.create(
        <ThemeProvider theme={theme}>
            <MemoryRouter>
                <AccessProvider
                    store={createFakeStore([
                        { permission: CREATE_TAG_TYPE },
                        { permission: UPDATE_TAG_TYPE },
                        { permission: DELETE_TAG_TYPE },
                    ])}
                >
                    <TagTypesList
                        tagTypes={[
                            {
                                name: 'simple',
                                description: 'Some simple description',
                                icon: '#',
                            },
                        ]}
                        fetchTagTypes={jest.fn()}
                        removeTagType={jest.fn()}
                        history={{}}
                    />
                </AccessProvider>
            </MemoryRouter>
        </ThemeProvider>
    );
    expect(tree).toMatchSnapshot();
});
