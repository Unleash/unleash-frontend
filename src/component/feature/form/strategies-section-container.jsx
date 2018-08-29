import { connect } from 'react-redux';
import StrategiesSectionComponent from './strategies-section';
import { fetchStrategies } from '../../../store/strategy/actions';

const GROUP_STRATEGY = '__internal-strategy-group';
const UNGROUPED = '__internal-ungrouped';

const extractStrategyGroups = configuredStrategies => {
    const strategyGroups = [];
    const ungrouped = {
        displayName: 'Ungrouped',
        operator: 'OR',
        name: UNGROUPED,
        group: [],
    };

    configuredStrategies.forEach(strategy => {
        if (strategy.name === GROUP_STRATEGY) {
            strategyGroups.push(strategy);
        } else {
            ungrouped.group.push(strategy);
        }
    });
    if (ungrouped.group.length > 0) {
        strategyGroups.unshift(ungrouped);
    }
    return strategyGroups;
};

const mapStateToProps = (state, ownProps) => ({
    strategies: state.strategies.get('list').toArray(),
    strategyGroups: extractStrategyGroups(ownProps.configuredStrategies),
});

const mapDispatchToProps = {
    fetchStrategies,
};

const StrategiesSection = connect(mapStateToProps, mapDispatchToProps)(StrategiesSectionComponent);
export default StrategiesSection;
