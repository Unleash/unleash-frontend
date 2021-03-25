import React from 'react';

import { Card, CardContent } from '@material-ui/core';

import { useStyles } from './StrategyCard.styles';
import StrategyCardContent from './StrategyCardContent/StrategyCardContent';
import StrategyCardHeader from './StrategyCardHeader/StrategyCardHeader';

const StrategyCard = ({ strategy }) => {
    const styles = useStyles();

    return (
        <Card className={styles.strategyCard}>
            <StrategyCardHeader name={strategy.name} />
            <CardContent>
                <StrategyCardContent strategy={strategy} />
            </CardContent>
        </Card>
    );
};

export default StrategyCard;
