import { useMemo } from 'react';
import { Box, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Delete, Edit, Visibility, VisibilityOff } from '@mui/icons-material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import {
    DELETE_ADDON,
    UPDATE_ADDON,
} from 'component/providers/AccessProvider/permissions';
import { useNavigate } from 'react-router-dom';
import { PageContent } from 'component/common/PageContent/PageContent';
import useAddons from 'hooks/api/getters/useAddons/useAddons';
import useToast from 'hooks/useToast';
import useAddonsApi from 'hooks/api/actions/useAddonsApi/useAddonsApi';
import { useState, useCallback } from 'react';
import { IAddon } from 'interfaces/addons';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import { formatUnknownError } from 'utils/formatUnknownError';
import { LinkCell } from 'component/common/Table/cells/LinkCell/LinkCell';
import { sortTypes } from 'utils/sortTypes';
import { useTable, useSortBy } from 'react-table';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { SortableTableHeader, TablePlaceholder } from 'component/common/Table';
import { getAddonIcon } from '../AddonList';

export const ConfiguredAddons = () => {
    const { refetchAddons, addons, loading } = useAddons();
    const { updateAddon, removeAddon } = useAddonsApi();
    const { setToastData, setToastApiError } = useToast();
    const navigate = useNavigate();
    const [showDelete, setShowDelete] = useState(false);
    const [deletedAddon, setDeletedAddon] = useState<IAddon>({
        id: 0,
        provider: '',
        description: '',
        enabled: false,
        events: [],
        parameters: {},
    });

    const data = useMemo(() => {
        if (loading) {
            return Array(5).fill({
                name: 'Addon name',
                description: 'Addon description when loading',
            });
        }

        return addons.map(addon => ({
            ...addon,
        }));
    }, [addons, loading]);

    const toggleAddon = useCallback(
        async (addon: IAddon) => {
            try {
                await updateAddon({ ...addon, enabled: !addon.enabled });
                refetchAddons();
                setToastData({
                    type: 'success',
                    title: 'Success',
                    text: 'Addon state switched successfully',
                });
            } catch (error: unknown) {
                setToastApiError(formatUnknownError(error));
            }
        },
        [setToastApiError, refetchAddons, setToastData, updateAddon]
    );

    const columns = useMemo(
        () => [
            {
                id: 'Icon',
                Cell: ({
                    row: {
                        original: { provider },
                    },
                }: any) => (
                    <Box
                        data-loading
                        sx={{
                            pl: 2,
                            pr: 1,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {getAddonIcon(provider)}
                    </Box>
                ),
            },
            {
                Header: 'Name',
                accessor: 'provider',
                width: '90%',
                Cell: ({
                    row: {
                        original: { provider, description },
                    },
                }: any) => {
                    return (
                        <LinkCell
                            data-loading
                            title={provider}
                            subtitle={description}
                        />
                    );
                },
                sortType: 'alphanumeric',
            },
            {
                Header: 'Actions',
                id: 'Actions',
                align: 'center',
                Cell: ({ row: { original } }: any) => (
                    <Box
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        data-loading
                    >
                        <PermissionIconButton
                            permission={UPDATE_ADDON}
                            onClick={() => toggleAddon(original)}
                            tooltipProps={{ title: 'Toggle addon' }}
                        >
                            <ConditionallyRender
                                condition={original.enabled}
                                show={<Visibility />}
                                elseShow={<VisibilityOff />}
                            />
                        </PermissionIconButton>
                        <PermissionIconButton
                            permission={UPDATE_ADDON}
                            tooltipProps={{ title: 'Edit Addon' }}
                            onClick={() =>
                                navigate(`/addons/edit/${original.id}`)
                            }
                        >
                            <Edit />
                        </PermissionIconButton>
                        <PermissionIconButton
                            permission={DELETE_ADDON}
                            tooltipProps={{ title: 'Remove Addon' }}
                            onClick={() => {
                                setDeletedAddon(original);
                                setShowDelete(true);
                            }}
                        >
                            <Delete />
                        </PermissionIconButton>
                    </Box>
                ),
                width: 150,
                disableSortBy: true,
            },
            {
                accessor: 'description',
                disableSortBy: true,
            },
        ],
        [toggleAddon, navigate]
    );

    const initialState = useMemo(
        () => ({
            sortBy: [{ id: 'provider', desc: false }],
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
    } = useTable(
        {
            columns: columns as any[], // TODO: fix after `react-table` v8 update
            data,
            initialState,
            sortTypes,
            autoResetGlobalFilter: false,
            autoResetSortBy: false,
            disableSortRemove: true,
        },
        useSortBy
    );

    const onRemoveAddon = async (addon: IAddon) => {
        try {
            await removeAddon(addon.id);
            refetchAddons();
            setToastData({
                type: 'success',
                title: 'Success',
                text: 'Deleted addon successfully',
            });
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
        }
    };

    return (
        <PageContent
            isLoading={loading}
            header={<PageHeader title="Configured addons" />}
        >
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
            <ConditionallyRender
                condition={rows.length === 0}
                show={
                    <ConditionallyRender
                        condition={globalFilter?.length > 0}
                        show={
                            <TablePlaceholder>
                                No addons found matching &ldquo;
                                {globalFilter}
                                &rdquo;
                            </TablePlaceholder>
                        }
                        elseShow={
                            <TablePlaceholder>
                                No addons configured
                            </TablePlaceholder>
                        }
                    />
                }
            />
            <Dialogue
                open={showDelete}
                onClick={() => {
                    onRemoveAddon(deletedAddon);
                    setShowDelete(false);
                }}
                onClose={() => {
                    setShowDelete(false);
                }}
                title="Confirm deletion"
            >
                <div>Are you sure you want to delete this Addon?</div>
            </Dialogue>
        </PageContent>
    );
};
