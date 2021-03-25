import React from "react";

import StrategyCardContentFlexible from "./StrategyCardContentFlexible/StrategyCardContentFlexible";
import StrategyCardContentGradRandom from "./StrategyCardContentGradRandom/StrategyCardContentGradRandom";
import StrategyCardContentList from "./StrategyCardContentList/StrategyCardContentList";
import StrategyCardContentRollout from "./StrategyCardContentRollout/StrategyCardContentRollout";

const StrategyCardContent = ({ strategy }) => {
    const resolveContent = () => {
        switch (strategy.name) {
            case "default":
            case "flexibleRollout":
                return <StrategyCardContentFlexible strategy={strategy} />;
            case "userWithId":
                return (
                    <StrategyCardContentList
                        parameter={"userIds"}
                        valuesName={"userIds"}
                        strategy={strategy}
                    />
                );
            case "gradualRolloutRandom":
                return <StrategyCardContentGradRandom strategy={strategy} />;
            case "remoteAddress":
                return (
                    <StrategyCardContentList
                        parameter={"IPs"}
                        valuesName={"IPs"}
                        strategy={strategy}
                    />
                );
            case "applicationHostname":
                return (
                    <StrategyCardContentList
                        parameter={"hostNames"}
                        valuesName={"hostnames"}
                        strategy={strategy}
                    />
                );
            case "gradualRolloutUserId":
            case "gradualRolloutSessionId":
                return <StrategyCardContentRollout strategy={strategy} />;
            default:
                return null;
        }
    };

    return resolveContent();
};

export default StrategyCardContent;
