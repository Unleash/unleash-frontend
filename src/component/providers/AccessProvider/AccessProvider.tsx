import { ReactNode } from "react";
import AccessContext from '../../../contexts/AccessContext';
import { ADMIN } from './permissions';
import { useAuth } from "../../../hooks/api/getters/useAuth/useAuth";
import { IPermission } from '../../../interfaces/user';

interface IAccessProviderProps {
    children: ReactNode
    permissions?: IPermission[]
}

const AccessProvider = (props: IAccessProviderProps) => {
    const { auth } = useAuth()
    const permissions = props.permissions ?? auth?.permissions ?? []

    const isAdminHigherOrder = () => {
        let called = false;
        let result = false;

        return () => {
            if (called) return result;
            result = permissions.some(
                (p) => p.permission === ADMIN
            );

            if (permissions.length > 0) {
                called = true;
            }
        };
    };

    const isAdmin = isAdminHigherOrder();

    const hasAccess = (
        permission: string,
        project: string,
        environment?: string
    ) => {
        const result = permissions.some((p) => {
            if (p.permission === ADMIN) {
                return true;
            }

            if (
                p.permission === permission &&
                (p.project === project || p.project === '*') &&
                (p.environment === environment || p.environment === '*')
            ) {
                return true;
            }

            if (
                p.permission === permission &&
                (p.project === project || p.project === '*') &&
                p.environment === null
            ) {
                return true;
            }

            if (
                p.permission === permission &&
                p.project === undefined &&
                p.environment === null
            ) {
                return true;
            }

            return false;
        });

        return result;
    };

    const context = { hasAccess, isAdmin };

    return (
        <AccessContext.Provider value={context}>
            {props.children}
        </AccessContext.Provider>
    );
};

export default AccessProvider;
