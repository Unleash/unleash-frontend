import HeaderTitle from '../../common/HeaderTitle';
import ResponsiveButton from '../../common/ResponsiveButton/ResponsiveButton';
import { Add, CloudCircle, Delete, Edit } from '@material-ui/icons';
import PageContent from '../../common/PageContent';
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from '@material-ui/core';
import useEnvironments from '../../../hooks/api/getters/useEnvironments/useEnvironments';
import { IEnvironment } from '../../../interfaces/environments';
import ConditionallyRender from '../../common/ConditionallyRender';
import { useContext, useState } from 'react';
import AccessContext from '../../../contexts/AccessContext';
import { Link, useHistory } from 'react-router-dom';
import { DELETE_CONTEXT_FIELD } from '../../AccessProvider/permissions';
import EnvironmentDeleteConfirm from './EnvironmentDeleteConfirm/EnvironmentDeleteConfirm';
import useToast from '../../../hooks/useToast';
import useEnvironmentApi from '../../../hooks/api/actions/useEnvironmentApi/useEnvironmentApi';
import EnvironmentListItem from './EnvironmentListItem/EnvironmentListItem';

const EnvironmentList = () => {
    const defaultEnv = {
        name: '',
        type: '',
        displayName: '',
        sortOrder: 0,
        createdAt: '',
    };
    const { environments, refetch } = useEnvironments();
    const [selectedEnv, setSelectedEnv] = useState(defaultEnv);
    const [delDialog, setDeldialogue] = useState(false);
    const [confirmName, setConfirmName] = useState('');

    const history = useHistory();
    const { toast, setToastData } = useToast();
    const { deleteEnvironment } = useEnvironmentApi();

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
        environments.map((env: IEnvironment) => (
            <EnvironmentListItem
                key={env.name}
                env={env}
                setDeldialogue={setDeldialogue}
                setSelectedEnv={setSelectedEnv}
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
            {toast}
        </PageContent>
    );
};

export default EnvironmentList;
