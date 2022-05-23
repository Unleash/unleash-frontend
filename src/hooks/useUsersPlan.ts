import { IUser } from 'interfaces/user';
import { useMemo } from 'react';
import { useInstanceStatus } from './api/getters/useInstanceStatus/useInstanceStatus';

export interface IUsersPlanOutput {
    planUsers: IUser[];
    isBilling: boolean;
}

export const useUsersPlan = (users: IUser[]): IUsersPlanOutput => {
    const { instanceStatus, isBilling } = useInstanceStatus();

    const planUsers = useMemo(
        () => computeUsers(users, isBilling, instanceStatus?.seats),
        [users, isBilling, instanceStatus?.seats]
    );

    return {
        planUsers,
        isBilling,
    };
};

const computeUsers = (
    users: IUser[],
    isBilling: boolean,
    seats: number = 0
) => {
    if (!isBilling || !seats) return users;

    users
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        .forEach((user, i) => {
            user.paid = i >= seats;
        });

    return users;
};
