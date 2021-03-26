import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import React from 'react';

import { useStyles } from './StrategyCardConstraints.styles.js';

const StrategyCardConstraints = ({ constraints }) => {
    const styles = useStyles();

    const renderConstraintValues = constraint =>
        constraint.values.map((value, i) => (
            <Typography
                className={classnames({
                    [styles.verticalSpacer]: i !== 0,
                })}
                key={value}
            >
                {value}
            </Typography>
        ));

    const renderConstraints = () =>
        constraints.map((constraint, i) => (
            <>
                <div key={`${constraint.contextName}-${i}`} className={styles.constraintContainer}>
                    <Typography variant="body1">{constraint.contextName}</Typography>
                    <span className={styles.verticalSpacer}>|</span>
                    <Typography variant="body1">{constraint.operator}</Typography>
                    <span className={styles.verticalSpacer}>|</span>
                    {renderConstraintValues(constraint)}
                </div>
            </>
        ));

    return (
        <>
            <Typography className={styles.title} variant="subtitle1">
                Constraints
            </Typography>
            {renderConstraints()}
        </>
    );
};

StrategyCardConstraints.propTypes = {
    constraints: PropTypes.array.isRequired,
};

export default StrategyCardConstraints;
