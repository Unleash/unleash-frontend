import { useEffect, useState } from 'react';
import { IPermission } from '../../../../interfaces/project';
import cloneDeep from 'lodash.clonedeep';

export interface ICheckedPermission {
    [key: string]: IPermission;
}

const useProjectRoleForm = (
    initialRoleName = '',
    initialRoleDesc = '',
    initialCheckedPermissions = {}
) => {
    const [roleName, setRoleName] = useState(initialRoleName);
    const [roleDesc, setRoleDesc] = useState(initialRoleDesc);
    const [checkedPermissions, setCheckedPermissions] =
        useState<ICheckedPermission>(initialCheckedPermissions);
    const [errors, setErrors] = useState({});

    const keys = Object.keys(initialCheckedPermissions);

    useEffect(() => {
        setRoleName(initialRoleName);
    }, [initialRoleName]);

    useEffect(() => {
        setRoleDesc(initialRoleDesc);
    }, [initialRoleDesc]);

    useEffect(() => {
        setCheckedPermissions(initialCheckedPermissions);
        /* eslint-disable-next-line */
    }, [keys.length]);

    const handlePermissionChange = (permission: IPermission) => {
        const { id } = permission;
        const checkedPermissionsCopy = cloneDeep(checkedPermissions);
        if (checkedPermissionsCopy[id]) {
            delete checkedPermissionsCopy[id];
        } else {
            checkedPermissionsCopy[id] = { ...permission };
        }
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

    return {
        roleName,
        roleDesc,
        setRoleName,
        setRoleDesc,
        handlePermissionChange,
        checkedPermissions,
        getProjectRolePayload,
        validatePermissions,
        validateName,
        clearErrors,
        errors,
    };
};

export default useProjectRoleForm;
