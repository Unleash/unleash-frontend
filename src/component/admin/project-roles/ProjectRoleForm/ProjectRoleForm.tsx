import PermissionButton from '../../../common/PermissionButton/PermissionButton';
import { ADMIN } from '../../../providers/AccessProvider/permissions';
import Input from '../../../common/Input/Input';
import EnvironmentPermissionAccordion from './EnvironmentPermissionAccordion/EnvironmentPermissionAccordion';
import {
    Checkbox,
    FormControlLabel,
    TextField,
    Button,
} from '@material-ui/core';
import useProjectRolePermissions from '../../../../hooks/api/getters/useProjectRolePermissions/useProjectRolePermissions';

import { useStyles } from './ProjectRoleForm.styles';
import ConditionallyRender from '../../../common/ConditionallyRender';
import React from 'react';
import { IPermission } from '../../../../interfaces/project';
import { ICheckedPermission } from '../hooks/useProjectRoleForm';

interface IProjectRoleForm {
    roleName: string;
    roleDesc: string;
    setRoleName: React.Dispatch<React.SetStateAction<string>>;
    setRoleDesc: React.Dispatch<React.SetStateAction<string>>;
    checkedPermissions: ICheckedPermission;
    handlePermissionChange: (permission: IPermission) => void;
    checkAllProjectPermissions: () => void;
    checkAllEnvironmentPermissions: (envName: string) => void;
    handleSubmit: (e: any) => void;
    handleCancel: () => void;
    errors: { [key: string]: string };
    submitButtonText: string;
    clearErrors: () => void;
}

const ProjectRoleForm = ({
    handleSubmit,
    handleCancel,
    roleName,
    roleDesc,
    setRoleName,
    setRoleDesc,
    checkedPermissions,
    handlePermissionChange,
    checkAllProjectPermissions,
    checkAllEnvironmentPermissions,
    errors,
    submitButtonText,
    clearErrors,
}: IProjectRoleForm) => {
    const styles = useStyles();
    const { permissions } = useProjectRolePermissions({
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
    });

    const { project, environments } = permissions;

    const renderProjectPermissions = () => {
        const projectPermissions = project.map(permission => {
            return (
                <FormControlLabel
                    key={permission.id}
                    classes={{ root: styles.label }}
                    control={
                        <Checkbox
                            checked={
                                checkedPermissions[permission.id] ? true : false
                            }
                            onChange={() => handlePermissionChange(permission)}
                            color="primary"
                        />
                    }
                    label={permission.displayName}
                />
            );
        });

        projectPermissions.push(
            <FormControlLabel
                key={'check-all-project'}
                classes={{ root: styles.label }}
                control={
                    <Checkbox
                        checked={
                            checkedPermissions['check-all-project']
                                ? true
                                : false
                        }
                        onChange={() => checkAllProjectPermissions()}
                        color="primary"
                    />
                }
                label={'Check all project permissions'}
            />
        );

        return projectPermissions;
    };

    const renderEnvironmentPermissions = () => {
        return environments.map(environment => {
            return (
                <EnvironmentPermissionAccordion
                    environment={environment}
                    key={environment.name}
                    checkedPermissions={checkedPermissions}
                    handlePermissionChange={handlePermissionChange}
                    checkAllEnvironmentPermissions={
                        checkAllEnvironmentPermissions
                    }
                />
            );
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className={styles.formHeader}>Role information</h3>

            <div className={styles.container}>
                <p className={styles.inputDescription}>
                    What is your role name?
                </p>
                <Input
                    className={styles.input}
                    label="Role name"
                    value={roleName}
                    onChange={e => setRoleName(e.target.value)}
                    error={Boolean(errors.name)}
                    errorText={errors.name}
                    onFocus={() => clearErrors()}
                />

                <p className={styles.inputDescription}>
                    What is this role for?
                </p>
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
            <div className={styles.permissionErrorContainer}>
                <ConditionallyRender
                    condition={Boolean(errors.permissions)}
                    show={
                        <span className={styles.errorMessage}>
                            You must select at least one permission for a role.
                        </span>
                    }
                />
            </div>
            <h3 className={styles.header}>Project permissions</h3>
            <div>{renderProjectPermissions()}</div>
            <h3 className={styles.header}>Environment permissions</h3>
            <div>{renderEnvironmentPermissions()}</div>
            <div className={styles.buttonContainer}>
                <Button onClick={handleCancel} className={styles.cancelButton}>
                    Cancel
                </Button>
                <PermissionButton
                    onClick={handleSubmit}
                    permission={ADMIN}
                    type="submit"
                >
                    {submitButtonText} role
                </PermissionButton>
            </div>
        </form>
    );
};

export default ProjectRoleForm;
