import { Box, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useDataFilter } from 'hooks/useDataFilter';
import {
    useSortableTablesData,
    SortableHeader,
} from 'hooks/useSortableTablesData';
import { objectId } from 'utils/objectId';
import { TableCellSortable } from './TableCellSortable/TableCellSortable';
import { TableHeader } from './TableHeader';

const dummyData = [
    { type: 'chocolate', cost: 15, merchant: 'Bobs icecream' },
    { type: 'vanilla', cost: 15, merchant: 'Bobs icecream' },
    { type: 'strawberry', cost: 15, merchant: 'Bobs icecream' },
    { type: 'nutella', cost: 15, merchant: 'Bobs icecream' },
];

const getSortableData = (data: any, headers: SortableHeader[]) => {
    let tableData: any = [];

    tableData = data.map((dataItem: any) => {
        let filtered: { [index: string]: string } = {};

        headers.forEach(header => {
            filtered[header.name] = dataItem[header.name];
        });

        return filtered;
    });

    return { headers, data: tableData };
};

export const ExampleTable = () => {
    const { headers, data } = getSortableData(dummyData, [
        { name: 'type', onClick: 'text' },
        { name: 'merchant', onClick: 'text' },
    ]);

    const { headerData, tableData, setData, sortMetaData } =
        useSortableTablesData(headers, data);

    // TODO: Use filters in filter UI
    const { filteredData, filters } = useDataFilter(
        tableData,
        ['type', 'merchant'],
        setData
    );

    const renderHeaders = () => {
        return headerData.map((header: any) => {
            return (
                <TableCellSortable
                    key={header.name}
                    name={header.name}
                    sort={sortMetaData.type}
                    setSort={header.onClick}
                >
                    {header.name}
                </TableCellSortable>
            );
        });
    };

    const renderBody = () => {
        return filteredData.map((data: any) => {
            return (
                <TableRow key={objectId(data)}>
                    <TableCell>{data.type}</TableCell>
                    <TableCell>{data.merchant}</TableCell>
                </TableRow>
            );
        });
    };

    return (
        <Box
            style={{ background: '#fff', borderRadius: '5px', padding: '1rem' }}
        >
            <Table>
                <TableHeader>{renderHeaders()}</TableHeader>
                <TableBody>{renderBody()}</TableBody>
            </Table>
        </Box>
    );
};
