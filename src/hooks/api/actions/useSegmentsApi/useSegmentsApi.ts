import { ISegmentPayload } from 'interfaces/segment';
import useAPI from '../useApi/useApi';
import { fetchSegments } from 'hooks/api/getters/useSegments/useSegments';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';

export const useSegmentsApi = () => {
    const { uiConfig } = useUiConfig();

    const { makeRequest, createRequest, errors, loading } = useAPI({
        propagateErrors: true,
    });

    const createSegment = async (segment: ISegmentPayload) => {
        const req = createRequest(formatSegmentsPath(), {
            method: 'POST',
            body: JSON.stringify(segment),
        });

        return makeRequest(req.caller, req.id);
    };

    const updateSegment = async (
        segmentId: number,
        segment: ISegmentPayload
    ) => {
        const req = createRequest(formatSegmentPath(segmentId), {
            method: 'PUT',
            body: JSON.stringify(segment),
        });

        return makeRequest(req.caller, req.id);
    };

    const deleteSegment = async (segmentId: number) => {
        const req = createRequest(formatSegmentPath(segmentId), {
            method: 'DELETE',
        });
        return makeRequest(req.caller, req.id);
    };

    const addSegmentToStrategy = async (
        segmentId: number,
        strategyId: string
    ) => {
        const req = createRequest(formatStrategyPath(segmentId, strategyId), {
            method: 'POST',
        });
        return makeRequest(req.caller, req.id);
    };

    const removeSegmentFromStrategy = async (
        segmentId: number,
        strategyId: string
    ) => {
        const req = createRequest(formatStrategyPath(segmentId, strategyId), {
            method: 'DELETE',
        });
        return makeRequest(req.caller, req.id);
    };

    const setStrategySegments = async (
        strategyId: string,
        segmentIds: number[]
    ) => {
        const currentSegments = await fetchSegments(strategyId, uiConfig.flags);
        const currentIds = currentSegments.map(segment => segment.id);
        const removeIds = currentIds.filter(id => !segmentIds.includes(id));
        const addIds = segmentIds.filter(id => !currentIds.includes(id));

        await Promise.all([
            ...removeIds.map(id => removeSegmentFromStrategy(id, strategyId)),
            ...addIds.map(id => addSegmentToStrategy(id, strategyId)),
        ]);
    };

    return {
        createSegment,
        deleteSegment,
        updateSegment,
        setStrategySegments,
        errors,
        loading,
    };
};

const formatSegmentsPath = (): string => {
    return 'api/admin/segments';
};

const formatSegmentPath = (segmentId: number): string => {
    return `${formatSegmentsPath()}/${segmentId}`;
};

const formatStrategyPath = (segmentId: number, strategyId: string): string => {
    return `${formatSegmentPath(segmentId)}/strategies/${strategyId}`;
};
