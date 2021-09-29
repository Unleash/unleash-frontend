import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
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

export interface ProjectEnvironment {
    name: string;
    enabled: boolean;
}

const ProjectListNew = () => {
    const { id } = useParams<{id: string}>();
    const { hasAccess } = useContext(AccessContext);

    // api state
    const { toast } = useToast();
    const { uiConfig } = useUiConfig();
    const { environments, loading, error } = useEnvironments();
    const { project, refetch } = useProject(id);
    const { removeEnvironmentFromProject, addEnvironmentToProject } = useProjectApi();
    
    // local state
    const [selectedEnv, setSelectedEnv] = useState<ProjectEnvironment>();
    const [confirmName, setConfirmName] = useState('');
    const ref = useLoading(loading);
    const styles = useStyles();


    const renderError = () => {
        return (
            <ApiError
                onClick={refetch}
                className={styles.apiError}
                text="Error fetching environments"
            />
        );
    };

    const toggleEnv = async (env: ProjectEnvironment) => {
        if(env.enabled) {
            // await removeEnvironmentFromProject(id, env.name);
            setSelectedEnv(env);

        } else {
            await addEnvironmentToProject(id, env.name);
        }
        refetch();
    }

    const handleDisableEnvironment = async () => {
        if(selectedEnv && confirmName===selectedEnv.name) {
            await removeEnvironmentFromProject(id, selectedEnv.name);
            setSelectedEnv(undefined);
            setConfirmName('');
            refetch();
        } 
    }

    const handleCancelDisableEnvironment = () => {
        setSelectedEnv(undefined);
        setConfirmName('');
    }

    const envs = environments.map(e => ({
        name: e.name,
        enabled: (project?.environments).includes(e.name),
    }));

    const hasPermission = hasAccess(UPDATE_PROJECT, id);

    const genLabel = (env: ProjectEnvironment) => (
        <>
            <code>{env.name}</code> environment is <strong>{env.enabled ? 'enabled' : 'disabled'}</strong>
        </>
    );

    const renderEnvironments = () => {
        if(!uiConfig.flags.E) {
            return <p>Feature not enabled.</p>
        }

        return (
            <FormGroup>
                {envs.map(env => (
                    <FormControlLabel key={env.name} label={genLabel(env)} control={
                        <Switch size="medium" disabled={!hasPermission} checked={env.enabled} onChange={toggleEnv.bind(this, env)} />
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
                        title={`Configure environments for "${project?.name}"`}
                    />
                }
            >
                <ConditionallyRender condition={error} show={renderError()} />
                <div className={styles.container}>
                    <ConditionallyRender
                        condition={environments.length < 1 && !loading}
                        show={<div>No environments available.</div>}
                        elseShow={renderEnvironments()}
                    />
                </div>
                <EnvironmentDisableConfirm
                    env={selectedEnv}
                    open={!!selectedEnv}
                    handleDisableEnvironment={handleDisableEnvironment}
                    handleCancelDisableEnvironment={handleCancelDisableEnvironment}
                    confirmName={confirmName}
                    setConfirmName={setConfirmName}
                />
                {toast}
            </PageContent>
        </div>
    );
};

export default ProjectListNew;
