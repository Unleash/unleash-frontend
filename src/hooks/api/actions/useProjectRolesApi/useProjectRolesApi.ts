import { IPermission } from '../../../../interfaces/project';
import useAPI from '../useApi/useApi';

interface ICreateRolePayload {
    name: string;
    description: string;
    permissions: IPermission[];
}

const useProjectRolesApi = () => {
    const { makeRequest, createRequest, errors, loading } = useAPI({
        propagateErrors: true,
    });

    const createRole = async (payload: ICreateRolePayload) => {
        const path = `api/admin/roles`;
        const req = createRequest(path, {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        try {
            const res = await makeRequest(req.caller, req.id);

            return res;
        } catch (e) {
            throw e;
        }
    };

    return {
        createRole,
        errors,
        loading,
    };
};

export default useProjectRolesApi;
