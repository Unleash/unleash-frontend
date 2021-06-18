import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mutate } from 'swr';
import { getProjectFetcher } from '../../../hooks/api/useProject/getProjectFetcher';
import useProjects from '../../../hooks/api/useProjects';
import ConditionallyRender from '../../common/ConditionallyRender';
import ProjectCard from '../ProjectCard/ProjectCard';
import { useStyles } from './ProjectListNew.styles';

const ProjectListNew = () => {
    const styles = useStyles();
    const { projects, loading } = useProjects();
    const [fetchedProjects, setFetchedProjects] = useState({});

    const handleHover = (projectId: string) => {
        if (fetchedProjects[projectId]) {
            return;
        }

        const { KEY, fetcher } = getProjectFetcher(projectId);
        mutate(KEY, fetcher);
        setFetchedProjects((prev: Object) => ({ ...prev, [projectId]: true }));
    };

    const renderProjects = () => {
        return projects.map((project: any) => {
            return (
                <Link
                    key={project.id}
                    to={{
                        pathname: `/projects/${project.id}`,
                        state: { projectName: project.name },
                    }}
                    style={{ color: 'inherit', textDecoration: 'none' }}
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

    return (
        <section>
            <h1>Projects</h1>
            <div className={styles.container}>
                <ConditionallyRender
                    condition={projects.length > 0}
                    show={renderProjects()}
                    elseShow={<div>No projects available.</div>}
                />
            </div>
        </section>
    );
};

export default ProjectListNew;
