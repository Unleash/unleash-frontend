import useAPI from 'hooks/api/actions/useApi/useApi';
import { useCallback } from 'react';

export const useSetFeatureState = () => {
    const { makeRequest, createRequest, errors } = useAPI({
        propagateErrors: true,
    });

    const setFeatureState = useCallback(
        async (
            projectId: string,
            featureName: string,
            environment: string,
            enabled: boolean
        ) => {
            const path = `api/admin/projects/${projectId}/features/${featureName}/environments/${environment}/${
                enabled ? 'on' : 'off'
            }`;
            const req = createRequest(path, { method: 'POST' });

            try {
                const res = await makeRequest(req.caller, req.id);
                return res;
            } catch (e) {
                throw e;
            }
        },
        []
    );

    return { setFeatureState, errors };
};
