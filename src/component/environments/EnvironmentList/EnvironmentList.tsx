import HeaderTitle from '../../common/HeaderTitle';
import ResponsiveButton from '../../common/ResponsiveButton/ResponsiveButton';
import { Add } from '@material-ui/icons';
import PageContent from '../../common/PageContent';
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from '@material-ui/core';
import useEnvironments, {
    ENVIRONMENT_CACHE_KEY,
} from '../../../hooks/api/getters/useEnvironments/useEnvironments';
import {
    IEnvironment,
    ISortOrderPayload,
} from '../../../interfaces/environments';
import ConditionallyRender from '../../common/ConditionallyRender';
import { useCallback, useContext, useState } from 'react';
import AccessContext from '../../../contexts/AccessContext';
import { Link, useHistory } from 'react-router-dom';
import EnvironmentDeleteConfirm from './EnvironmentDeleteConfirm/EnvironmentDeleteConfirm';
import useToast from '../../../hooks/useToast';
import useEnvironmentApi from '../../../hooks/api/actions/useEnvironmentApi/useEnvironmentApi';
import EnvironmentListItem from './EnvironmentListItem/EnvironmentListItem';
import { mutate } from 'swr';
import EditEnvironment from '../EditEnvironment/EditEnvironment';

const EnvironmentList = () => {
    const defaultEnv = {
        name: '',
        type: '',
        displayName: '',
        sortOrder: 0,
        createdAt: '',
    };
    const { environments, refetch } = useEnvironments();
    const [editEnvironment, setEditEnvironment] = useState(false);

    const [selectedEnv, setSelectedEnv] = useState(defaultEnv);
    const [delDialog, setDeldialogue] = useState(false);
    const [confirmName, setConfirmName] = useState('');

    const history = useHistory();
    const { toast, setToastData } = useToast();
    const { deleteEnvironment, changeSortOrder } = useEnvironmentApi();

    const moveListItem = async (dragIndex: number, hoverIndex: number) => {
        const newEnvList = [...environments];
        if (newEnvList.length === 0) return;

        const item = newEnvList.splice(dragIndex, 1)[0];

        newEnvList.splice(hoverIndex, 0, item);

        mutate(ENVIRONMENT_CACHE_KEY, { environments: newEnvList }, false);

        const sortOrder = newEnvList.reduce(
            (acc: ISortOrderPayload, env: IEnvironment, index: number) => {
                acc[env.name] = index + 1;
                return acc;
            },
            {}
        );

        await sortOrderAPICall(sortOrder);

        mutate(ENVIRONMENT_CACHE_KEY);
    };

    const sortOrderAPICall = async (sortOrder: ISortOrderPayload) => {
        try {
            changeSortOrder(sortOrder);
        } catch (e) {
            setToastData({
                show: true,
                type: 'error',
                text: e.toString(),
            });
        }
    };

    const handleDeleteEnvironment = async () => {
        try {
            await deleteEnvironment(selectedEnv.name);
            setToastData({
                show: true,
                type: 'success',
                text: 'Successfully deleted environment.',
            });
        } catch (e) {
            setToastData({
                show: true,
                type: 'error',
                text: e.toString(),
            });
        } finally {
            setDeldialogue(false);
            setSelectedEnv(defaultEnv);
            setConfirmName('');
            refetch();
        }
    };

    const environmentList = () =>
        environments.map((env: IEnvironment, index: number) => (
            <EnvironmentListItem
                key={env.name}
                env={env}
                setEditEnvironment={setEditEnvironment}
                setDeldialogue={setDeldialogue}
                setSelectedEnv={setSelectedEnv}
                index={index}
                moveListItem={moveListItem}
            />
        ));

    const navigateToCreateEnvironment = () => {
        history.push('/environments/create');
    };

    return (
        <PageContent
            headerContent={
                <HeaderTitle
                    title="Environments"
                    actions={
                        <>
                            <ResponsiveButton
                                onClick={navigateToCreateEnvironment}
                                maxWidth="700px"
                                tooltip="Add environment"
                                Icon={Add}
                            >
                                Add Environment
                            </ResponsiveButton>
                        </>
                    }
                />
            }
        >
            <List>{environmentList()}</List>
            <EnvironmentDeleteConfirm
                env={selectedEnv}
                setSelectedEnv={setSelectedEnv}
                setDeldialogue={setDeldialogue}
                open={delDialog}
                handleDeleteEnvironment={handleDeleteEnvironment}
                confirmName={confirmName}
                setConfirmName={setConfirmName}
            />

            <EditEnvironment
                env={selectedEnv}
                setEditEnvironment={setEditEnvironment}
                editEnvironment={editEnvironment}
                setToastData={setToastData}
            />
            {toast}
        </PageContent>
    );
};

export default EnvironmentList;
