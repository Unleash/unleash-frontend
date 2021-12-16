import { useState } from 'react';
import { IPermission } from '../../../../interfaces/project';
import cloneDeep from 'lodash.clonedeep';

interface ICheckedPermission {
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

    return {
        roleName,
        roleDesc,
        setRoleName,
        setRoleDesc,
        handlePermissionChange,
        checkedPermissions,
    };
};

export default useProjectRoleForm;
