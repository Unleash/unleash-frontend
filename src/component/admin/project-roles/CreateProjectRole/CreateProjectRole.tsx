import { useState } from 'react';

import FormTemplate from '../../../common/FormTemplate/FormTemplate';
import useProjectRolesApi from '../../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';
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
        getProjectRolePayload,
        validatePermissions,
        validateName,
        errors,
        clearErrors,
    } = useProjectRoleForm();

    const [success, setSuccess] = useState(false);
    const { createRole, loading } = useProjectRolesApi();

    const handleSubmit = async e => {
        e.preventDefault();
        clearErrors();
        const validName = validateName();
        const validPermissions = validatePermissions();
        if (validName && validPermissions) {
            const payload = getProjectRolePayload();
            try {
                await createRole(payload);
                setSuccess(true);
            } catch (e) {
                console.log('Something went wrong');
            }
        }
    };

    const handleCancel = () => {
        history.push('/admin/roles');
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
                        errors={errors}
                        handleSubmit={handleSubmit}
                        handleCancel={handleCancel}
                        roleName={roleName}
                        setRoleName={setRoleName}
                        roleDesc={roleDesc}
                        setRoleDesc={setRoleDesc}
                        checkedPermissions={checkedPermissions}
                        handlePermissionChange={handlePermissionChange}
                        submitButtonText="Create"
                        clearErrors={clearErrors}
                    />
                }
            />
        </FormTemplate>
    );
};

export default CreateProjectRole;
