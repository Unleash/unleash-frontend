import React from 'react';
import CreateExperiment from '../../component/experiment/create-experiment-container';
import PropTypes from 'prop-types';

const render = ({ history }) => <CreateExperiment title="Create experiment" history={history} />;

render.propTypes = {
    history: PropTypes.object.isRequired,
};

export default render;
