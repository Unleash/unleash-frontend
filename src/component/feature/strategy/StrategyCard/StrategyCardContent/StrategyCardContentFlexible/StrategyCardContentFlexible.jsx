import React from 'react';

import StrategyCardPercentage from '../common/StrategyCardPercentage/StrageyCardPercentage';
import StrategyCardConstraints from '../common/StrategyCardConstraints/StrategyCardConstraints';
import StrategyCardSticky from '../common/StrategyCardSticky/StrategyCardSticky';

import { useCommonStyles } from '../../../../../../common.styles';
import ConditionallyRender from '../../../../../common/ConditionallyRender';

const StrategyCardContentFlexible = ({ strategy }) => {
    const commonStyles = useCommonStyles();

    const rolloutPercentage = strategy.parameters.rollout;
    const stickyField = Object.keys(strategy.parameters).filter(value => value !== 'rollout');
    const { constraints } = strategy;
    return (
        <div>
            <StrategyCardPercentage percentage={rolloutPercentage} />
            <ConditionallyRender
                condition={constraints.length > 0}
                show={
                    <>
                        <div className={commonStyles.divider} />
                        <StrategyCardConstraints constraints={constraints} />
                    </>
                }
            />

            <div className={commonStyles.divider} />
            <StrategyCardSticky stickyField={stickyField} />
        </div>
    );
};

export default StrategyCardContentFlexible;
