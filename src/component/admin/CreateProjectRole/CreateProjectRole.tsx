import { useState } from 'react';
import {
    Checkbox,
    FormControlLabel,
    TextField,
    Button,
} from '@material-ui/core';
import FormTemplate from '../../common/FormTemplate/FormTemplate';
import Input from '../../common/Input/Input';
import { useStyles } from './CreateProjectRole.styles';
import EnvironmentPermissionAccordion from './EnvironmentPermissionAccordion/EnvironmentPermissionAccordion';
import useProjectRolePermissions from '../../../hooks/api/getters/useProjectRolePermissions/useProjectRolePermissions';
import { IPermission } from '../../../interfaces/project';
import cloneDeep from 'lodash.clonedeep';
import useProjectRolesApi from '../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';
import PermissionButton from '../../common/PermissionButton/PermissionButton';
import { ADMIN } from '../../providers/AccessProvider/permissions';
import ConditionallyRender from '../../common/ConditionallyRender';
import { useHistory } from 'react-router-dom';
import CreateConfirm from '../../common/CreateConfirm/CreateConfirm';

interface ICheckedPermission {
    [key: string]: IPermission;
}

const CreateRoles = () => {
    const history = useHistory();
    const styles = useStyles();
    const [roleName, setRoleName] = useState('');
    const [roleDesc, setRoleDesc] = useState('');
    const [success, setSuccess] = useState(false);
    const [checkedPermissions, setCheckedPermissions] =
        useState<ICheckedPermission>({});
    const { permissions } = useProjectRolePermissions({
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
    });
    const { createRole, loading } = useProjectRolesApi();

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

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = getProjectRolePayload();
        try {
            await createRole(payload);
            setSuccess(true);
        } catch (e) {
            console.log('Something went wrong');
        }
    };

    const handleCancel = () => {
        history.push('/admin/roles');
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

    return (
        <FormTemplate
            loading={loading}
            title="Create project role"
            description="A project role can be
customised to limit access
to resources within a project"
            documentationLink="https://docs.getunleash.io/"
        >
            <ConditionallyRender
                condition={success}
                show={
                    <CreateConfirm link="/admin/roles" text={'Role created'} />
                }
                elseShow={
                    <>
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
                        <h3 className={styles.header}>Project permissions</h3>
                        <div className={styles.checkBoxContainer}>
                            {renderProjectPermissions()}
                        </div>
                        <h3 className={styles.header}>
                            Environment permissions
                        </h3>
                        <div className={styles.checkBoxContainer}>
                            {renderEnvironmentPermissions()}
                        </div>
                        <div className={styles.buttonContainer}>
                            <Button
                                onClick={handleCancel}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </Button>
                            <PermissionButton
                                onClick={handleSubmit}
                                permission={ADMIN}
                                type="submit"
                            >
                                Create role
                            </PermissionButton>
                        </div>
                    </>
                }
            />
        </FormTemplate>
    );
};

export default CreateRoles;
