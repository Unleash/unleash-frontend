import HeaderTitle from '../../common/HeaderTitle';
import ResponsiveButton from '../../common/ResponsiveButton/ResponsiveButton';
import { Add, CloudCircle, Delete } from '@material-ui/icons';
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

const EnvironmentList = () => {
    const defaultEnv = {
        name: '',
        type: '',
        displayName: '',
    };
    const { hasAccess } = useContext(AccessContext);
    const { environments, refetch } = useEnvironments();
    const [selectedEnv, setSelectedEnv] = useState(defaultEnv);
    const [delDialog, setDeldialogue] = useState(false);
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
            refetch();
        }
    };

    const environmentList = () =>
        environments.map((env: IEnvironment) => (
            <ListItem key={env.name}>
                <ListItemIcon>
                    <CloudCircle />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Link to={`/environments/${env.name}`}>
                            <strong>{env.name}</strong>
                        </Link>
                    }
                    secondary={env.displayName}
                />
                <ConditionallyRender
                    condition={hasAccess(DELETE_CONTEXT_FIELD)}
                    show={
                        <Tooltip title="Delete context field">
                            <IconButton
                                aria-label="delete"
                                onClick={() => {
                                    setDeldialogue(true);
                                    setSelectedEnv(env);
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    }
                />
            </ListItem>
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
            />
            {toast}
        </PageContent>
    );
};

export default EnvironmentList;
