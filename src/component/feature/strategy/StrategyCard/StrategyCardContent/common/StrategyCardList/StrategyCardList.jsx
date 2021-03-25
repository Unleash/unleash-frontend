import React from 'react';

import { Chip, Typography } from '@material-ui/core';

import { useStyles } from './StrategyCardList.styles.js';

const StrategyCardList = ({ list, valuesName }) => {
    const styles = useStyles();

    return (
        <div className={styles.strategyList}>
            <Typography className={styles.strategyListHeader}>List of {valuesName}</Typography>
            {list.map(listItem => (
                <Chip key={listItem} label={listItem} className={styles.strategyListChip} />
            ))}
        </div>
    );
};

export default StrategyCardList;
