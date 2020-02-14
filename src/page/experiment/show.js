import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ViewExperiment from './../../component/experiment/view-experiment-containter';

export default class Features extends PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    render() {
        const {
            match: { params },
            history,
        } = this.props;
        return <ViewExperiment experimentName={params.experimentName} history={history} />;
    }
}
