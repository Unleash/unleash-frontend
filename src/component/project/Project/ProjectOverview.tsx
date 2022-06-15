import useProject from 'hooks/api/getters/useProject/useProject';
import { ProjectFeatureToggles } from './ProjectFeatureToggles/ProjectFeatureToggles';
import ProjectInfo from './ProjectInfo/ProjectInfo';
import { useStyles } from './Project.styles';
import { usePageTitle } from 'hooks/usePageTitle';

interface IProjectOverviewProps {
    projectName: string;
    projectId: string;
}

const ProjectOverview = ({ projectId, projectName }: IProjectOverviewProps) => {
    const { project, loading } = useProject(projectId, {
        refreshInterval: 15 * 1000, // ms
    });
    const { members, features, health, description, environments } = project;
    const { classes: styles } = useStyles();
    usePageTitle(`Project overview – ${projectName}`);

    return (
        <div>
            <div className={styles.containerStyles}>
                <ProjectInfo
                    id={projectId}
                    description={description}
                    memberCount={members}
                    health={health}
                    featureCount={features?.length}
                />
                <div className={styles.projectToggles}>
                    <ProjectFeatureToggles
                        features={features}
                        environments={environments}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;
