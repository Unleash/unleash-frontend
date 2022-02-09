import { FC, useEffect, useState } from 'react';

import UnleashContext from '../../../contexts/UnleashContext';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
import { UnleashClient } from 'unleash-proxy-client';

export const UnleashProvider: FC<any> = ({ children }) => {
    const { uiConfig } = useUiConfig();
    const [client, setClient] = useState();
    const [ready, setReady] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        if (uiConfig.unleashConfig) {
            if (client) return;

            const unleash = new UnleashClient({
                ...uiConfig.unleashConfig,
            });

            unleash.on('ready', () => {
                setReady(true);
            });

            unleash.on('update', () => {
                setChanged(prev => !prev);
            });

            unleash.start();
            setClient(unleash);
        }
    }, [JSON.stringify(uiConfig.unleashConfig)]);

    const isEnabled = (toggleName: string) => {
        if (!client) return false;

        return client.isEnabled(toggleName);
    };

    const context = {
        isEnabled,
        ready,
        changed,
    };

    return (
        <UnleashContext.Provider value={context}>
            {children}
        </UnleashContext.Provider>
    );
};
