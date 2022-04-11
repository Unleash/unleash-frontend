import { IUser } from '../interfaces/user';
import React, { useMemo } from 'react';
import { getBasePath } from 'utils/formatPath';
import { createPersistentGlobalStateHook } from './usePersistentGlobalState';

type UsersSortType = 'created' | 'name' | 'role';

interface IUsersSort {
    type: UsersSortType;
    desc?: boolean;
}

export interface IUsersSortOutput {
    sort: IUsersSort;
    sorted: IUser[];
    setSort: React.Dispatch<React.SetStateAction<IUsersSort>>;
}

export interface IUsersFilterSortOption {
    type: UsersSortType;
    name: string;
}

// Store the users sort state globally, and in localStorage.
// When changing the format of IUsersSort, change the version as well.
const useUsersSortState = createPersistentGlobalStateHook<IUsersSort>(
    `${getBasePath()}:useUsersSort:v1`,
    { type: 'created' }
);

export const useUsersSort = (users: IUser[]): IUsersSortOutput => {
    const [sort, setSort] = useUsersSortState();

    const sorted = useMemo(() => {
        return sortUsers(users, sort);
    }, [users, sort]);

    return {
        setSort,
        sort,
        sorted,
    };
};

export const createUsersFilterSortOptions = (): IUsersFilterSortOption[] => {
    return [
        { type: 'created', name: 'Created' },
        { type: 'name', name: 'Name' },
        { type: 'role', name: 'Role' },
    ];
};

const sortAscendingUsers = (users: IUser[], sort: IUsersSort): IUser[] => {
    switch (sort.type) {
        case 'created':
            return sortByCreated(users);
        case 'name':
            return sortByName(users);
        case 'role':
            return sortByRole(users);
        default:
            console.error(`Unknown feature sort type: ${sort.type}`);
            return users;
    }
};

const sortUsers = (users: IUser[], sort: IUsersSort): IUser[] => {
    const sorted = sortAscendingUsers(users, sort);

    if (sort.desc) {
        return [...sorted].reverse();
    }

    return sorted;
};

const sortByCreated = (users: Readonly<IUser[]>): IUser[] => {
    return [...users].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
};

const sortByName = (users: Readonly<IUser[]>): IUser[] => {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
};

const sortByRole = (users: Readonly<IUser[]>): IUser[] => {
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
};
