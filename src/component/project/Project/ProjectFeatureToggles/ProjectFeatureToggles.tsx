import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from '@mui/system';
import { Add } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGlobalFilter, useFlexLayout, useSortBy, useTable } from 'react-table';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { PageContent } from 'component/common/PageContent/PageContent';
import ResponsiveButton from 'component/common/ResponsiveButton/ResponsiveButton';
import { getCreateTogglePath } from 'utils/routePathHelpers';
import { CREATE_FEATURE } from 'component/providers/AccessProvider/permissions';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import { LinkCell } from 'component/common/Table/cells/LinkCell/LinkCell';
import { FeatureSeenCell } from 'component/common/Table/cells/FeatureSeenCell/FeatureSeenCell';
import { FeatureTypeCell } from 'component/common/Table/cells/FeatureTypeCell/FeatureTypeCell';
import { sortTypes } from 'utils/sortTypes';
import { formatUnknownError } from 'utils/formatUnknownError';
import { IProject } from 'interfaces/project';
import {
    Table,
    SortableTableHeader,
    TableBody,
    TableCell,
    TableRow,
    TablePlaceholder,
    TableSearch,
} from 'component/common/Table';
import { SearchHighlightProvider } from 'component/common/Table/SearchHighlightContext/SearchHighlightContext';
import useProject from 'hooks/api/getters/useProject/useProject';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useVirtualizedRange } from 'hooks/useVirtualizedRange';
import useToast from 'hooks/useToast';
import { ENVIRONMENT_STRATEGY_ERROR } from 'constants/apiErrors';
import EnvironmentStrategyDialog from 'component/common/EnvironmentStrategiesDialog/EnvironmentStrategyDialog';
import { useEnvironmentsRef } from './hooks/useEnvironmentsRef';
import useFeatureApi from 'hooks/api/actions/useFeatureApi/useFeatureApi';
import { FeatureToggleSwitch } from './FeatureToggleSwitch/FeatureToggleSwitch';
import { ActionsCell } from './ActionsCell/ActionsCell';
import { ColumnsMenu } from './ColumnsMenu/ColumnsMenu';
import { useStyles } from './ProjectFeatureToggles.styles';
import { FeatureStaleDialog } from 'component/common/FeatureStaleDialog/FeatureStaleDialog';
import { FeatureArchiveDialog } from 'component/common/FeatureArchiveDialog/FeatureArchiveDialog';

interface IProjectFeatureTogglesProps {
    features: IProject['features'];
    environments: IProject['environments'];
    loading: boolean;
}

type ListItemType = Pick<
    IProject['features'][number],
    'name' | 'lastSeenAt' | 'createdAt' | 'type' | 'stale'
> & {
    environments: {
        [key in string]: {
            name: string;
            enabled: boolean;
        };
    };
};

const staticColumns = ['Actions', 'name'];

