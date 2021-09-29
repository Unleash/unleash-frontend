import React from 'react';
import ProjectEnvironment from '../../component/project/ProjectEnvironment/ProjectEnvironment';
import PropTypes from 'prop-types';

const render = ({ history }) => <ProjectEnvironment history={history} />;

render.propTypes = {
    history: PropTypes.object.isRequired,
};

export default render;
