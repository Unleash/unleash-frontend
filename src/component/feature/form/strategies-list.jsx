import React from 'react';
import PropTypes from 'prop-types';
import ConfigureStrategy from './strategy/strategy-configure';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

class StrategiesList extends React.Component {
    static propTypes = {
        strategies: PropTypes.array.isRequired,
        configuredStrategies: PropTypes.array.isRequired,
        featureToggleName: PropTypes.string.isRequired,
        updateStrategy: PropTypes.func,
        removeStrategy: PropTypes.func,
        moveStrategy: PropTypes.func,
        editable: PropTypes.bool,
    };

    static defaultProps = {
        editable: true,
    };

    constructor(props) {
        super();
        // temporal hack, until strategies get UIDs
        const keys = Array.from({ length: props.strategies.length }, () => Math.random());
        this.state = { keys };
    }

    moveStrategy = async (index, toIndex) => {
        await this.props.moveStrategy(index, toIndex);
        const { keys } = this.state;
        keys[index] = Math.random();
        keys[toIndex] = Math.random();
        this.setState({ keys });
    };

    render() {
        const {
            strategies,
            configuredStrategies,
            removeStrategy,
            updateStrategy,
            featureToggleName,
            editable,
        } = this.props;

        const { keys } = this.state;
        if (!configuredStrategies || configuredStrategies.length === 0) {
            return (
                <p style={{ padding: '0 16px' }}>
                    <i>No activation strategies selected.</i>
                </p>
            );
        }

        const blocks = configuredStrategies.map((strategy, i) => (
            <ConfigureStrategy
                index={i}
                key={`${keys[i]}}`}
                featureToggleName={featureToggleName}
                strategy={strategy}
                moveStrategy={this.moveStrategy}
                removeStrategy={removeStrategy ? removeStrategy.bind(null, i) : null}
                updateStrategy={updateStrategy ? updateStrategy.bind(null, i) : null}
                strategyDefinition={strategies.find(s => s.name === strategy.name)}
                editable={editable}
            />
        ));
        return (
            <DndProvider backend={HTML5Backend}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>{blocks}</div>
            </DndProvider>
        );
    }
}

export default StrategiesList;
