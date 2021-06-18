import { useLocation, useParams } from 'react-router';
import useProject from '../../../hooks/api/useProject/useProject';
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
    const { project } = useProject(id);
    const { members, features } = project;

    const containerStyles = { marginTop: '1.5rem', display: 'flex' };

    return (
        <section>
            <h1>{state?.projectName}</h1>
            <div style={containerStyles}>
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
