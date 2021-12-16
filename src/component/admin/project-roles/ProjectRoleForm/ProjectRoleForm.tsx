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

const ProjectRoleForm = ({
    handleSubmit,
    handleCancel,
    roleName,
    roleDesc,
    setRoleName,
    setRoleDesc,
    checkedPermissions,
    handlePermissionChange,
}) => {
    const styles = useStyles();
    const { permissions } = useProjectRolePermissions({
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
    });

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
                    label={permission.displayName}
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
            <h3 className={styles.header}>Environment permissions</h3>
            <div className={styles.checkBoxContainer}>
                {renderEnvironmentPermissions()}
            </div>
            <div className={styles.buttonContainer}>
                <Button onClick={handleCancel} className={styles.cancelButton}>
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
        </form>
    );
};

export default ProjectRoleForm;
