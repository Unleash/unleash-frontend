import useSWR, { KeyedMutator } from 'swr';
import { useMemo } from 'react';
import { IEnvironmentResponse, IEnvironment } from 'interfaces/environments';
import { formatApiPath } from 'utils/formatPath';
import handleErrorResponses from '../httpErrorResponseHandler';

interface IUseEnvironmentsOutput {
    environments: IEnvironment[];
    loading: boolean;
    error?: Error;
    mutateEnvironments: KeyedMutator<IEnvironmentResponse>;
}

export const useEnvironments = (): IUseEnvironmentsOutput => {
    const { data, error, mutate } = useSWR<IEnvironmentResponse>(
        formatApiPath(`api/admin/environments`),
        fetcher
    );

    const environments = useMemo(() => {
        return data?.environments || [];
    }, [data]);

    return {
        environments,
        mutateEnvironments: mutate,
        loading: !error && !data,
        error,
    };
};

const fetcher = (path: string): Promise<IEnvironmentResponse> => {
    return fetch(path)
        .then(handleErrorResponses('Environments'))
        .then(res => res.json());
};
