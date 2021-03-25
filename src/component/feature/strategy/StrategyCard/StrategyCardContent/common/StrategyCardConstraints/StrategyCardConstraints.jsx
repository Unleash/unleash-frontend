import { Typography } from '@material-ui/core';
import classnames from 'classnames';
import React from 'react';

import { useStyles } from './StrategyCardConstraints.styles.js';

const StrategyCardConstraints = ({ constraints }) => {
    const styles = useStyles();

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

    return (
        <>
            <Typography className={styles.title} variant="subtitle1">
                Constraints
            </Typography>
            {renderConstraints()}
        </>
    );
};

export default StrategyCardConstraints;
