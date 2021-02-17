import { connect } from 'react-redux';

import StrategyConstraintInput from './strategy-constraint-input';

export default connect(
    state => ({
        contextNames: state.context.toJS().map(c => c.name),
        contextFields: state.context.toJS(),
    }),
    {}
)(StrategyConstraintInput);
