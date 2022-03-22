import {
    ICreateSegmentPayload,
    IUpdateSegmentPayload,
} from 'interfaces/segment';
import useAPI from '../useApi/useApi';

export const useSegmentsApi = () => {
    const { makeRequest, createRequest, errors, loading } = useAPI({
        propagateErrors: true,
    });
    const PATH = 'api/admin/segments';

    const createSegment = async (segment: ICreateSegmentPayload) => {
        const req = createRequest(PATH, {
            method: 'POST',
            body: JSON.stringify(segment),
        });

        return makeRequest(req.caller, req.id);
    };

    const updateSegment = async (segment: IUpdateSegmentPayload) => {
        const req = createRequest(`${PATH}/${segment.id}`, {
            method: 'PUT',
            body: JSON.stringify(segment),
        });

        return makeRequest(req.caller, req.id);
    };

    const deleteSegment = async (id: number) => {
        const req = createRequest(`${PATH}/${id}`, {
            method: 'DELETE',
        });

        return makeRequest(req.caller, req.id);
    };

    return { createSegment, deleteSegment, updateSegment, errors, loading };
};
