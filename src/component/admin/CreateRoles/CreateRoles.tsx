import { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import FormTemplate from '../../common/FormTemplate/FormTemplate';
import Input from '../../common/Input/Input';
import { useStyles } from './CreateRoles.styles';
import EnvironmentPermissionAccordion from './EnvironmentPermissionAccordion/EnvironmentPermissionAccordion';
import useProjectRolePermissions from '../../../hooks/api/getters/useProjectRolePermissions/useProjectRolePermissions';
import {
    IPermission,
    IProjectRolePermissions,
} from '../../../interfaces/project';
import cloneDeep from 'lodash.clonedeep';

interface ICheckedPermission {
    [key: string]: IPermission;
}

// GET Permission endpoint

const CreateRoles = () => {
    const styles = useStyles();
    const [roleName, setRoleName] = useState('');
    const [roleDesc, setRoleDesc] = useState('');
    const [checkedPermissions, setCheckedPermissions] =
        useState<ICheckedPermission>({});
    const { permissions } = useProjectRolePermissions({
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
    });

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

    const { project, environments } = permissions;

    const renderProjectPermissions = () => {
        return project.map(permission => {
            return (
                <FormControlLabel
                    key={permission.id}
                    control={
                        <Checkbox
                            checked={
                                checkedPermissions[permission.id] ? true : false
                            }
                            onChange={() => handlePermissionChange(permission)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label={permission.displayName || 'Dummy permission'}
                />
            );
        });
    };

    const renderEnvironmentPermissions = () => {
        return environments.map(environment => {
            return (
                <EnvironmentPermissionAccordion
                    environment={environment}
                    key={environment.name}
                    checkedPermissions={checkedPermissions}
                    handlePermissionChange={handlePermissionChange}
                />
            );
        });
    };

    console.log(checkedPermissions);

    return (
        <FormTemplate
            title="Create project role"
            description="A project role can be
customised to limit access
to resources within a project"
            documentationLink="https://docs.getunleash.io/"
        >
            <div className={styles.container}>
                <Input
                    className={styles.input}
                    label="Role name"
                    value={roleName}
                    onChange={e => setRoleName(e.target.value)}
                />
                <TextField
                    className={styles.input}
                    label="Role description"
                    variant="outlined"
                    multiline
                    maxRows={4}
                    value={roleDesc}
                    onChange={e => setRoleDesc(e.target.value)}
                />
            </div>

            <h3>Project permissions</h3>
            <div className={styles.checkBoxContainer}>
                {renderProjectPermissions()}
            </div>
            <h3>Environment permissions</h3>
            <div className={styles.checkBoxContainer}>
                {renderEnvironmentPermissions()}
            </div>
        </FormTemplate>
    );
};

export default CreateRoles;
