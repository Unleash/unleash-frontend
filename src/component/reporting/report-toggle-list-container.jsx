import { connect } from "react-redux";

import ReportToggleList from "./report-toggle-list";

const mapStateToProps = (state, ownProps) => {
    const features = state.features.toJS();

    return {
        features,
        selectedProject: ownProps.selectedProject
    };
};

const ReportToggleListContainer = connect(
    mapStateToProps,
    null
)(ReportToggleList);

export default ReportToggleListContainer;
