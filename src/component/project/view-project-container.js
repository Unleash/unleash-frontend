import { connect } from 'react-redux';
import ViewProject from './view-project-component';

const mapStateToProps = (state, props) => {
    const projectBase = { id: '', name: '', description: '' };
    const realProject = state.projects.toJS().find(n => n.id === props.projectId);
    const project = Object.assign(projectBase, realProject);

    return {
        project,
    };
};

const FormAddContainer = connect(mapStateToProps)(ViewProject);

export default FormAddContainer;
