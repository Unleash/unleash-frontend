import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { mutate } from 'swr';
import { getProjectFetcher } from '../../../hooks/api/useProject/getProjectFetcher';
import useProjects from '../../../hooks/api/useProjects/useProjects';
import ConditionallyRender from '../../common/ConditionallyRender';
import ProjectCard from '../ProjectCard/ProjectCard';
import { useStyles } from './ProjectListNew.styles';
import { IProjectCard } from '../../../interfaces/project';

import loadingData from './loadingData';
import useLoading from '../../../hooks/useLoading';
import PageContent from '../../common/PageContent';
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import AccessContext from '../../../contexts/AccessContext';

type projectMap = {
    [index: string]: boolean;
};

const ProjectListNew = () => {
    const { hasAccess } = useContext(AccessContext);

    const styles = useStyles();
    const { projects, loading, error, refetch } = useProjects();
    const [fetchedProjects, setFetchedProjects] = useState<projectMap>({});
    const ref = useLoading(loading);

    const handleHover = (projectId: string) => {
        if (fetchedProjects[projectId]) {
            return;
        }

        const { KEY, fetcher } = getProjectFetcher(projectId);
        mutate(KEY, fetcher);
        setFetchedProjects(prev => ({ ...prev, [projectId]: true }));
    };

    const renderError = () => {
        return (
            <Alert
                className={styles.apiError}
                action={
                    <Button color="inherit" size="small" onClick={refetch}>
                        TRY AGAIN
                    </Button>
                }
                severity="error"
            >
                Error fetching projects
            </Alert>
        );
    };

    const renderProjects = () => {
        if (loading) {
            return renderLoading();
        }

        return projects.map((project: IProjectCard) => {
            return (
                <Link
                    key={project.id}
                    to={{
                        pathname: `/projects/${project.id}`,
                        state: {
                            projectName: project.name,
                        },
                    }}
                    className={styles.cardLink}
                >
                    <ProjectCard
                        onHover={() => handleHover(project.id)}
                        projectName={project.name}
                        members={2}
                        health={95}
                        toggles={4}
                    />
                </Link>
            );
        });
    };

    const renderLoading = () => {
        return loadingData.map((project: IProjectCard) => {
            return (
                <ProjectCard
                    data-loading
                    onHover={() => {}}
                    key={project.id}
                    projectName={project.name}
                    members={2}
                    health={95}
                    toggles={4}
                />
            );
        });
    };

    return (
        <div ref={ref}>
            <PageContent headerContent="Projects">
                <ConditionallyRender condition={error} show={renderError()} />
                <div className={styles.container}>
                    <ConditionallyRender
                        condition={projects.length < 1 && !loading}
                        show={<div>No projects available.</div>}
                        elseShow={renderProjects()}
                    />
                </div>
            </PageContent>
        </div>
    );
};

export default ProjectListNew;
