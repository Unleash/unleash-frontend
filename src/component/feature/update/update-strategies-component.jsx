import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardMenu, CardText, CardTitle, Icon, IconButton } from 'react-mdl';
import AddStrategy from './strategies-add';
import styles from '../form/strategy.scss';
import StrategyList from './strategy-list-component';

const StrategyGroup = ({ strategy, groupId, strategies, addStrategyToGroup, removeStrategy, removeGroup }) => (
    <Card shadow={0} className={styles.card}>
        <CardTitle className={styles.cardTitle}>Strategy Group</CardTitle>
        <CardText>
            <StrategyList
                strategyDefinitions={strategies}
                strategies={strategy.group}
                removeStrategy={removeStrategy}
            />
        </CardText>
        <CardActions>
            <AddStrategy
                strategies={strategies}
                addStrategy={addStrategyToGroup.bind(null, groupId)}
                uniqueId={`${groupId}`}
            />
        </CardActions>
        <CardMenu className="mdl-color-text--white">
            <select name="operator" title="Group Operator">
                <option value="operator">AND</option>
                <option value="operator">OR</option>
            </select>
            <IconButton title="Remove group" name="delete" onClick={removeGroup} />
            <span className={styles.reorderIcon}>
                <Icon name="reorder" />
            </span>
        </CardMenu>
    </Card>
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
        removeStrategy: PropTypes.func.isRequired,
        removeStrategyFromGroup: PropTypes.func.isRequired,
        removeGroup: PropTypes.func.isRequired,
    };

    componentWillMount() {
        if (!this.props.shouldCallInit) {
            this.props.init();
        }
        this.props.fetchStrategies();
    }

    render() {
        const { featureToggleEdit } = this.props;
        const groupedStrategies = featureToggleEdit.strategies.filter(s => s.name === '__internal-strategy-group');
        const unGroupedStrategies = featureToggleEdit.strategies.filter(s => s.name !== '__internal-strategy-group');

        if (!featureToggleEdit) {
            return <div />;
        }

        return (
            <div>
                {groupedStrategies.map((s, i) => (
                    <StrategyGroup
                        key={i}
                        strategy={s}
                        groupId={i}
                        strategies={this.props.strategies}
                        addStrategyToGroup={this.props.addStrategyToGroup}
                        removeGroup={this.props.removeGroup.bind(this, i)}
                        removeStrategy={this.props.removeStrategyFromGroup.bind(this, i)}
                    />
                ))}
                {unGroupedStrategies.map((s, i) => (
                    <Strategy key={i} strategy={s} removeStrategy={this.props.removeStrategy.bind(null, i)} />
                ))}
                <br />
                <a href="add" onClick={this.props.addGroup}>
                    + Add strategy group
                </a>{' '}
                <br />
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
