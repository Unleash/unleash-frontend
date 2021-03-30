import React from "react";
import FeatureListContainer from "../../component/feature/FeatureToggleList";
import PropTypes from "prop-types";

const render = ({ history }) => <FeatureListContainer history={history} />;

render.propTypes = {
    history: PropTypes.object.isRequired
};

export default render;
