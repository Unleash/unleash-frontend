import { getBasePath } from '../utils/format-path';
import { createPersistentGlobalState } from './usePersistentGlobalState';
import React from 'react';

export interface IEventSettings {
    showData: boolean;
}

interface IUseEventSettingsOutput {
    eventSettings: IEventSettings;
    setEventSettings: React.Dispatch<React.SetStateAction<IEventSettings>>;
}

export const useEventSettings = (): IUseEventSettingsOutput => {
    const [eventSettings, setEventSettings] = useGlobalState();

    return { eventSettings, setEventSettings };
};

const createInitialValue = (): IEventSettings => {
    return { showData: false };
};

const useGlobalState = createPersistentGlobalState<IEventSettings>(
    `${getBasePath()}:useEventSettings:v1`,
    createInitialValue()
);