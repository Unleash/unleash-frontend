import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon, IconButton, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import FlexibleRolloutStrategy from '../FlexibleRolloutStrategy';
import DefaultStrategy from '../default-strategy';
import GeneralStrategy from '../general-strategy';
import UserWithIdStrategy from '../user-with-id-strategy';
import UnknownStrategy from '../unknown-strategy';
import LoadingStrategy from '../loading-strategy';
import StrategyConstraints from '../StrategyConstraint/StrategyConstraintInput';
import ConditionallyRender from '../../../common/ConditionallyRender/ConditionallyRender';

import styles from '../strategy.module.scss';

const ConfigureStrategy = ({
    strategy,
    index,
    strategyDefinition,
    updateStrategy,
    saveStrategy,
    removeStrategy,
    moveStrategy,
    isDragging,
    hovered,
    movable,
    connectDragPreview,
    connectDragSource,
    connectDropTarget,
    editable,
}) => {
    const updateParameters = parameters => {
        const updatedStrategy = { ...strategy, parameters };
        updateStrategy(updatedStrategy);
    };

    const updateConstraints = constraints => {
        const updatedStrategy = { ...strategy, constraints };
        updateStrategy(updatedStrategy);
    };

    const updateParameter = async (field, value) => {
        const parameters = { ...strategy.parameters };
        parameters[field] = value;
        updateParameters(parameters);
    };

    const resolveInputType = () => {
        if (!strategyDefinition) {
            return UnknownStrategy;
        }
        switch (strategyDefinition.name) {
            case 'Loading':
                return LoadingStrategy;
            case 'default':
                return DefaultStrategy;
            case 'flexibleRollout':
                return FlexibleRolloutStrategy;
            case 'userWithId':
                return UserWithIdStrategy;
            default:
                return GeneralStrategy;
        }
    };

    const { name, dirty, parameters } = strategy;

    const description = strategyDefinition ? strategyDefinition.description : 'Unknown';
    const InputType = resolveInputType(name);

    const cardClasses = [styles.card];
    if (dirty) {
        cardClasses.push(styles.isDirty);
    }
    if (isDragging) {
        cardClasses.push(styles.isDragging);
    }
    if (hovered) {
        cardClasses.push(styles.isDroptarget);
    }

    const actions = (
        <CardActions disableSpacing>
            <IconButton
                component={Link}
                title="View strategy"
                to={`/strategies/view/${name}`}
                className={styles.editLink}
                title={description}
            >
                <Icon>info</Icon>
            </IconButton>
            <ConditionallyRender
                condition={editable}
                show={
                    <IconButton
                        className={styles.actionButton}
                        title="Remove this activation strategy"
                        name="delete"
                        aria-label="delete"
                        onClick={removeStrategy}
                    >
                        <Icon>delete</Icon>
                    </IconButton>
                }
            />

            <ConditionallyRender
                condition={editable && movable}
                show={connectDragSource(
                    <span>
                        <IconButton className={styles.actionButton}>
                            <Icon>pan_tool</Icon>
                        </IconButton>
                    </span>
                )}
            />

            <ConditionallyRender
                condition={editable && !movable}
                show={
                    <span>
                        <IconButton disabled className={classnames(styles.actionButton, styles.disabled)}>
                            <Icon title="You can not reorder while editing.">pan_tool</Icon>
                        </IconButton>
                    </span>
                }
            />
        </CardActions>
    );

    return connectDragPreview(
        connectDropTarget(
            <div className={styles.item}>
                <Card className={cardClasses.join(' ')}>
                    <CardHeader
                        className={styles.cardTitle}
                        title={name}
                        color="primary"
                        avatar={<Icon>extension</Icon>}
                        action={actions}
                    />

                    <CardContent>
                        <StrategyConstraints
                            updateConstraints={updateConstraints}
                            constraints={strategy.constraints || []}
                        />
                        <InputType
                            parameters={parameters}
                            strategy={strategy}
                            strategyDefinition={strategyDefinition}
                            updateParameter={updateParameter}
                            index={index}
                            editable={editable}
                        />
                        <Button
                            onClick={saveStrategy}
                            style={{
                                visibility: dirty ? 'visible' : 'hidden',
                            }}
                        >
                            Save changes
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    );
};

ConfigureStrategy.propTypes = {
    strategy: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    strategyDefinition: PropTypes.object,
    updateStrategy: PropTypes.func,
    saveStrategy: PropTypes.func,
    removeStrategy: PropTypes.func,
    moveStrategy: PropTypes.func,
    isDragging: PropTypes.bool.isRequired,
    hovered: PropTypes.bool,
    movable: PropTypes.bool,
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    editable: PropTypes.bool,
};

export default ConfigureStrategy;