export const ProjectFeatureToggles = ({
    features,
    loading,
    environments: newEnvironments = [],
}: IProjectFeatureTogglesProps) => {
    const { classes: styles } = useStyles();
    const [strategiesDialogState, setStrategiesDialogState] = useState({
        open: false,
        featureId: '',
        environmentName: '',
    });
    const [featureStaleDialogState, setFeatureStaleDialogState] = useState<{
        featureId?: string;
        stale?: boolean;
    }>({});
    const [featureArchiveState, setFeatureArchiveState] = useState<
        string | undefined
    >();
    const projectId = useRequiredPathParam('projectId');
    const navigate = useNavigate();
    const { uiConfig } = useUiConfig();
    const environments = useEnvironmentsRef(
        loading ? ['a', 'b', 'c'] : newEnvironments
    );
    const { refetch } = useProject(projectId);
    const { setToastData, setToastApiError } = useToast();
    const theme = useTheme();
    const rowHeight = theme.shape.tableRowHeight;

    const data = useMemo<ListItemType[]>(() => {
        if (loading) {
            return Array(6).fill({
                type: '-',
                name: 'Feature name',
                createdAt: new Date(),
                environments: {
                    production: { name: 'production', enabled: false },
                },
            }) as ListItemType[];
        }

        return features.map(
            ({
                name,
                lastSeenAt,
                createdAt,
                type,
                stale,
                environments: featureEnvironments,
            }) => ({
                name,
                lastSeenAt,
                createdAt,
                type,
                stale,
                environments: Object.fromEntries(
                    environments.map(env => [
                        env,
                        {
                            name: env,
                            enabled:
                                featureEnvironments?.find(
                                    feature => feature?.name === env
                                )?.enabled || false,
                        },
                    ])
                ),
            })
        );
    }, [features, loading]); // eslint-disable-line react-hooks/exhaustive-deps

    const { toggleFeatureEnvironmentOn, toggleFeatureEnvironmentOff } =
        useFeatureApi();
    const onToggle = useCallback(
        async (
            projectId: string,
            featureName: string,
            environment: string,
            enabled: boolean
        ) => {
            try {
                if (enabled) {
                    await toggleFeatureEnvironmentOn(
                        projectId,
                        featureName,
                        environment
                    );
                } else {
                    await toggleFeatureEnvironmentOff(
                        projectId,
                        featureName,
                        environment
                    );
                }
                refetch();
            } catch (error) {
                const message = formatUnknownError(error);
                if (message === ENVIRONMENT_STRATEGY_ERROR) {
                    setStrategiesDialogState({
                        open: true,
                        featureId: featureName,
                        environmentName: environment,
                    });
                } else {
                    setToastApiError(message);
                }
                throw error; // caught when reverting optimistic update
            }

            setToastData({
                type: 'success',
                title: 'Updated toggle status',
                text: 'Successfully updated toggle status.',
            });
            refetch();
        },
        [toggleFeatureEnvironmentOff, toggleFeatureEnvironmentOn] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Seen',
                accessor: 'lastSeenAt',
                Cell: FeatureSeenCell,
                sortType: 'date',
                align: 'center',
                maxWidth: 80,
            },
            {
                Header: 'Type',
                accessor: 'type',
                Cell: FeatureTypeCell,
                align: 'center',
                maxWidth: 80,
            },
            {
                Header: 'Feature toggle name',
                accessor: 'name',
                Cell: ({ value }: { value: string }) => (
                    <LinkCell
                        title={value}
                        to={`/projects/${projectId}/features/${value}`}
                    />
                ),
                minWidth: 100,
                sortType: 'alphanumeric',
                disableGlobalFilter: false,
            },
            {
                Header: 'Created',
                accessor: 'createdAt',
                Cell: DateCell,
                sortType: 'date',
                minWidth: 120,
            },
            ...environments.map(name => ({
                Header: loading ? () => '' : name,
                maxWidth: 90,
                accessor: `environments.${name}`,
                align: 'center',
                Cell: ({
                    value,
                    row: { original: feature },
                }: {
                    value: { name: string; enabled: boolean };
                    row: { original: ListItemType };
                }) => (
                    <FeatureToggleSwitch
                        value={value?.enabled || false}
                        projectId={projectId}
                        featureName={feature?.name}
                        environmentName={value?.name}
                        onToggle={onToggle}
                    />
                ),
                sortType: (v1: any, v2: any, id: string) => {
                    const a = v1?.values?.[id]?.enabled;
                    const b = v2?.values?.[id]?.enabled;
                    return a === b ? 0 : a ? -1 : 1;
                },
            })),
            {
                id: 'Actions',
                maxWidth: 56,
                width: 56,
                Cell: (props: { row: { original: ListItemType } }) => (
                    <ActionsCell
                        projectId={projectId}
                        onOpenArchiveDialog={setFeatureArchiveState}
                        onOpenStaleDialog={setFeatureStaleDialogState}
                        {...props}
                    />
                ),
                disableSortBy: true,
            },
        ],
        [projectId, environments, onToggle, loading]
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const [storedParams, setStoredParams] = useLocalStorage<{
        columns?: string[];
    }>(`${projectId}:ProjectFeatureToggles`, {});

    const initialState = useMemo(
        () => {
            const allColumnIds = columns.map(
                (column: any) => column?.accessor || column?.id
            );
            let hiddenColumns = environments
                .filter((_, index) => index >= 3)
                .map(environment => `environments.${environment}`);

            if (searchParams.has('columns')) {
                const columnsInParams =
                    searchParams.get('columns')?.split(',') || [];
                const visibleColumns = [...staticColumns, ...columnsInParams];
                hiddenColumns = allColumnIds.filter(
                    columnId => !visibleColumns.includes(columnId)
                );
            } else if (storedParams.columns) {
                const visibleColumns = [
                    ...staticColumns,
                    ...storedParams.columns,
                ];
                hiddenColumns = allColumnIds.filter(
                    columnId => !visibleColumns.includes(columnId)
                );
            }

            return {
                sortBy: [
                    {
                        id: searchParams.get('sort') || 'createdAt',
                        desc: searchParams.has('order')
                            ? searchParams.get('order') === 'desc'
                            : false,
                    },
                ],
                hiddenColumns,
                globalFilter: searchParams.get('search') || '',
            };
        },
        [environments] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const {
        allColumns,
        headerGroups,
        rows,
        state: { globalFilter, sortBy, hiddenColumns },
        getTableBodyProps,
        getTableProps,
        prepareRow,
        setGlobalFilter,
        setHiddenColumns,
    } = useTable(
        {
            columns: columns as any[], // TODO: fix after `react-table` v8 update
            data,
            initialState,
            sortTypes,
            autoResetGlobalFilter: false,
            disableSortRemove: true,
            autoResetSortBy: false,
            defaultColumn: {
                disableGlobalFilter: true,
            },
        },
        useFlexLayout,
        useGlobalFilter,
        useSortBy
    );

    useEffect(() => {
        if (loading) {
            return;
        }
        const tableState: Record<string, string> = {};
        tableState.sort = sortBy[0].id;
        if (sortBy[0].desc) {
            tableState.order = 'desc';
        }
        if (globalFilter) {
            tableState.search = globalFilter;
        }
        tableState.columns = allColumns
            .map(({ id }) => id)
            .filter(
                id =>
                    !staticColumns.includes(id) && !hiddenColumns?.includes(id)
            )
            .join(',');

        setSearchParams(tableState, {
            replace: true,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, sortBy, hiddenColumns, globalFilter, setSearchParams]);

    const onCustomizeColumns = useCallback(
        visibleColumns => {
            setStoredParams({
                columns: visibleColumns,
            });
        },
        [setStoredParams]
    );
    const [firstRenderedIndex, lastRenderedIndex] = useVirtualizedRange(
        rowHeight,
        20
    );

    return (
        <PageContent
            isLoading={loading}
            className={styles.container}
            bodyClass={styles.bodyClass}
            header={
                <PageHeader
                    className={styles.title}
                    title={`Project feature toggles (${rows.length})`}
                    actions={
                        <>
                            <TableSearch
                                initialValue={globalFilter}
                                onChange={value => setGlobalFilter(value)}
                            />
                            <ColumnsMenu
                                allColumns={allColumns}
                                staticColumns={staticColumns}
                                dividerAfter={['createdAt']}
                                dividerBefore={['Actions']}
                                isCustomized={Boolean(storedParams.columns)}
                                onCustomize={onCustomizeColumns}
                                setHiddenColumns={setHiddenColumns}
                            />
                            <PageHeader.Divider />
                            <ResponsiveButton
                                onClick={() =>
                                    navigate(
                                        getCreateTogglePath(
                                            projectId,
                                            uiConfig.flags.E
                                        )
                                    )
                                }
                                maxWidth="700px"
                                Icon={Add}
                                projectId={projectId}
                                permission={CREATE_FEATURE}
                                className={styles.button}
                            >
                                New feature toggle
                            </ResponsiveButton>
                        </>
                    }
                />
            }
        >
            <SearchHighlightProvider value={globalFilter}>
                <Table {...getTableProps()} rowHeight={rowHeight}>
                    <SortableTableHeader
                        // @ts-expect-error -- verify after `react-table` v8
                        headerGroups={headerGroups}
                        className={styles.headerClass}
                        flex
                    />
                    <TableBody
                        {...getTableBodyProps()}
                        style={{
                            height: `${rowHeight * rows.length}px`,
                            position: 'relative',
                        }}
                    >
                        {rows.map((row, index) => {
                            const isVirtual =
                                index < firstRenderedIndex ||
                                index > lastRenderedIndex;

                            if (isVirtual) {
                                return null;
                            }

                            prepareRow(row);
                            return (
                                <TableRow
                                    hover
                                    {...row.getRowProps()}
                                    className={styles.row}
                                    style={{
                                        top: `${index * rowHeight}px`,
                                        display: 'flex',
                                    }}
                                >
                                    {row.cells.map(cell => (
                                        <TableCell
                                            {...cell.getCellProps({
                                                style: {
                                                    flex: cell.column.minWidth
                                                        ? '1 0 auto'
                                                        : undefined,
                                                },
                                            })}
                                            className={styles.cell}
                                        >
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
                                No features found matching &ldquo;
                                {globalFilter}
                                &rdquo;
                            </TablePlaceholder>
                        }
                        elseShow={
                            <TablePlaceholder>
                                No features available. Get started by adding a
                                new feature toggle.
                            </TablePlaceholder>
                        }
                    />
                }
            />
            <EnvironmentStrategyDialog
                onClose={() =>
                    setStrategiesDialogState(prev => ({ ...prev, open: false }))
                }
                projectId={projectId}
                {...strategiesDialogState}
            />
            <FeatureStaleDialog
                isStale={featureStaleDialogState.stale === true}
                isOpen={Boolean(featureStaleDialogState.featureId)}
                onClose={() => {
                    setFeatureStaleDialogState({});
                    refetch();
                }}
                featureId={featureStaleDialogState.featureId || ''}
                projectId={projectId}
            />
            <FeatureArchiveDialog
                isOpen={Boolean(featureArchiveState)}
                onConfirm={() => {
                    refetch();
                }}
                onClose={() => {
                    setFeatureArchiveState(undefined);
                }}
                featureId={featureArchiveState || ''}
                projectId={projectId}
            />
        </PageContent>
    );
};
