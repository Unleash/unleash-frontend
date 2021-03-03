import { connect } from 'react-redux';
import Component from './edit-access-component';

const mapStateToProps = (state, props) => {
    const projectBase = { id: '', name: '', description: '' };
    const realProject = state.projects.toJS().find(n => n.id === props.projectId);
    const project = Object.assign(projectBase, realProject);

    return {
        project,
    };
};

const mapDispatchToProps = () => ({});

const EditAccessContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export default EditAccessContainer;
