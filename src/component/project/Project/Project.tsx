import { useLocation, useParams } from 'react-router';
import useProject from '../../../hooks/api/useProject/useProject';
import useLoading from '../../../hooks/useLoading';
import ProjectFeatureToggles from './ProjectFeatureToggles/ProjectFeatureToggles';
import ProjectInfo from './ProjectInfo/ProjectInfo';

type projectState = {
    [index: string]: string;
    description: string;
    projectName: string;
};

const Project = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useLocation<projectState>();
    const { project, error, loading } = useProject(id);
    const ref = useLoading(loading);
    const { members, features, health } = project;

    const containerStyles = { marginTop: '1.5rem', display: 'flex' };
    console.log(features);
    return (
        <div ref={ref}>
            <h1 data-loading>{project?.name}</h1>
            <div style={containerStyles}>
                <ProjectInfo
                    id={id}
                    memberCount={members}
                    health={health}
                    featureCount={features?.length}
                />
                <ProjectFeatureToggles features={features} loading={loading} />
            </div>
        </div>
    );
};

export default Project;
