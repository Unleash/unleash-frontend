import { useState } from 'react';

import FormTemplate from '../../../common/FormTemplate/FormTemplate';

import useProjectRolesApi from '../../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';

import ConditionallyRender from '../../../common/ConditionallyRender';
import { useHistory } from 'react-router-dom';
import CreateConfirm from '../../../common/CreateConfirm/CreateConfirm';
import ProjectRoleForm from '../ProjectRoleForm/ProjectRoleForm';
import useProjectRoleForm from '../hooks/useProjectRoleForm';

const EditProjectRole = () => {
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

    const { editRole, loading } = useProjectRolesApi();

    const handleSubmit = async e => {
        e.preventDefault();
        //const payload = getProjectRolePayload();
        try {
            await editRole();
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
            title="Edit project role"
            description="A project role can be
customised to limit access
to resources within a project"
            documentationLink="https://docs.getunleash.io/"
        >
            <ConditionallyRender
                condition={success}
                show={
                    <CreateConfirm link="/admin/roles" text={'Role updated'} />
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

export default EditProjectRole;
