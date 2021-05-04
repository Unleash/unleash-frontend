import React from 'react';
import PropTypes from 'prop-types';

import StrategyCardPercentage from '../common/StrategyCardPercentage/StrageyCardPercentage';
import StrategyCardConstraints from '../common/StrategyCardConstraints/StrategyCardConstraints';
import StrategyCardField from '../common/StrategyCardField/StrategyCardField';

import { useCommonStyles } from '../../../../../../common.styles';

const StrategyCardContentFlexible = ({ strategy }) => {
    const commonStyles = useCommonStyles();

    const rolloutPercentage = strategy.parameters.rollout;
    const stickyField = strategy.parameters.stickiness;
    const groupId = strategy.parameters.groupId;
    const { constraints } = strategy;

    return (
        <div>
            <StrategyCardConstraints constraints={constraints} />
            <div className={commonStyles.divider} />
            <StrategyCardPercentage percentage={rolloutPercentage} />

            <div className={commonStyles.divider} />
            <StrategyCardField title="Sticky on" value={stickyField} />
            <StrategyCardField title="Group id" value={groupId} />
        </div>
    );
};

StrategyCardContentFlexible.propTypes = {
    strategy: PropTypes.object.isRequired,
};

export default StrategyCardContentFlexible;
