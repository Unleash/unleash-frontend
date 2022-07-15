import {useEffect, useState} from 'react';
import useQueryParams from 'hooks/useQueryParams';
import {IGroup, IGroupUser, Role} from 'interfaces/group';
import {IUser} from "../../../interfaces/user";

export const useProjectAccessForm = (
    initialType = 'Member',
    initialUsers: IGroupUser[] = []
) => {
    const [type, setType] = useState(initialType);
    const [users, setUsers] = useState<IUser[]>(initialUsers);
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!type) {
            setType(initialType);
        }
    }, [type, initialType]);


    // const initialUsersStringified = JSON.stringify(initialUsers);
    //
    // useEffect(() => {
    //     setUsers(initialUsers);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [initialUsersStringified]);

    const getProjectAccessPayload = () => {
        return {
            type,
            users: users.map(({id}) => ({
                id
            })),
            groups: groups.map(({id}) => ({
                id
            })),
        };
    };

    const clearErrors = () => {
        setErrors({});
    };

    return {
        type,
        setType,
        users,
        setUsers,
        groups,
        setGroups,
        getProjectAccessPayload,
        clearErrors,
        errors,
    };
};
