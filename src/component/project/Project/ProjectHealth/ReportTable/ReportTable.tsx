import { useMemo, useEffect } from 'react';
import { IFeatureToggleListItem } from 'interfaces/featureToggle';
import {
    SortableTableHeader,
    Table,
    TableBody,
    TableCell,
    TablePlaceholder,
    TableRow,
} from 'component/common/Table';
import { PageContent } from 'component/common/PageContent/PageContent';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { sortTypes } from 'utils/sortTypes';
import { useSortBy, useGlobalFilter, useTable } from 'react-table';
import { useMediaQuery, useTheme } from '@mui/material';
import { FeatureSeenCell } from 'component/common/Table/cells/FeatureSeenCell/FeatureSeenCell';
import { FeatureTypeCell } from 'component/common/Table/cells/FeatureTypeCell/FeatureTypeCell';
import { FeatureNameCell } from 'component/common/Table/cells/FeatureNameCell/FeatureNameCell';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import { FeatureStaleCell } from 'component/feature/FeatureToggleList/FeatureStaleCell/FeatureStaleCell';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { Search } from 'component/common/Search/Search';
import { ReportExpiredCell } from './ReportExpiredCell/ReportExpiredCell';
import { ReportStatusCell } from './ReportStatusCell/ReportStatusCell';
import { formatStatus, ReportingStatus } from './ReportStatusCell/formatStatus';
import { formatExpiredAt } from './ReportExpiredCell/formatExpiredAt';

interface IReportTableProps {
    projectId: string;
    features: IFeatureToggleListItem[];
}

export interface IReportTableRow {
    project: string;
    name: string;
    type: string;
    stale?: boolean;
    status: ReportingStatus;
    lastSeenAt?: string;
    createdAt: string;
    expiredAt?: string;
}

export const ReportTable = ({ projectId, features }: IReportTableProps) => {
    const theme = useTheme();
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const data: IReportTableRow[] = useMemo<IReportTableRow[]>(
        () =>
            features.map(report => ({
                project: projectId,
                name: report.name,
                type: report.type,
                stale: report.stale,
                status: formatStatus(report),
                lastSeenAt: report.lastSeenAt,
                createdAt: report.createdAt,
                expiredAt: formatExpiredAt(report),
            })),
        [projectId, features]
    );

    const initialState = useMemo(
        () => ({
            hiddenColumns: [],
            sortBy: [{ id: 'createdAt' }],
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { globalFilter },
        setGlobalFilter,
        setHiddenColumns,
    } = useTable(
        {
            columns: COLUMNS as any,
            data: data as any,
            initialState,
            sortTypes,
            autoResetGlobalFilter: false,
            autoResetSortBy: false,
            disableSortRemove: true,
        },
        useGlobalFilter,
        useSortBy
    );

    useEffect(() => {
        const hiddenColumns = [];
        if (isMediumScreen) {
            hiddenColumns.push('createdAt');
        }
        if (isSmallScreen) {
            hiddenColumns.push('expiredAt', 'lastSeenAt');
        }
        if (isExtraSmallScreen) {
            hiddenColumns.push('stale');
        }
        setHiddenColumns(hiddenColumns);
    }, [setHiddenColumns, isSmallScreen, isMediumScreen, isExtraSmallScreen]);

    return (
        <PageContent
            header={
                <PageHeader
                    titleElement="Overview"
                    actions={
                        <Search
                            initialValue={globalFilter}
                            onChange={setGlobalFilter}
                        />
                    }
                />
            }
        >
            <SearchHighlightProvider value={globalFilter}>
                <Table {...getTableProps()}>
                    <SortableTableHeader headerGroups={headerGroups} />
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow hover {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </SearchHighlightProvider>
            <ConditionallyRender
                condition={rows.length === 0}
                show={
                    <ConditionallyRender
                        condition={globalFilter?.length > 0}
                        show={
                            <TablePlaceholder>
                                No feature toggles found matching &ldquo;
                                {globalFilter}
                                &rdquo;
                            </TablePlaceholder>
                        }
                        elseShow={
                            <TablePlaceholder>
                                No feature toggles available. Get started by
                                adding a new feature toggle.
                            </TablePlaceholder>
                        }
                    />
                }
            />
        </PageContent>
    );
};

const COLUMNS = [
    {
        Header: 'Seen',
        accessor: 'lastSeenAt',
        sortType: 'date',
        align: 'center',
        Cell: FeatureSeenCell,
        disableGlobalFilter: true,
        minWidth: 85,
    },
    {
        Header: 'Type',
        accessor: 'type',
        align: 'center',
        Cell: FeatureTypeCell,
        disableGlobalFilter: true,
        minWidth: 85,
    },
    {
        Header: 'Name',
        accessor: 'name',
        width: '60%',
        sortType: 'alphanumeric',
        Cell: FeatureNameCell,
    },
    {
        Header: 'Created',
        accessor: 'createdAt',
        sortType: 'date',
        Cell: DateCell,
        disableGlobalFilter: true,
        minWidth: 150,
    },
    {
        Header: 'Expired',
        accessor: 'expiredAt',
        Cell: ReportExpiredCell,
        disableGlobalFilter: true,
        minWidth: 150,
    },
    {
        Header: 'Status',
        id: 'status',
        Cell: ReportStatusCell,
        disableGlobalFilter: true,
        minWidth: 200,
    },
    {
        Header: 'State',
        accessor: 'stale',
        sortType: 'boolean',
        Cell: FeatureStaleCell,
        disableGlobalFilter: true,
        minWidth: 120,
    },
];
