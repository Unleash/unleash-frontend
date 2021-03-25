import React from 'react';
import StrategyCardPercentage from './common/StrategyCardPercentage/StrageyCardPercentage';
import StrategyCardConstraints from './common/StrategyCardConstraints/StrategyCardConstraints';
import StrategyCardList from './common/StrategyCardList/StrategyCardList';

import { useCommonStyles } from '../../../../../common.styles';
import StrategyCardSticky from './common/StrategyCardSticky/StrategyCardSticky';
import StrategyCardContentFlexible from './StrategyCardContentFlexible/StrategyCardContentFlexible';

const StrategyCardContent = ({ strategy }) => {
    const commonStyles = useCommonStyles();

    const resolveContent = () => {
        switch (strategy.name) {
            case 'default':
            case 'flexibleRollout':
                return <StrategyCardContentFlexible strategy={strategy} />;
            case 'userWithId':
            default:
                return null;
        }
    };

    const dummyData = [
        { contextName: 'environment', operator: 'IN', values: ['test'] },
        {
            contextName: 'environment',
            operator: 'IN',
            values: ['prod', 'production', 'test', 'dev', 'prod'],
        },
    ];

    return resolveContent();
};

export default StrategyCardContent;
