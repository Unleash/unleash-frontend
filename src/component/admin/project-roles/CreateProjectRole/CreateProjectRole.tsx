import { useState } from 'react';
import {
    Checkbox,
    FormControlLabel,
    TextField,
    Button,
} from '@material-ui/core';
import FormTemplate from '../../../common/FormTemplate/FormTemplate';
import Input from '../../../common/Input/Input';
import { useStyles } from './CreateProjectRole.styles';
import EnvironmentPermissionAccordion from '../ProjectRoleForm/EnvironmentPermissionAccordion/EnvironmentPermissionAccordion';
import useProjectRolePermissions from '../../../../hooks/api/getters/useProjectRolePermissions/useProjectRolePermissions';
import { IPermission } from '../../../../interfaces/project';
import cloneDeep from 'lodash.clonedeep';
import useProjectRolesApi from '../../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';
import PermissionButton from '../../../common/PermissionButton/PermissionButton';
import { ADMIN } from '../../../providers/AccessProvider/permissions';
import ConditionallyRender from '../../../common/ConditionallyRender';
import { useHistory } from 'react-router-dom';
import CreateConfirm from '../../../common/CreateConfirm/CreateConfirm';
import ProjectRoleForm from '../ProjectRoleForm/ProjectRoleForm';
import useProjectRoleForm from '../hooks/useProjectRoleForm';

const CreateProjectRole = () => {
    const history = useHistory();
    const {
        roleName,
        roleDesc,
        setRoleName,
        setRoleDesc,
        checkedPermissions,
        handlePermissionChange,
    } = useProjectRoleForm();
    const [success, setSuccess] = useState(false);

    const { createRole, loading } = useProjectRolesApi();

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
                    <ProjectRoleForm
                        handleSubmit={handleSubmit}
                        handleCancel={handleCancel}
                        roleName={roleName}
                        setRoleName={setRoleName}
                        roleDesc={roleDesc}
                        setRoleDesc={setRoleDesc}
                        checkedPermissions={checkedPermissions}
                        handlePermissionChange={handlePermissionChange}
                    />
                }
            />
        </FormTemplate>
    );
};

export default CreateProjectRole;
