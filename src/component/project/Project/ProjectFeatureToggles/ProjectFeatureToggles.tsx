import { useContext, useMemo, useState } from 'react';
import { Add } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import AccessContext from 'contexts/AccessContext';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { PageContent } from 'component/common/PageContent/PageContent';
import ResponsiveButton from 'component/common/ResponsiveButton/ResponsiveButton';
import { IFeatureToggleListItem } from 'interfaces/featureToggle';
import { getCreateTogglePath } from 'utils/routePathHelpers';
import {
    CREATE_FEATURE,
    UPDATE_FEATURE_ENVIRONMENT,
} from 'component/providers/AccessProvider/permissions';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import { DateCell } from 'component/common/Table/cells/DateCell/DateCell';
import { FeatureLinkCell } from 'component/common/Table/cells/FeatureLinkCell/FeatureLinkCell';
import { FeatureSeenCell } from 'component/common/Table/cells/FeatureSeenCell/FeatureSeenCell';
import { FeatureTypeCell } from 'component/common/Table/cells/FeatureTypeCell/FeatureTypeCell';
import { sortTypes } from 'utils/sortTypes';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
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
import { useStyles } from './ProjectFeatureToggles.styles';
import { Tooltip } from '@mui/material';
import PermissionSwitch from 'component/common/PermissionSwitch/PermissionSwitch';
import useToggleFeatureByEnv from 'hooks/api/actions/useToggleFeatureByEnv/useToggleFeatureByEnv';
import { createToggle } from './createToggle';

interface IProjectFeatureTogglesProps {
    features: IFeatureToggleListItem[];
    loading: boolean;
}

export const ProjectFeatureToggles = ({
    features,
    loading,
}: IProjectFeatureTogglesProps) => {
    const { classes: styles } = useStyles();
    const projectId = useRequiredPathParam('projectId');
    const navigate = useNavigate();
    const { hasAccess } = useContext(AccessContext);
    const { uiConfig } = useUiConfig();
    const [data, environments] = useMemo(() => {
        if (loading) {
            return [
                Array(12).fill({
                    type: '-',
                    name: 'Feature name',
                    createdAt: new Date(),
                }),
                [{ name: 'production', enabled: false }],
            ];
        }

        const environments =
            features?.[0]?.environments?.length > 0
                ? features[0].environments.sort(
                      ({ sortOrder: a }, { sortOrder: b }) => a || 0 - b || 0
                  )
                : [];

        return [features as any[], environments];
    }, [features, loading]);

    const columns = useMemo(
        () => [
            {
                Header: 'Seen',
                accessor: 'lastSeenAt',
                Cell: FeatureSeenCell,
                sortType: 'date',
                totalWidth: 120,
            },
            {
                Header: 'Type',
                accessor: 'type',
                Cell: FeatureTypeCell,
                totalWidth: 120,
            },
            {
                Header: 'Feature toggle name',
                accessor: 'name',
                Cell: ({ value }: { value: string }) => (
                    <FeatureLinkCell
                        title={value}
                        to={`/projects/${projectId}/features/${value}`}
                    />
                ),
                sortType: 'alphanumeric',
            },
            {
                Header: 'Created on',
                accessor: 'createdAt',
                Cell: DateCell,
                sortType: 'date',
            },
            ...environments.map(({ name }) => ({
                Header: name,
                id: `env_${name}`,
                Cell: createToggle(projectId, name),
            })),
            {
                Header: (
                    <Tooltip title="Select columns" arrow describeChild>
                        <ViewColumnIcon />
                    </Tooltip>
                ),
                id: 'actions',
                Cell: ({
                    row: { original: feature },
                }: {
                    row: { original: IFeatureToggleListItem };
                }) => {
                    return '...';
                    // return <>{feature.name}</>;
                },
                disableSortBy: true,
            },
        ],
        [projectId, environments]
    );

    // console.log('environments', environments);

    const initialState = useMemo(
        () => ({
            sortBy: [{ id: 'createdAt', desc: false }],
            hiddenColumns: ['description'],
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
        // setGlobalFilter,
        setHiddenColumns,
    } = useTable(
        {
            columns,
            data,
            initialState,
            sortTypes,
            autoResetGlobalFilter: false,
            disableSortRemove: true,
        },
        useGlobalFilter,
        useSortBy
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
                        <div className={styles.actionsContainer}>
                            {/* <SearchField
                                initialValue={filter}
                                updateValue={setFilter}
                                className={classnames(styles.search, {
                                    skeleton: loading,
                                })}
                            /> */}

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
                        </div>
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
        </PageContent>
    );
};
