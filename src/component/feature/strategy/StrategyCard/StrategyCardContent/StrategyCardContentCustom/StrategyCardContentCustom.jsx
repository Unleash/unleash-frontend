import React from "react";

import { Typography } from "@material-ui/core";

import StrategyCardPercentage from "../common/StrategyCardPercentage/StrageyCardPercentage";
import StrategyCardConstraints from "../common/StrategyCardConstraints/StrategyCardConstraints";

import { useCommonStyles } from "../../../../../../common.styles";
import ConditionallyRender from "../../../../../common/ConditionallyRender";
import StrategyCardList from "../common/StrategyCardList/StrategyCardList";
import StrategyCardField from "../common/StrategyCardField/StrategyCardField";

const StrategyCardContentCustom = ({ strategy, strategyDefinition }) => {
    const commonStyles = useCommonStyles();

    if (!strategyDefinition)
        return (
            <Typography className={commonStyles.textCenter}>
                No strategy definition defined
            </Typography>
        );
    if (strategyDefinition.name === "Loading") return null;

    const { constraints } = strategy;

    const renderCustomSections = () => {
        return strategyDefinition.parameters.map(paramDefinition => {
            return getSection(paramDefinition);
        });
    };

    const getParam = name => strategy.parameters[name];

    const getSection = paramDefinition => {
        const param = getParam(paramDefinition.name);

        switch (paramDefinition.type) {
            case "percentage":
                return (
                    <>
                        <StrategyCardPercentage percentage={param} />
                        <div className={commonStyles.divider} />
                    </>
                );
            case "list":
                const paramList = param.split(",").filter(listItem => listItem);
                return (
                    <ConditionallyRender
                        condition={paramList.length > 0}
                        show={
                            <>
                                {" "}
                                <StrategyCardList
                                    list={paramList}
                                    valuesName={paramDefinition.name}
                                />
                                <div className={commonStyles.divider} />
                            </>
                        }
                    />
                );
            case "number":
            case "boolean":
            case "string":
                return (
                    <ConditionallyRender
                        condition={param || param === false}
                        show={
                            <StrategyCardField
                                title={paramDefinition.name}
                                value={param}
                            />
                        }
                    />
                );
        }
    };

    return (
        <div>
            {renderCustomSections()}
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

export default StrategyCardContentCustom;
