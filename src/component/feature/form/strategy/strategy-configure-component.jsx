import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardTitle, CardText, CardMenu, IconButton, Icon } from 'react-mdl';
import { Link } from 'react-router-dom';

import FlexibleRolloutStrategy from './flexible-rollout-strategy';
import DefaultStrategy from './default-strategy';
import GeneralStrategy from './general-strategy';
import UserWithIdStrategy from './user-with-id-strategy';
import UnknownStrategy from './unknown-strategy';

import styles from './strategy.scss';

export default class StrategyConfigureComponent extends React.Component {
    /* eslint-enable */
    static propTypes = {
        strategy: PropTypes.object.isRequired,
        strategyDefinition: PropTypes.object,
        updateStrategy: PropTypes.func,
        removeStrategy: PropTypes.func,
        moveStrategy: PropTypes.func,
        isDragging: PropTypes.bool.isRequired,
        connectDragPreview: PropTypes.func.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
    };

    constructor(props) {
        super();
        this.state = {
            parameters: { ...props.strategy.parameters },
            edit: false,
            dirty: false,
        };
    }

    updateParameters = parameters => {
        const updatedStrategy = Object.assign({}, this.props.strategy, {
            parameters,
        });
        this.props.updateStrategy(updatedStrategy);
    };

    updateParameter = (field, value, forceUp = false) => {
        const { parameters } = this.state;
        parameters[field] = value;
        if (forceUp) {
            this.updateParameters(parameters);
            this.setState({ parameters, dirty: false });
        } else {
            this.setState({ parameters, dirty: true });
        }
    };

    onSave = evt => {
        evt.preventDefault();
        const { parameters } = this.state;
        this.updateParameters(parameters);
        this.setState({ edit: false, dirty: false });
    };

    handleRemove = evt => {
        evt.preventDefault();
        this.props.removeStrategy();
    };

    resolveInputType() {
        const { strategyDefinition } = this.props;
        if (!strategyDefinition) {
            return UnknownStrategy;
        }
        switch (strategyDefinition.name) {
            case 'default':
                return DefaultStrategy;
            case 'flexibleRollout':
                return FlexibleRolloutStrategy;
            case 'userWithId':
                return UserWithIdStrategy;
            default:
                return GeneralStrategy;
        }
    }

    render() {
        const { dirty, parameters } = this.state;
        const {
            isDragging,
            connectDragSource,
            connectDragPreview,
            connectDropTarget,
            strategyDefinition,
            strategy,
        } = this.props;

        const { name } = strategy;

        const description = strategyDefinition ? strategyDefinition.description : 'Uknown';
        const InputType = this.resolveInputType(name);

        const cardClasses = [styles.card];
        if (dirty) {
            cardClasses.push('mdl-color--pink-50');
        }

        return connectDragPreview(
            connectDropTarget(
                <div className={styles.item}>
                    <Card
                        shadow={0}
                        className={cardClasses.join(' ')}
                        style={{
                            opacity: isDragging ? '0.1' : '1',
                            overflow: 'visible',
                        }}
                    >
                        <CardTitle className={styles.cardTitle} title={description}>
                            <Icon name="extension" />
                            &nbsp;
                            {name}
                        </CardTitle>

                        <CardText>
                            <InputType
                                parameters={parameters}
                                strategy={strategy}
                                strategyDefinition={strategyDefinition}
                                updateParameter={this.updateParameter}
                                editable
                            />
                            <Button
                                onClick={this.onSave}
                                accent
                                raised
                                ripple
                                style={{ visibility: dirty ? 'visible' : 'hidden' }}
                            >
                                Save changes
                            </Button>
                        </CardText>

                        <CardMenu className="mdl-color-text--white">
                            <Link
                                title="View strategy"
                                to={`/strategies/view/${name}`}
                                className={styles.editLink}
                                title={description}
                            >
                                <Icon name="info" />
                            </Link>
                            {this.props.removeStrategy ? (
                                <IconButton
                                    title="Remove strategy from toggle"
                                    name="delete"
                                    onClick={this.handleRemove}
                                />
                            ) : (
                                <span />
                            )}
                            {connectDragSource(
                                <span className={styles.reorderIcon}>
                                    <Icon name="reorder" />
                                </span>
                            )}
                        </CardMenu>
                    </Card>
                </div>
            )
        );
    }
}
