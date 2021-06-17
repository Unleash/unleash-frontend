import { Link } from 'react-router-dom';
import useProjects from '../../../hooks/api/useProjects';
import ConditionallyRender from '../../common/ConditionallyRender';
import ProjectCard from '../ProjectCard/ProjectCard';
import { useStyles } from './ProjectListNew.styles';

const ProjectListNew = () => {
    const styles = useStyles();
    const { projects, loading } = useProjects();

    const renderProjects = () => {
        return projects.map((project: any) => {
            return (
                <Link
                    to={`/projects/${project.id}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                >
                    <ProjectCard
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
