import { EnhancedTable } from './EnhancedTable';
import { screen, within } from '@testing-library/react';
import { render } from 'utils/testRenderer';

describe('EnhancedTable', () => {
    /**
     * This test demonstrates how to query table content in tests
     */
    it('should show a table', async () => {
        render(
            <EnhancedTable
                title="Table"
                data={[
                    { name: 'feature-1', project: 'project-1' },
                    { name: 'feature-2', project: 'project-2' },
                ]}
                dataKey="name"
                columns={[
                    { field: 'name', label: 'Feature toggle name' },
                    { field: 'project', label: 'Project ID' },
                ]}
            />
        );
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        const [thead, tbody] = within(table).getAllByRole('rowgroup');

        const headCells = within(thead).getAllByRole('columnheader');
        expect(headCells).toHaveLength(2);
        expect(headCells[0]).toHaveTextContent('Feature toggle name');
        expect(headCells[1]).toHaveTextContent('Project ID');

        const dataRows = within(tbody).getAllByRole('row');
        expect(dataRows).toHaveLength(2);

        const row1cells = within(dataRows[0]).getAllByRole('cell');
        expect(row1cells).toHaveLength(2);
        expect(row1cells[0]).toHaveTextContent('feature-1');
        expect(row1cells[1]).toHaveTextContent('project-1');

        const row2cells = within(dataRows[1]).getAllByRole('cell');
        expect(row2cells).toHaveLength(2);
        expect(row2cells[0]).toHaveTextContent('feature-2');
        expect(row2cells[1]).toHaveTextContent('project-2');
    });
});
