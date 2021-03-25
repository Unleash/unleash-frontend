import React from "react";

import { Card, CardContent } from "@material-ui/core";

import { useStyles } from "./StrategyCard.styles";
import StrategyCardContent from "./StrategyCardContent/StrategyCardContent";
import StrategyCardHeader from "./StrategyCardHeader/StrategyCardHeader";

const StrategyCard = ({ strategy, strategyDefinition }) => {
    const styles = useStyles();

    return (
        <Card className={styles.strategyCard}>
            <StrategyCardHeader name={strategy.name} />
            <CardContent>
                <StrategyCardContent
                    strategy={strategy}
                    strategyDefinition={strategyDefinition}
                />
            </CardContent>
        </Card>
    );
};

export default StrategyCard;
