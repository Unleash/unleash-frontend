import { createPersistentGlobalStateHook } from 'hooks/usePersistentGlobalState';
import { getBasePath } from 'utils/formatPath';

interface IFeedbackCESSeen {
    [path: string]: boolean | undefined;
}

export const useFeedbackCESSeen =
    createPersistentGlobalStateHook<IFeedbackCESSeen>(
        `${getBasePath()}:useFeedbackCESSeen:v1`,
        {}
    );
