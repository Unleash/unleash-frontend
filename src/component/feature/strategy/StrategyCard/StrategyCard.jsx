import React from "react";

import { Card, CardContent } from "@material-ui/core";

import { useStyles } from "./StrategyCard.styles";
import StrategyCardContent from "./StrategyCardContent/StrategyCardContent";
import StrategyCardHeader from "./StrategyCardHeader/StrategyCardHeader";

const StrategyCard = ({
    strategy,
    strategyDefinition,
    connectDragPreview,
    connectDragSource,
    removeStrategy,
    connectDropTarget
}) => {
    const styles = useStyles();

    return connectDragPreview(
        connectDropTarget(
            <span style={{ alignItems: "stretch" }}>
                <Card className={styles.strategyCard}>
                    <StrategyCardHeader
                        name={strategy.name}
                        connectDragSource={connectDragSource}
                        removeStrategy={removeStrategy}
                    />
                    <CardContent>
                        <StrategyCardContent
                            strategy={strategy}
                            strategyDefinition={strategyDefinition}
                        />
                    </CardContent>
                </Card>
            </span>
        )
    );
};

export default StrategyCard;
