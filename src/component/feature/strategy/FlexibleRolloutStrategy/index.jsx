import { connect } from 'react-redux';
import FlexibleRolloutStrategy from './FlexibleRolloutStrategy';

const mapStateToProps = state => ({
    context: state.context.toJS(),
});

const FlexibleRolloutStrategyContainer = connect(mapStateToProps, undefined)(FlexibleRolloutStrategy);

export default FlexibleRolloutStrategyContainer;
