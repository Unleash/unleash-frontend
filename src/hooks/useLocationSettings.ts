import { getBasePath } from '../utils/format-path';
import { createPersistentGlobalState } from './usePersistentGlobalState';

export interface ILocationSettings {
    locale: string;
}

const createInitialValue = (): ILocationSettings => {
    return { locale: navigator.language };
};

export const useLocationSettings =
    createPersistentGlobalState<ILocationSettings>(
        `${getBasePath()}:useLocationSettings:v1`,
        createInitialValue()
    );
