import {
    IInstanceStatus,
    InstancePlan,
    InstanceState,
} from 'interfaces/instance';
import { useApiGetter } from 'hooks/api/getters/useApiGetter/useApiGetter';
import { formatApiPath } from 'utils/formatPath';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { useEffect } from 'react';

export interface IUseInstanceStatusOutput {
    instanceStatus?: IInstanceStatus;
    refetchInstanceStatus: () => void;
    isBilling: boolean;
    extendTrial: () => Promise<void>;
    loading: boolean;
    error?: Error;
}

export const useInstanceStatus = (): IUseInstanceStatusOutput => {
    const { uiConfig } = useUiConfig();
    const {
        flags: { UNLEASH_CLOUD },
    } = uiConfig;

    const { data, refetch, loading, error } = useApiGetter(
        `useInstanceStatus`,
        () => fetchInstanceStatus(UNLEASH_CLOUD)
    );

    useEffect(() => {
        refetch();
    }, [refetch, UNLEASH_CLOUD]);

    const billingPlans = [
        InstancePlan.PRO,
        InstancePlan.COMPANY,
        InstancePlan.TEAM,
    ];

    return {
        instanceStatus: data,
        refetchInstanceStatus: refetch,
        isBilling: billingPlans.includes(data?.plan ?? InstancePlan.UNKNOWN),
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

const fetchInstanceStatus = async (
    UNLEASH_CLOUD?: boolean
): Promise<IInstanceStatus> => {
    if (!UNLEASH_CLOUD) {
        return UNKNOWN_INSTANCE_STATUS;
    }

    const res = await fetch(formatApiPath('api/instance/status'));

    if (!res.ok) {
        return UNKNOWN_INSTANCE_STATUS;
    }

    return res.json();
};

export const UNKNOWN_INSTANCE_STATUS: IInstanceStatus = {
    plan: InstancePlan.UNKNOWN,
};
