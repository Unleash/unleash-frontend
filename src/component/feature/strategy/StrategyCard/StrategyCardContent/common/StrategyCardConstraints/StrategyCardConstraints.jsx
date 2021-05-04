import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';

import { useStyles } from './StrategyCardConstraints.styles.js';
import ConditionallyRender from '../../../../../../common/ConditionallyRender/ConditionallyRender';

const StrategyCardConstraints = ({ constraints, version }) => {
    const styles = useStyles();

    const isOSS = () => {
        if (!version) return true;
        if (version.current.oss) {
            return true;
        }
        return false;
    };

    const renderConstraintValues = constraint =>
        constraint.values.map(value => <span key={value}>'{value}'</span>);

    const renderConstraints = () => {
        return constraints.map((constraint, i) => (
            <div key={`${constraint.contextName}-${constraint.operator}`}>
                <ConditionallyRender
                    condition={i > 0}
                    show={<span>and</span>}
                />
                <pre
                    key={`${constraint.contextName}-${i}`}
                    className={classnames(styles.constraintContainer)}
                >
                    <span>{constraint.contextName}</span>

                    <span>{constraint.operator}</span>

                    {renderConstraintValues(constraint)}
                </pre>
            </div>
        ));
    };

    return (
        <>
            <Typography className={styles.title} variant="subtitle1">
                Constraints
            </Typography>

            <ConditionallyRender
                condition={constraints && constraints.length > 0}
                show={
                    <>
                        <Typography variant="body2">
                            The following pre-conditions must be fulfilled for
                            this strategy to be executed
                        </Typography>
                        <div className={styles.constraints}>
                            {renderConstraints()}
                        </div>
                    </>
                }
                elseShow={
                    <>
                        <Typography variant="body2">
                            No pre-conditions defined for this strategy.
                        </Typography>
                        <ConditionallyRender
                            condition={isOSS()}
                            show={
                                <Typography variant="body2">
                                    Constraints are only available as an
                                    enterprise feature.{' '}
                                    <a href="https://docs.getunleash.io/docs/advanced/strategy_constraints">
                                        Learn more
                                    </a>
                                </Typography>
                            }
                            elseShow={<div>Get started</div>}
                        />
                    </>
                }
            />
        </>
    );
};

StrategyCardConstraints.propTypes = {
    constraints: PropTypes.array,
};

export default StrategyCardConstraints;
