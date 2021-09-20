import { FC, useState } from 'react';
import FeatureStrategiesUIContext from '../../../../contexts/FeatureStrategiesUIContext';

const FeatureStrategiesUIProvider: FC = ({ children }) => {
    const [configureNewStrategy, setConfigureNewStrategy] = useState(null);
    const [activeEnvironment, setActiveEnvironment] = useState(null);
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
