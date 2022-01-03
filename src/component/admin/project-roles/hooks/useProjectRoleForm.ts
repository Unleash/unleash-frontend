import { useEffect, useState } from 'react';
import { IPermission } from '../../../../interfaces/project';
import cloneDeep from 'lodash.clonedeep';
import useProjectRolePermissions from '../../../../hooks/api/getters/useProjectRolePermissions/useProjectRolePermissions';
import useProjectRolesApi from '../../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';

export interface ICheckedPermission {
    [key: string]: IPermission;
}

export const PROJECT_CHECK_ALL_KEY = 'check-all-project';
export const ENVIRONMENT_CHECK_ALL_KEY = 'check-all-environment';

const useProjectRoleForm = (
    initialRoleName = '',
    initialRoleDesc = '',
    initialCheckedPermissions = {}
) => {
    const { permissions } = useProjectRolePermissions({
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
    });
    const [roleName, setRoleName] = useState(initialRoleName);
    const [roleDesc, setRoleDesc] = useState(initialRoleDesc);
    const [checkedPermissions, setCheckedPermissions] =
        useState<ICheckedPermission>(initialCheckedPermissions);
    const [errors, setErrors] = useState({});

    const { validateRole } = useProjectRolesApi();

    useEffect(() => {
        setRoleName(initialRoleName);
    }, [initialRoleName]);

    useEffect(() => {
        setRoleDesc(initialRoleDesc);
    }, [initialRoleDesc]);

    useEffect(() => {
        const formattedInitialCheckedPermissions =
            isAllEnvironmentPermissionsCheckedInitially(
                isAllProjectPermissionsCheckedInitially(
                    initialCheckedPermissions
                )
            );
        console.log("Setting initial?", formattedInitialCheckedPermissions);
        setCheckedPermissions(formattedInitialCheckedPermissions || {});
        /* eslint-disable-next-line */
    }, [Object.keys(initialCheckedPermissions).length]);

    const isAllProjectPermissionsCheckedInitially =
        initialCheckedPermissions => {
            const { project } = permissions;
            if (!project || project.length === 0) return;
            const isAllChecked = project.every(permission => {
                return initialCheckedPermissions[getRoleKey(permission)];
            });

            if (isAllChecked) {
                initialCheckedPermissions[PROJECT_CHECK_ALL_KEY] = true;
            }

            return initialCheckedPermissions;
        };

    const isAllEnvironmentPermissionsCheckedInitially =
        initalCheckedPermissions => {
            const { environments } = permissions;
            if (!environments || environments.length === 0) return;
            environments.forEach(env => {
                const isAllChecked = env.permissions.every(permission => {
                    return initialCheckedPermissions[getRoleKey(permission)];
                });

                const key = `${ENVIRONMENT_CHECK_ALL_KEY}-${env.name}`;

                if (isAllChecked) {
                    initialCheckedPermissions[key] = true;
                }
            });
            console.log("Env initial", initialCheckedPermissions)
            return initialCheckedPermissions;
        };

    const handlePermissionChange = (permission: IPermission, type) => {
        const { id } = permission;
        const checkedPermissionsCopy = cloneDeep(checkedPermissions);
        if (checkedPermissionsCopy[getRoleKey(permission)]) {
            delete checkedPermissionsCopy[getRoleKey(permission)];
            if (type === 'project') {
                delete checkedPermissionsCopy[PROJECT_CHECK_ALL_KEY];
            } else {
                delete checkedPermissionsCopy[
                    `${ENVIRONMENT_CHECK_ALL_KEY}-${type}`
                ];
            }
        } else {
            console.log("Setting", permission)
            checkedPermissionsCopy[getRoleKey(permission)] = { ...permission };
        }
        setCheckedPermissions(checkedPermissionsCopy);
    };

    const checkAllProjectPermissions = () => {
        const { project } = permissions;
        const checkedPermissionsCopy = cloneDeep(checkedPermissions);
        const checkedAll = checkedPermissionsCopy[PROJECT_CHECK_ALL_KEY];
        project.forEach((permission, index) => {
            const lastItem = project.length - 1 === index;
            if (checkedAll) {
                if (checkedPermissionsCopy[getRoleKey(permission)]) {
                    delete checkedPermissionsCopy[getRoleKey(permission)];
                }

                if (lastItem) {
                    delete checkedPermissionsCopy[PROJECT_CHECK_ALL_KEY];
                }
            } else {
                checkedPermissionsCopy[getRoleKey(permission)] = { ...permission };

                if (lastItem) {
                    checkedPermissionsCopy[PROJECT_CHECK_ALL_KEY] = true;
                }
            }
        });

        setCheckedPermissions(checkedPermissionsCopy);
    };

    const checkAllEnvironmentPermissions = (envName: string) => {
        const { environments } = permissions;
        const checkedPermissionsCopy = cloneDeep(checkedPermissions);
        const environmentCheckAllKey = `${ENVIRONMENT_CHECK_ALL_KEY}-${envName}`;
        const env = environments.find(env => env.name === envName);
        if (!env) return;
        const checkedAll = checkedPermissionsCopy[environmentCheckAllKey];

        env.permissions.forEach((permission, index) => {
            const lastItem = env.permissions.length - 1 === index;
            if (checkedAll) {
                if (checkedPermissionsCopy[getRoleKey(permission)]) {
                    delete checkedPermissionsCopy[getRoleKey(permission)];
                }

                if (lastItem) {
                    delete checkedPermissionsCopy[environmentCheckAllKey];
                }
            } else {
                checkedPermissionsCopy[getRoleKey(permission)] = { ...permission };

                if (lastItem) {
                    checkedPermissionsCopy[environmentCheckAllKey] = true;
                }
            }
        });

        setCheckedPermissions(checkedPermissionsCopy);
    };

    const getProjectRolePayload = () => {
        const permissions = Object.keys(checkedPermissions).map(permission => {
            return checkedPermissions[permission];
        });
        return {
            name: roleName,
            description: roleDesc,
            permissions,
        };
    };
    const NAME_EXISTS_ERROR =
        'BadRequestError: There already exists a role with the name';
    const validateNameUniqueness = async () => {
        const payload = getProjectRolePayload();

        try {
            await validateRole(payload);
        } catch (e) {
            if (e.toString().includes(NAME_EXISTS_ERROR)) {
                setErrors(prev => ({
                    ...prev,
                    name: 'There already exists a role with this role name',
                }));
            }
        }
    };

    const validateName = () => {
        if (roleName.length === 0) {
            setErrors(prev => ({ ...prev, name: 'Name can not be empty.' }));
            return false;
        }
        return true;
    };

    const validatePermissions = () => {
        if (Object.keys(checkedPermissions).length === 0) {
            setErrors(prev => ({
                ...prev,
                permissions: 'You must include at least one permission.',
            }));
            return false;
        }
        return true;
    };

    const clearErrors = () => {
        setErrors({});
    };

    const getRoleKey = (permission: { id: number; environment?: string; }): string => {
        return permission.environment ? `${permission.id}-${permission.environment}` : `${permission.id}`
    }

    return {
        roleName,
        roleDesc,
        setRoleName,
        setRoleDesc,
        handlePermissionChange,
        checkAllProjectPermissions,
        checkAllEnvironmentPermissions,
        checkedPermissions,
        getProjectRolePayload,
        validatePermissions,
        validateName,
        clearErrors,
        validateNameUniqueness,
        errors,
        getRoleKey,
    };
};

export default useProjectRoleForm;
