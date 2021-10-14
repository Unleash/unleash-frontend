import useSWR, { mutate } from 'swr';
import { useState, useEffect } from 'react';
import { formatApiPath } from '../../../../utils/format-path';
import { ITag } from '../../../../interfaces/tags';
import handleErrorResponses from '../httpErrorResponseHandler';

const useTags = (featureId: string) => {
    const fetcher = async () => {
        const path = formatApiPath(`api/admin/features/${featureId}/tags`);
        const res = await fetch(path, {
            method: 'GET',
        }).then(handleErrorResponses);
        return res.json();
    };

    const KEY = `api/admin/features/${featureId}/tags`;

    const { data, error } = useSWR(KEY, fetcher);
    const [loading, setLoading] = useState(!error && !data);

    const refetch = () => {
        mutate(KEY);
    };

    useEffect(() => {
        setLoading(!error && !data);
    }, [data, error]);

    return {
        tags: (data?.tags as ITag[]) || [],
        error,
        loading,
        refetch,
    };
};

export default useTags;
