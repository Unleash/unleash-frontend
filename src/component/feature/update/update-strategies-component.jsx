import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'react-mdl';
import AddStrategy from '../form/strategies-add';

const StrategyGroup = ({ strategy, groupId, strategies, addStrategyToGroup }) => (
    <div style={{ border: '1px solid', margin: '4px', padding: '5px' }}>
        {strategy.group.map((item, i) => <Strategy key={`${groupId}-${i}`} strategy={item} />)}
        <AddStrategy strategies={strategies} addStrategy={addStrategyToGroup.bind(null, groupId)} uniqueId={groupId} />
    </div>
);
const Strategy = ({ strategy, removeStrategy }) => (
    <div>
        <strong>{strategy.name}</strong>
        <Button onClick={removeStrategy}>
            <Icon name="delete" title="delete" />
        </Button>
    </div>
);

class UpdateStrategyComponent extends React.Component {
    static propTypes = {
        featureToggleEdit: PropTypes.object,
        shouldCallInit: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
        addStrategy: PropTypes.func.isRequired,
    };

    componentWillMount() {
        if (!this.props.shouldCallInit) {
            this.props.init();
        }
        this.props.fetchStrategies();
    }

    render() {
        const { featureToggleEdit } = this.props;

        if (!featureToggleEdit) {
            return <div />;
        }

        return (
            <div>
                {featureToggleEdit.strategies.map((s, i) => {
                    if (s.name === '__internal-strategy-group') {
                        return <StrategyGroup key={i} strategy={s} groupId={i} strategies={this.props.strategies} addStrategyToGroup={this.props.addStrategyToGroup} />;
                    } else {
                        return <div key={i}>{s.name}</div>;
                    }
                })}
                <br />
                <a href="add" onClick={this.props.addGroup}>
                    + Add strategy group
                </a>
                <AddStrategy strategies={this.props.strategies} addStrategy={this.props.addStrategy} uniqueId="outer" />
                <br />
                <Link to="/features" onClick={this.props.onCancel}>
                    Cancel Edit
                </Link>
                <Button onClick={this.props.touch}>
                    <Icon name="update" />&nbsp;&nbsp;&nbsp; touch
                </Button>
                <Button type="submit" ripple raised primary disabled={!featureToggleEdit.dirty} icon="add">
                    <Icon name="save" />&nbsp;&nbsp;&nbsp; save
                </Button>
            </div>
        );
    }
}

export default UpdateStrategyComponent;
