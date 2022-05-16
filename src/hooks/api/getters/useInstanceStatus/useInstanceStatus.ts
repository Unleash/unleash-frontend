import { IInstanceStatus } from 'interfaces/instance';
import { useApiGetter } from 'hooks/api/getters/useApiGetter/useApiGetter';
import { formatApiPath } from 'utils/formatPath';

export interface IUseInstanceStatusOutput {
    instanceStatus?: IInstanceStatus;
    refetchInstanceStatus: () => void;
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
        loading,
        error,
    };
};

const fetchInstanceStatus = async (): Promise<IInstanceStatus> => {
    const res = await fetch(formatApiPath('api/instance/status'));

    if (!res.ok) {
        return UNKNOWN_INSTANCE_STATUS;
    }

    return res.json();
};

export const UNKNOWN_INSTANCE_STATUS: IInstanceStatus = {
    plan: 'unknown',
};
