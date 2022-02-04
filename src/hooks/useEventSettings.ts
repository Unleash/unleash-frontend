import { getBasePath } from '../utils/format-path';
import { createPersistentGlobalState } from './usePersistentGlobalState';

export interface IEventSettings {
    showData: boolean;
}

const createInitialValue = (): IEventSettings => {
    return { showData: false };
};

export const useEventSettings = createPersistentGlobalState<IEventSettings>(
    `${getBasePath()}:useEventSettings:v1`,
    createInitialValue()
);
