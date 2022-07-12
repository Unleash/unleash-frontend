import useAPI from '../useApi/useApi';
import { IGroupUserModel } from 'interfaces/group';

interface ICreateGroupPayload {
    name: string;
    description: string;
    users: IGroupUserModel[];
}

export const useGroupApi = () => {
    const { makeRequest, createRequest, errors, loading } = useAPI({
        propagateErrors: true,
    });

    const createGroup = async (payload: ICreateGroupPayload) => {
        const path = `api/admin/groups`;
        const req = createRequest(path, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        try {
            const response = await makeRequest(req.caller, req.id);
            return await response.json();
        } catch (e) {
            throw e;
        }
    };

    return {
        createGroup,
        errors,
        loading,
    };
};
