import useSWR, { mutate } from 'swr';
import { useCallback } from 'react';
import { formatApiPath } from 'utils/format-path';
import handleErrorResponses from '../httpErrorResponseHandler';
import { ISegment } from 'interfaces/segment';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { IFlags } from 'interfaces/uiConfig';

export interface UseSegmentsOutput {
    segments?: ISegment[];
    refetchSegments: () => void;
    loading: boolean;
    error?: Error;
}

export const useSegments = (strategyId?: string): UseSegmentsOutput => {
    const path = formatSegmentsPath(strategyId);
    const { uiConfig } = useUiConfig();
    const { data, error } = useSWR([strategyId, uiConfig.flags], fetchSegments);

    const refetchSegments = useCallback(() => {
        mutate(path).catch(console.warn);
    }, [path]);

    return {
        segments: data,
        refetchSegments,
        loading: !error && !data,
        error,
    };
};

export const fetchSegments = async (
    strategyId?: string,
    flags?: IFlags
): Promise<ISegment[]> => {
    if (!flags?.SE) {
        return [];
    }

    return fetch(formatSegmentsPath(strategyId))
        .then(handleErrorResponses('Segments'))
        .then(res => res.json())
        .then(res => res.segments);
};

const formatSegmentsPath = (strategyId?: string): string => {
    return strategyId
        ? formatApiPath(`api/admin/segments/strategies/${strategyId}`)
        : formatApiPath('api/admin/segments');
};
