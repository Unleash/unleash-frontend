import React from 'react';
import ListExperiment from '../../component/experiment/list-experiment-container';
import PropTypes from 'prop-types';

const render = ({ history }) => <ListExperiment history={history} />;

render.propTypes = {
    history: PropTypes.object.isRequired,
};

export default render;
