import React from 'react';

import TagTypesList from '../list-component';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

test('renders an empty list correctly', () => {
    const tree = renderer.create(
        <ThemeProvider>
            <TagTypesList
                tagTypes={[]}
                fetchTagTypes={jest.fn()}
                removeTagType={jest.fn()}
                history={{}}
                hasPermission={() => true}
            />
        </ThemeProvider>
    );
    expect(tree).toMatchSnapshot();
});

test('renders a list with elements correctly', () => {
    const tree = renderer.create(
        <ThemeProvider>
            <MemoryRouter>
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
                    hasPermission={() => true}
                />
            </MemoryRouter>
        </ThemeProvider>
    );
    expect(tree).toMatchSnapshot();
});
