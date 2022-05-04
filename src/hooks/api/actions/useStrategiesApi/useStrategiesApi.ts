import { IStrategyPayload } from 'interfaces/strategy';
import useAPI from '../useApi/useApi';

const useStrategiesApi = () => {
    const { makeRequest, createRequest, errors, loading } = useAPI({
        propagateErrors: true,
    });
    const URI = 'api/admin/strategies';

    const createStrategy = async (strategy: IStrategyPayload) => {
        const req = createRequest(URI, {
            method: 'POST',
            body: JSON.stringify(strategy),
        });

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    const updateStrategy = async (strategy: IStrategyPayload) => {
        const path = `${URI}/${strategy.name}`;
        const req = createRequest(path, {
            method: 'PUT',
            body: JSON.stringify(strategy),
        });

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    const removeStrategy = async (strategy: IStrategyPayload) => {
        const path = `${URI}/${strategy.name}`;
        const req = createRequest(path, { method: 'DELETE' });

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    const deprecateStrategy = async (strategy: IStrategyPayload) => {
        const path = `${URI}/${strategy.name}/deprecate`;
        const req = createRequest(path, {
            method: 'POST',
        });

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    const reactivateStrategy = async (strategy: IStrategyPayload) => {
        const path = `${URI}/${strategy.name}/reactivate`;
        const req = createRequest(path, { method: 'POST' });

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    return {
        createStrategy,
        updateStrategy,
        removeStrategy,
        deprecateStrategy,
        reactivateStrategy,
        errors,
        loading,
    };
};

export default useStrategiesApi;
