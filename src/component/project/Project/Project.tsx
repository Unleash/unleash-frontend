import { useLocation, useParams } from 'react-router';
import useProject from '../../../hooks/api/useProject/useProject';
import ProjectFeatureToggles from './ProjectFeatureToggles/ProjectFeatureToggles';
import ProjectInfo from './ProjectInfo/ProjectInfo';

const Project = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useLocation();
    const { project } = useProject(id);
    const { members, features } = project;

    return (
        <section>
            <h1>{state?.projectName}</h1>
            <div style={{ marginTop: '1.5rem', display: 'flex' }}>
                <ProjectInfo
                    id={id}
                    memberCount={members}
                    featureCount={features?.length}
                />
                <ProjectFeatureToggles features={features} />
            </div>
        </section>
    );
};

export default Project;
