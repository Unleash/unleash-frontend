import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mutate } from 'swr';
import { getProjectFetcher } from '../../../hooks/api/useProject/getProjectFetcher';
import useProjects from '../../../hooks/api/useProjects';
import ConditionallyRender from '../../common/ConditionallyRender';
import ProjectCard from '../ProjectCard/ProjectCard';
import { useStyles } from './ProjectListNew.styles';

import loadingData from './loadingData';
import useLoading from '../../../hooks/useLoading';

type projectMap = {
    [index: string]: boolean;
};

const ProjectListNew = () => {
    const styles = useStyles();
    const { projects, loading } = useProjects();
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

    const renderProjects = () => {
        if (loading) {
            return renderLoading();
        }

        return projects.map((project: any) => {
            return (
                <Link
                    key={project.id}
                    to={{
                        pathname: `/projects/${project.id}`,
                        state: { projectName: project.name },
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
        return loadingData.map((project: any) => {
            return (
                <ProjectCard
                    data-loading
                    onHover={() => {}}
                    key={project.id}
                    projectName={project.name}
                    members={project.members}
                    health={project.health}
                    toggles={project.toggles}
                />
            );
        });
    };

    return (
        <div ref={ref}>
            <h1>Projects</h1>
            <div className={styles.container}>
                <ConditionallyRender
                    condition={projects.length < 1 && !loading}
                    show={<div>No projects available.</div>}
                    elseShow={renderProjects()}
                />
            </div>
        </div>
    );
};

export default ProjectListNew;
