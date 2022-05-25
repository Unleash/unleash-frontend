import { useMemo } from 'react';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material';
import { Delete, Edit, Visibility, VisibilityOff } from '@mui/icons-material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import {
    DELETE_ADDON,
    UPDATE_ADDON,
} from 'component/providers/AccessProvider/permissions';
import { Link, useNavigate } from 'react-router-dom';
import { PageContent } from 'component/common/PageContent/PageContent';
import useAddons from 'hooks/api/getters/useAddons/useAddons';
import useToast from 'hooks/useToast';
import useAddonsApi from 'hooks/api/actions/useAddonsApi/useAddonsApi';
import { ReactElement, useContext, useState } from 'react';
import AccessContext from 'contexts/AccessContext';
import { IAddon } from 'interfaces/addons';
import PermissionIconButton from 'component/common/PermissionIconButton/PermissionIconButton';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import { formatUnknownError } from 'utils/formatUnknownError';

interface IConfigureAddonsProps {
    getAddonIcon: (name: string) => ReactElement;
}

export const ConfiguredAddons = ({ getAddonIcon }: IConfigureAddonsProps) => {
    const { refetchAddons, addons, loading } = useAddons();
    const { updateAddon, removeAddon } = useAddonsApi();
    const { setToastData, setToastApiError } = useToast();
    const { hasAccess } = useContext(AccessContext);
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

    const sortAddons = (addons: IAddon[]) => {
        if (!addons) return [];

        return addons.sort((addonA: IAddon, addonB: IAddon) => {
            return addonA.id - addonB.id;
        });
    };

    const data = useMemo(() => {
        if (loading) {
            return Array(5).fill({
                name: 'Addon name',
                description: 'Addon description when loading',
            });
        }

        return addons.map(({ provider, id, description, enabled }) => ({
            provider,
            id,
            description,
            enabled,
        }));
    }, [addons, loading]);

    const columns = useMemo(
        () => [
            {
                id: 'Icon',
                Cell: ({
                    row: {
                        original: { name },
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
                        {getAddonIcon(name)}
                    </Box>
                ),
            },
            {
                Header: 'Name',
                accessor: 'name',
                width: '90%',
                Cell: ({
                    row: {
                        original: { name, description },
                    },
                }: any) => {
                    return (
                        <LinkCell
                            data-loading
                            title={name}
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
                        Actions
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
        []
    );

    const toggleAddon = async (addon: IAddon) => {
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
    };

    const onRemoveAddon = async (addon: IAddon) => {
        try {
            await removeAddon(addon.id);
            refetchAddons();
            setToastData({
                type: 'success',
                title: 'Success',
                text: 'Deleted addon successfully',
            });
        } catch (e) {
            setToastData({
                type: 'error',
                title: 'Error',
                text: 'Can not delete addon',
            });
        }
    };

    const renderAddon = (addon: IAddon) => (
        <ListItem key={addon.id}>
            <ListItemAvatar>{getAddonIcon(addon.provider)}</ListItemAvatar>
            <ListItemText
                primary={
                    <span>
                        <ConditionallyRender
                            condition={hasAccess(UPDATE_ADDON)}
                            show={
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                    to={`/addons/edit/${addon.id}`}
                                >
                                    <strong>{addon.provider}</strong>
                                </Link>
                            }
                            elseShow={<strong>{addon.provider}</strong>}
                        />
                        {addon.enabled ? null : <small> (Disabled)</small>}
                    </span>
                }
                secondary={addon.description}
            />
            <ListItemSecondaryAction>
                <PermissionIconButton
                    permission={UPDATE_ADDON}
                    onClick={() => toggleAddon(addon)}
                    tooltipProps={{ title: 'Toggle addon' }}
                >
                    <ConditionallyRender
                        condition={addon.enabled}
                        show={<Visibility />}
                        elseShow={<VisibilityOff />}
                    />
                </PermissionIconButton>
                <PermissionIconButton
                    permission={UPDATE_ADDON}
                    tooltipProps={{ title: 'Edit Addon' }}
                    onClick={() => navigate(`/addons/edit/${addon.id}`)}
                >
                    <Edit />
                </PermissionIconButton>
                <PermissionIconButton
                    permission={DELETE_ADDON}
                    tooltipProps={{ title: 'Remove Addon' }}
                    onClick={() => {
                        setDeletedAddon(addon);
                        setShowDelete(true);
                    }}
                >
                    <Delete />
                </PermissionIconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
    return (
        <PageContent header="Configured addons">
            <List>
                {sortAddons(addons).map((addon: IAddon) => renderAddon(addon))}
            </List>
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
