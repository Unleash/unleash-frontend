import React from 'react';
import PropTypes from 'prop-types';
import ConfigureStrategy from './strategy-configure';

class StrategyGroup extends React.Component {
    static propTypes = {
        strategy: PropTypes.object.isRequired,
        strategies: PropTypes.array.isRequired,
        updateStrategy: PropTypes.func,
        removeStrategy: PropTypes.func,
        moveStrategy: PropTypes.func,
        isDragging: PropTypes.bool.isRequired,
        connectDragPreview: PropTypes.func.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
    };

    render() {
        const { strategy, strategies } = this.props;
        const blocks = strategy.group.map((strat, i) => (
            <ConfigureStrategy
                key={`group-${i}`}
                strategy={strat}
                strategyDefinition={strategies.find(s => s.name === strat.name)}
            />
        ));
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', border: '1px solid' }}>
                <h2>Group</h2>
                {blocks}
            </div>
        );
    }
}

export default StrategyGroup;
