import { IUser } from 'interfaces/user';
import { useMemo } from 'react';
import { useInstanceStatus } from './api/getters/useInstanceStatus/useInstanceStatus';
import { STRIPE } from 'component/admin/billing/flags';
import { InstancePlan } from 'interfaces/instance';

export interface IUsersPlanOutput {
    planUsers: IUser[];
    isBillingUsers: boolean;
}

export const useUsersPlan = (users: IUser[]): IUsersPlanOutput => {
    const { instanceStatus } = useInstanceStatus();

    const isBillingUsers = STRIPE && instanceStatus?.plan === InstancePlan.PRO;

    const planUsers = useMemo(
        () => computeUsers(users, isBillingUsers, instanceStatus?.seats),
        [users, isBillingUsers, instanceStatus?.seats]
    );

    return {
        planUsers,
        isBillingUsers,
    };
};

const computeUsers = (
    users: IUser[],
    isBillingUsers: boolean,
    seats: number = 0
) => {
    if (!isBillingUsers || !seats) return users;

    users
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        .forEach((user, i) => {
            user.paid = i >= seats;
        });

    return users;
};
