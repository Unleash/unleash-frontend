import useSWR from 'swr';
import { useMemo } from 'react';
import { formatApiPath } from 'utils/formatPath';
import handleErrorResponses from '../httpErrorResponseHandler';
import { IGroup } from 'interfaces/group';

export interface IUseGroupOutput {
    group?: IGroup;
    refetchGroup: () => void;
    loading: boolean;
    error?: Error;
}

export const useGroup = (groupId: string): IUseGroupOutput => {
    const { data, error, mutate } = useSWR(
        formatApiPath(`api/admin/groups/${groupId}`),
        fetcher
    );

    return useMemo(
        () => ({
            group: data,
            loading: !error && !data,
            refetchGroup: () => mutate(),
            error,
        }),
        [data, error, mutate]
    );
};

const fetcher = (path: string) => {
    return fetch(path)
        .then(handleErrorResponses('Group'))
        .then(res => res.json());
};
