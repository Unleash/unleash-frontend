import ProjectFeatureToggles from './ProjectFeatureToggles/ProjectFeatureToggles';
import ProjectInfo from './ProjectInfo/ProjectInfo';

const Project = () => {
    return (
        <section>
            <h1>My project</h1>
            <div style={{ marginTop: '1.5rem', display: 'flex' }}>
                <ProjectInfo />
                <ProjectFeatureToggles />
                <div></div>
            </div>
        </section>
    );
};

export default Project;
