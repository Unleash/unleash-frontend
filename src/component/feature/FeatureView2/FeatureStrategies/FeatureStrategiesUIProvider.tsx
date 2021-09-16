import { FC, useState } from 'react';
import FeatureStrategiesUIContext from '../../../../contexts/FeatureStrategiesUIContext';

const FeatureStrategiesUIProvider: FC = ({ children }) => {
    const [configureNewStrategy, setConfigureNewStrategy] = useState(false);
    const [activeEnvironment, setActiveEnvironment] = useState(null);

    const context = {
        configureNewStrategy,
        setConfigureNewStrategy,
        setActiveEnvironment,
        activeEnvironment,
    };

    return (
        <FeatureStrategiesUIContext.Provider value={context}>
            {children}
        </FeatureStrategiesUIContext.Provider>
    );
};

export default FeatureStrategiesUIProvider;
