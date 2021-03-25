import React from "react";

import StrategyCardPercentage from "../common/StrategyCardPercentage/StrageyCardPercentage";
import StrategyCardConstraints from "../common/StrategyCardConstraints/StrategyCardConstraints";
import StrategyCardSticky from "../common/StrategyCardField/StrategyCardField";

import { useCommonStyles } from "../../../../../../common.styles";
import ConditionallyRender from "../../../../../common/ConditionallyRender";
import StrategyCardList from "../common/StrategyCardList/StrategyCardList";

const StrategyCardContentList = ({ strategy, parameter, valuesName }) => {
    const commonStyles = useCommonStyles();

    const { parameters, constraints } = strategy;
    const list = parameters[parameter].split(",").filter(user => user);

    return (
        <div>
            <ConditionallyRender
                condition={list.length > 0}
                show={<StrategyCardList list={list} valuesName={valuesName} />}
            />
            <ConditionallyRender
                condition={constraints && constraints.length > 0}
                show={
                    <>
                        <div className={commonStyles.divider} />
                        <StrategyCardConstraints constraints={constraints} />
                    </>
                }
            />
        </div>
    );
};

export default StrategyCardContentList;
