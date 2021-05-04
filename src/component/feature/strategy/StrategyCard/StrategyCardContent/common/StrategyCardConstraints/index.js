import { connect } from 'react-redux';
import StrategyCardConstraints from './StrategyCardConstraints';

const mapStateToProps = (state, ownProps) => ({
    version: state.uiConfig.toJS().version,
    constraints: ownProps.constraints,
});

export default connect(mapStateToProps)(StrategyCardConstraints);
