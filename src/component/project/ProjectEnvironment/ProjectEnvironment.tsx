import { useContext, useState } from 'react';
import ConditionallyRender from '../../common/ConditionallyRender';
import { useStyles } from './ProjectEnvironment.styles';

import useLoading from '../../../hooks/useLoading';
import PageContent from '../../common/PageContent';
import AccessContext from '../../../contexts/AccessContext';
import HeaderTitle from '../../common/HeaderTitle';
import { UPDATE_PROJECT } from '../../AccessProvider/permissions';

import ApiError from '../../common/ApiError/ApiError';
import useToast from '../../../hooks/useToast';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
import useEnvironments from '../../../hooks/api/getters/useEnvironments/useEnvironments';
import useProject from '../../../hooks/api/getters/useProject/useProject';
import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import useProjectApi from '../../../hooks/api/actions/useProjectApi/useProjectApi';
import EnvironmentDisableConfirm from './EnvironmentDisableConfirm/EnvironmentDisableConfirm';
import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';


export interface ProjectEnvironment {
    name: string;
    enabled: boolean;
}

interface ProjectEnvironmentListProps {
    projectId: string;
}

const ProjectEnvironmentList = ({ projectId }: ProjectEnvironmentListProps) => {
    const { hasAccess } = useContext(AccessContext);

    // api state
    const { toast, setToastData } = useToast();
    const { uiConfig } = useUiConfig();
    const {
        environments,
        loading,
        error,
        refetch: refetchEnvs,
    } = useEnvironments();
    const { project, refetch: refetchProject } = useProject(projectId);
    const { removeEnvironmentFromProject, addEnvironmentToProject } =
        useProjectApi();

    // local state
    const [selectedEnv, setSelectedEnv] = useState<ProjectEnvironment>();
    const [confirmName, setConfirmName] = useState('');
    const ref = useLoading(loading);
    const styles = useStyles();


    const refetch = () => {
        refetchEnvs();
        refetchProject();
    };

    const renderError = () => {
        return (
            <ApiError
                onClick={refetch}
                className={styles.apiError}
                text="Error fetching environments"
            />
        );
    };

    const errorMsg = (enable: boolean): string => {
        return `Got an API error when trying to ${
            enable ? 'enable' : 'disable'
        } the environment.`;
    };

    const toggleEnv = async (env: ProjectEnvironment) => {
        if (env.enabled) {
            setSelectedEnv(env);
        } else {
            try {
                await addEnvironmentToProject(projectId, env.name);
                setToastData({
                    text: 'Environment successfully enabled.',
                    type: 'success',
                    show: true,
                });
            } catch (error) {
                setToastData({
                    text: errorMsg(true),
                    type: 'error',
                    show: true,
                });
            }
        }
        refetch();
    };

    const handleDisableEnvironment = async () => {
        if (selectedEnv && confirmName === selectedEnv.name) {
            try {
                await removeEnvironmentFromProject(projectId, selectedEnv.name);
                setSelectedEnv(undefined);
                setConfirmName('');
                setToastData({
                    text: 'Environment successfully disabled.',
                    type: 'success',
                    show: true,
                });
            } catch (e) {
                setToastData({
                    text: errorMsg(false),
                    type: 'error',
                    show: true,
                });
            }

            refetch();
        }
    };

    const handleCancelDisableEnvironment = () => {
        setSelectedEnv(undefined);
        setConfirmName('');
    };

    const envs = environments.map(e => ({
        name: e.name,
        enabled: project?.environments.includes(e.name),
    }));

    const hasPermission = hasAccess(UPDATE_PROJECT, projectId);

    const genLabel = (env: ProjectEnvironment) => (
        <>
            <code>{env.name}</code> environment is{' '}
            <strong>{env.enabled ? 'enabled' : 'disabled'}</strong>
        </>
    );

    const renderEnvironments = () => {
        return (
            <FormGroup>
                {envs.map(env => (
                    <FormControlLabel
                        key={env.name}
                        label={genLabel(env)}
                        control={
                            <Switch
                                size="medium"
                                disabled={!hasPermission}
                                checked={env.enabled}
                                onChange={toggleEnv.bind(this, env)}
                            />
                        }
                    />
                ))}
            </FormGroup>
        );
    };

    return (
        <div ref={ref}>
            <PageContent
                headerContent={
                    <HeaderTitle
                        title={`Configure environments for "${project?.name}" project`}
                    />}
            >
                <ConditionallyRender condition={uiConfig.flags.E} show={
                    <div className={styles.container}>
                        <ConditionallyRender condition={error} show={renderError()} />
                        <Alert severity="info" style={{marginBottom: '20px'}}>
                            <b>Important!</b> In order for your application to retrieve configured activation strategies for a specific environment, 
                            the application<br/> must use an environment specific API key. You can look up the environment-specific API keys {' '}
                            <Link
                                to='/admin/api'
                            >
                                here.
                            </Link>
                            <br/>
                            <br/>
                            Your administrator can configure an environment-specific API key to be used in the SDK.
                            If you are an administrator you can {' '}
                            <Link
                                to='/admin/api'
                            >
                                create a new API key.
                            </Link>
                        </Alert>
                        <ConditionallyRender
                            condition={environments.length < 1 && !loading}
                            show={<div>No environments available.</div>}
                            elseShow={renderEnvironments()}
                        />
                        <EnvironmentDisableConfirm
                            env={selectedEnv}
                            open={!!selectedEnv}
                            handleDisableEnvironment={handleDisableEnvironment}
                            handleCancelDisableEnvironment={
                                handleCancelDisableEnvironment
                            }
                            confirmName={confirmName}
                            setConfirmName={setConfirmName}
                        />
                    </div>
                    
                } elseShow={
                    <Alert security="success">
                        This feature has not been Unleashed for you yet. 
                    </Alert>
                } />
                
                {toast}
            </PageContent>
        </div>
    );
};

export default ProjectEnvironmentList;
