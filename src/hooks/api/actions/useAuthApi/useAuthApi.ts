import { IUser } from '../../../../interfaces/user';
import useAPI from '../useApi/useApi';

const useAuthApi = () => {
    const { makeRequest, createRequest, errors, loading } = useAPI({
        propagateErrors: true,
    });

    const insecureLogin = async (path: string, user: IUser) => {
        console.log('insecureLogin')
        const req = createRequest(path, {
            method: 'POST',
            body: JSON.stringify(user),
        });

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    const demoLogin = async (path: string, user: IUser) => {
        console.log('demoLogin')

        const req = createRequest(path, {
            method: 'POST',
            body: JSON.stringify(user),
        });

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    const passwordLogin = async (user: IUser) => {
        const req = createRequest('auth/simple/login', {
            method: 'POST',
            body: JSON.stringify(user),
        });

        try {
            const res = await makeRequest(req.caller, req.id);
            return res;
        } catch (e) {
            throw e;
        }
    };

    return {
        insecureLogin,
        demoLogin,
        passwordLogin,
        errors,
        loading,
    };
};

export default useAuthApi;
