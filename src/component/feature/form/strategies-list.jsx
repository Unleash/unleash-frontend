import React from 'react';
import PropTypes from 'prop-types';
import ConfigureStrategy from './strategy-configure';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend) // eslint-disable-line new-cap
class StrategiesList extends React.Component {
    static propTypes = {
        strategies: PropTypes.array.isRequired,
        configuredStrategies: PropTypes.array.isRequired,
        updateStrategy: PropTypes.func.isRequired,
        removeStrategy: PropTypes.func.isRequired,
        moveStrategy: PropTypes.func.isRequired,
    };

    render() {
        const { strategies, configuredStrategies, moveStrategy, removeStrategy, updateStrategy } = this.props;

        if (!configuredStrategies || configuredStrategies.length === 0) {
            return <i style={{ color: 'red' }}>No strategies added</i>;
        }

        const blocks = configuredStrategies.map((strategy, i) => (
            <ConfigureStrategy
                index={i}
                key={strategy.id}
                strategy={strategy}
                moveStrategy={moveStrategy}
                removeStrategy={removeStrategy.bind(null, i)}
                updateStrategy={updateStrategy.bind(null, i)}
                strategyDefinition={strategies.find(s => s.name === strategy.name)}
            />
        ));
        return <div style={{ display: 'flex', flexWrap: 'wrap' }}>{blocks}</div>;
    }
}

export default StrategiesList;
