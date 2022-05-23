import {
    IInstanceStatus,
    InstancePlan,
    InstanceState,
} from 'interfaces/instance';
import { useApiGetter } from 'hooks/api/getters/useApiGetter/useApiGetter';
import { formatApiPath } from 'utils/formatPath';
import { isLocalhostDomain } from 'utils/env';

export interface IUseInstanceStatusOutput {
    instanceStatus?: IInstanceStatus;
    refetchInstanceStatus: () => void;
    isBilling: boolean;
    extendTrial: () => Promise<void>;
    loading: boolean;
    error?: Error;
}

export const useInstanceStatus = (): IUseInstanceStatusOutput => {
    const { data, refetch, loading, error } = useApiGetter(
        'useInstanceStatus',
        fetchInstanceStatus
    );

    return {
        instanceStatus: data,
        refetchInstanceStatus: refetch,
        isBilling: data?.plan === InstancePlan.PRO,
        extendTrial: async () => {
            if (data?.state === InstanceState.TRIAL && !data?.trialExtended) {
                await fetch(formatApiPath('api/instance/extend'), {
                    method: 'POST',
                });
                await refetch();
            }
        },
        loading,
        error,
    };
};

const fetchInstanceStatus = async (): Promise<IInstanceStatus> => {
    if (!enableInstanceStatusBarFeature()) {
        return UNKNOWN_INSTANCE_STATUS;
    }

    const res = await fetch(formatApiPath('api/instance/status'));

    if (!res.ok) {
        return UNKNOWN_INSTANCE_STATUS;
    }

    return res.json();
};

// TODO(olav): Enable instance status bar feature outside of localhost.
const enableInstanceStatusBarFeature = () => {
    return isLocalhostDomain();
};

export const UNKNOWN_INSTANCE_STATUS: IInstanceStatus = {
    plan: InstancePlan.UNKNOWN,
};
