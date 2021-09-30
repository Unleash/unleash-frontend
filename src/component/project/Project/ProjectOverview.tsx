import useProject from '../../../hooks/api/getters/useProject/useProject';
import ProjectFeatureToggles from './ProjectFeatureToggles/ProjectFeatureToggles';
import ProjectInfo from './ProjectInfo/ProjectInfo';
import { useStyles } from './Project.styles';

interface ProjectOverviewProps {
    projectId: string;
}

const ProjectOverview = ({projectId}: ProjectOverviewProps) => {
    const { project, loading } = useProject(projectId);
    const { members, features, health } = project;
    const styles = useStyles();

    return (
        <div>
            <div className={styles.containerStyles}>
                <ProjectInfo
                    id={projectId}
                    memberCount={members}
                    health={health}
                    featureCount={features?.length}
                />
                <ProjectFeatureToggles features={features} loading={loading} />
            </div>
            
        </div>
    );
};

export default ProjectOverview;
