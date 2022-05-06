import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from '@mui/material';
import { Add } from '@mui/icons-material';
import useToast from 'hooks/useToast';
import { IEnvironment } from 'interfaces/environments';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import ResponsiveButton from 'component/common/ResponsiveButton/ResponsiveButton';
import { PageContent } from 'component/common/PageContent/PageContent';
import { useEnvironments } from 'hooks/api/getters/useEnvironments/useEnvironments';
import useEnvironmentApi, {
    createSortOrderPayload,
} from 'hooks/api/actions/useEnvironmentApi/useEnvironmentApi';
import useProjectRolePermissions from 'hooks/api/getters/useProjectRolePermissions/useProjectRolePermissions';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { formatUnknownError } from 'utils/formatUnknownError';
import EnvironmentListItem from './EnvironmentListItem/EnvironmentListItem';
import EnvironmentToggleConfirm from './EnvironmentToggleConfirm/EnvironmentToggleConfirm';
import EnvironmentDeleteConfirm from './EnvironmentDeleteConfirm/EnvironmentDeleteConfirm';
import { MoveListItem } from 'hooks/useDragItem';

const EnvironmentList = () => {
    const defaultEnv = {
        name: '',
        type: '',
        sortOrder: 0,
        createdAt: '',
        enabled: true,
        protected: false,
    };
    const { environments, mutateEnvironments, refetchEnvironments } =
        useEnvironments();
    const { uiConfig } = useUiConfig();
    const { refetch: refetchProjectRolePermissions } =
        useProjectRolePermissions();

    const [selectedEnv, setSelectedEnv] = useState(defaultEnv);
    const [delDialog, setDeldialogue] = useState(false);
    const [toggleDialog, setToggleDialog] = useState(false);
    const [confirmName, setConfirmName] = useState('');

    const navigate = useNavigate();
    const { setToastApiError, setToastData } = useToast();
    const {
        deleteEnvironment,
        changeSortOrder,
        toggleEnvironmentOn,
        toggleEnvironmentOff,
    } = useEnvironmentApi();

    const handleDeleteEnvironment = async () => {
        try {
            await deleteEnvironment(selectedEnv.name);
            refetchProjectRolePermissions();
            setToastData({
                type: 'success',
                title: 'Project environment deleted',
                text: 'You have successfully deleted the project environment.',
            });
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
        } finally {
            setDeldialogue(false);
            setSelectedEnv(defaultEnv);
            setConfirmName('');
            refetchEnvironments();
        }
    };

    const handleConfirmToggleEnvironment = () => {
        if (selectedEnv.enabled) {
            return handleToggleEnvironmentOff();
        }
        handleToggleEnvironmentOn();
    };

    const handleToggleEnvironmentOn = async () => {
        try {
            await toggleEnvironmentOn(selectedEnv.name);
            setToggleDialog(false);

            setToastData({
                type: 'success',
                title: 'Project environment enabled',
                text: 'Your environment is enabled',
            });
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
        } finally {
            refetchEnvironments();
        }
    };

    const handleToggleEnvironmentOff = async () => {
        try {
            await toggleEnvironmentOff(selectedEnv.name);
            setToggleDialog(false);
            setToastData({
                type: 'success',
                title: 'Project environment disabled',
                text: 'Your environment is disabled.',
            });
        } catch (error: unknown) {
            setToastApiError(formatUnknownError(error));
        } finally {
            refetchEnvironments();
        }
    };

    const moveListItem: MoveListItem = useCallback(
        async (dragIndex: number, dropIndex: number, save = false) => {
            const copy = [...environments];
            const tmp = copy[dragIndex];
            copy.splice(dragIndex, 1);
            copy.splice(dropIndex, 0, tmp);
            mutateEnvironments(copy);

            if (save) {
                try {
                    await changeSortOrder(createSortOrderPayload(copy));
                } catch (error: unknown) {
                    setToastApiError(formatUnknownError(error));
                }
            }
        },
        [changeSortOrder, environments, refetchEnvironments, setToastApiError]
    );

    const environmentList = () =>
        environments.map((env: IEnvironment, index: number) => (
            <EnvironmentListItem
                key={env.name}
                env={env}
                setDeldialogue={setDeldialogue}
                setSelectedEnv={setSelectedEnv}
                setToggleDialog={setToggleDialog}
                moveListItem={moveListItem}
                index={index}
            />
        ));

    const navigateToCreateEnvironment = () => {
        navigate('/environments/create');
    };
    return (
        <PageContent
            header={
                <PageHeader
                    title="Environments"
                    actions={
                        <>
                            <ResponsiveButton
                                onClick={navigateToCreateEnvironment}
                                maxWidth="700px"
                                Icon={Add}
                                permission={ADMIN}
                                disabled={!Boolean(uiConfig.flags.EEA)}
                            >
                                New Environment
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
            <EnvironmentToggleConfirm
                env={selectedEnv}
                open={toggleDialog}
                setToggleDialog={setToggleDialog}
                handleConfirmToggleEnvironment={handleConfirmToggleEnvironment}
            />
        </PageContent>
    );
};

export default EnvironmentList;
