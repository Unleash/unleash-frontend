import { IEnvironmentPayload } from '../../../../interfaces/environments';
import useAPI from '../useApi/useApi';

const useEnvironmentApi = () => {
    const { makeRequest, createRequest, errors, loading } = useAPI({
        propagateErrors: true,
    });

    const validateEnvName = async (envName: string) => {
        const path = `api/admin/environments/validate`;
        const req = createRequest(
            path,
            { method: 'POST', body: JSON.stringify({ name: envName }) },
            'validateEnvName'
        );

        try {
            const res = await makeRequest(req.caller, req.id, false);

            return res;
        } catch (e) {
            throw e;
        }
    };

    const createEnvironment = async (payload: IEnvironmentPayload) => {
        const path = `api/admin/environments`;
        const req = createRequest(
            path,
            { method: 'POST', body: JSON.stringify(payload) },
            'createEnvironment'
        );

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    const deleteEnvironment = async (name: string) => {
        const path = `api/admin/environments/${name}`;
        const req = createRequest(
            path,
            { method: 'DELETE' },
            'deleteEnvironment'
        );

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    return {
        validateEnvName,
        createEnvironment,
        errors,
        loading,
        deleteEnvironment,
    };
};

export default useEnvironmentApi;
