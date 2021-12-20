import { useState } from 'react';

import FormTemplate from '../../../common/FormTemplate/FormTemplate';

import useProjectRolesApi from '../../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';

import ConditionallyRender from '../../../common/ConditionallyRender';
import { useHistory, useParams } from 'react-router-dom';
import CreateConfirm from '../../../common/CreateConfirm/CreateConfirm';
import ProjectRoleForm from '../ProjectRoleForm/ProjectRoleForm';
import useProjectRoleForm from '../hooks/useProjectRoleForm';
import useProjectRole from '../../../../hooks/api/getters/useProjectRole/useProjectRole';
import { IPermission } from '../../../../interfaces/project';

const EditProjectRole = () => {
    const { id } = useParams();
    const { role } = useProjectRole(id);

    const initialCheckedPermissions = role?.permissions?.reduce(
        (acc: { [key: string]: IPermission }, curr: IPermission) => {
            acc[curr.id] = curr;
            return acc;
        },
        {}
    );

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
    } = useProjectRoleForm(
        role.name,
        role.description,
        initialCheckedPermissions
    );

    const [success, setSuccess] = useState(false);
    const { refetch } = useProjectRole(id);
    const { editRole, loading } = useProjectRolesApi();

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = getProjectRolePayload();

        const validName = validateName();
        const validPermissions = validatePermissions();

        if (validName && validPermissions) {
            try {
                await editRole(id, payload);
                refetch();
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
                        submitButtonText="Edit"
                        errors={errors}
                        clearErrors={clearErrors}
                    />
                }
            />
        </FormTemplate>
    );
};

export default EditProjectRole;
