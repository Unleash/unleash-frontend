import { connect } from 'react-redux';
import StrategiesSectionComponent from './strategies-section';

const StrategiesSection = connect(
    (state, ownProps) => ({
        strategies: state.strategies.get('list').toArray(),
        configuredStrategies: ownProps.configuredStrategies,
    }),
    {}
)(StrategiesSectionComponent);
export default StrategiesSection;
