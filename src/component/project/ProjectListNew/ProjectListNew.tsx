import { Link } from 'react-router-dom';
import ProjectCard from '../ProjectCard/ProjectCard';
import { useStyles } from './ProjectListNew.styles';

const ProjectListNew = () => {
    const styles = useStyles();
    return (
        <section>
            <h1>Projects</h1>
            <div className={styles.container}>
                <Link
                    to="/projects-new/myproject"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                >
                    <ProjectCard
                        projectName="My project"
                        members={2}
                        health={95}
                        toggles={4}
                    />
                </Link>

                <ProjectCard
                    projectName="My project"
                    members={2}
                    health={95}
                    toggles={4}
                />

                <ProjectCard
                    projectName="My project"
                    members={2}
                    health={95}
                    toggles={4}
                />
            </div>
        </section>
    );
};

export default ProjectListNew;
