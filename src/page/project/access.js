import React from 'react';
import EditProjectAccess from '../../component/project/edit-access-container.js';
import PropTypes from 'prop-types';

const render = ({ match: { params }, history }) => (
    <EditProjectAccess projectId={params.id} title="Edit project Access" history={history} />
);

render.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default render;
