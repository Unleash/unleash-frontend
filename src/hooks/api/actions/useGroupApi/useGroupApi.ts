import useAPI from '../useApi/useApi';
import { IGroupUser } from 'interfaces/group';

interface ICreateGroupPayload {
    name: string;
    description: string;
    users: IGroupUser[];
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
            return await makeRequest(req.caller, req.id);
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
