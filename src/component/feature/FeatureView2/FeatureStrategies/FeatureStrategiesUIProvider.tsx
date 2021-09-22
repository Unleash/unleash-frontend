import { FC, useState } from 'react';
import FeatureStrategiesUIContext from '../../../../contexts/FeatureStrategiesUIContext';
import { IFeatureEnvironment } from '../../../../interfaces/featureToggle';
import { IStrategyPayload } from '../../../../interfaces/strategy';

const FeatureStrategiesUIProvider: FC = ({ children }) => {
    const [configureNewStrategy, setConfigureNewStrategy] =
        useState<IStrategyPayload | null>(null);
    const [activeEnvironment, setActiveEnvironment] =
        useState<IFeatureEnvironment | null>(null);
    const [expandedSidebar, setExpandedSidebar] = useState(false);

    const context = {
        configureNewStrategy,
        setConfigureNewStrategy,
        setActiveEnvironment,
        activeEnvironment,
        expandedSidebar,
        setExpandedSidebar,
    };

    return (
        <FeatureStrategiesUIContext.Provider value={context}>
            {children}
        </FeatureStrategiesUIContext.Provider>
    );
};

export default FeatureStrategiesUIProvider;
