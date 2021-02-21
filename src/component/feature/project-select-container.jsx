import { connect } from 'react-redux';
import ProjectSelectComponent from './project-select-component';
import { fetchProjects } from './../../store/project/actions';

const mapStateToProps = state => {
    const projects = state.projects.toJS();
    const enabled = state.uiConfig.toJS().flags.P;

    return {
        projects,
        enabled,
    };
};

const ProjectContainer = connect(mapStateToProps, { fetchProjects })(ProjectSelectComponent);

export default ProjectContainer;
