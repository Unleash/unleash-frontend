import { ReactElement, ReactNode, useCallback, useMemo } from 'react';
import AccessContext, { IAccessContext } from '../../../contexts/AccessContext';
import { useAuth } from '../../../hooks/api/getters/useAuth/useAuth';
import { ADMIN } from './permissions';
import { IPermission } from '../../../interfaces/user';

interface IAccessProviderProps {
    children: ReactNode;
    permissions: IPermission[];
}

const AccessProvider = (props: IAccessProviderProps): ReactElement => {
    const { auth } = useAuth();
    const permissions = props.permissions ?? auth?.permissions;

    const isAdmin: boolean = useMemo(() => {
        return checkAdmin(permissions);
    }, [permissions]);

    const hasAccess = useCallback(
        (permission: string, project?: string, environment?: string) => {
            return checkPermissions(
                permissions,
                permission,
                project,
                environment
            );
        },
        [permissions]
    );

    const value: IAccessContext = useMemo(
        () => ({
            isAdmin,
            hasAccess,
        }),
        [isAdmin, hasAccess]
    );

    return (
        <AccessContext.Provider value={value}>
            {props.children}
        </AccessContext.Provider>
    );
};

const checkAdmin = (permissions: IPermission[] | undefined): boolean => {
    if (!permissions) {
        return false;
    }

    return permissions.some(p => {
        return p.permission === ADMIN;
    });
};

const checkPermissions = (
    permissions: IPermission[] | undefined,
    permission: string,
    project?: string,
    environment?: string
): boolean => {
    if (!permissions) {
        return false;
    }

    return permissions.some(p => {
        return checkPermission(p, permission, project, environment);
    });
};

const checkPermission = (
    p: IPermission,
    permission: string,
    project?: string,
    environment?: string
): boolean => {
    if (!permission) {
        console.warn(`Missing permission for AccessProvider: ${permission}`)
        return false
    }

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

    return (
        p.permission === permission &&
        p.project === undefined &&
        p.environment === null
    );
};

export default AccessProvider;
