import { connect } from "react-redux";

import ReportToggleList from "./report-toggle-list";

const mapStateToProps = state => {
    const features = state.features.toJS();

    return {
        features
    };
};

const ReportToggleListContainer = connect(
    mapStateToProps,
    null
)(ReportToggleList);

export default ReportToggleListContainer;
