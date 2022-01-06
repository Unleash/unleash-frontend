import { useEffect, useState } from 'react';

import FormTemplate from '../../../common/FormTemplate/FormTemplate';

import useProjectRolesApi from '../../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';

import { useHistory, useParams } from 'react-router-dom';
import ProjectRoleForm from '../ProjectRoleForm/ProjectRoleForm';
import useProjectRoleForm from '../hooks/useProjectRoleForm';
import useProjectRole from '../../../../hooks/api/getters/useProjectRole/useProjectRole';
import { IPermission } from '../../../../interfaces/project';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import useToast from '../../../../hooks/useToast';

const EditProjectRole = () => {
    const { uiConfig } = useUiConfig();
    const { setToastData, setToastApiError } = useToast();
    const [initialCheckedPermissions, setInitialCheckedPermissions] = useState(
        {}
    );

    const { id } = useParams();
    const { role } = useProjectRole(id);

    useEffect(() => {
        const initialCheckedPermissions = role?.permissions?.reduce(
            (acc: { [key: string]: IPermission }, curr: IPermission) => {
                acc[getRoleKey(curr)] = curr;
                return acc;
            },
            {}
        );

        setInitialCheckedPermissions(initialCheckedPermissions);
        /* eslint-disable-next-line */
    }, [role]);

    const history = useHistory();
    const {
        roleName,
        roleDesc,
        setRoleName,
        setRoleDesc,
        checkedPermissions,
        handlePermissionChange,
        checkAllProjectPermissions,
        checkAllEnvironmentPermissions,
        getProjectRolePayload,
        validatePermissions,
        validateName,
        errors,
        clearErrors,
        getRoleKey,
    } = useProjectRoleForm(
        role.name,
        role.description,
        initialCheckedPermissions
    );

    const formatApiCode = () => {
        return `curl --location --request PUT '${
            uiConfig.unleashUrl
        }/api/admin/roles/${role.id}' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getProjectRolePayload(), undefined, 2)}'`;
    };

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
                history.push('/admin/roles');
                setToastData({
                    title: 'Project role updated',
                    text: 'Your role changes will automatically be applied to the users with this role.',
                    confetti: true,
                });
            } catch (e) {
                setToastApiError(e.toString());
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
            formatApiCode={formatApiCode}
        >
            <ProjectRoleForm
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                roleName={roleName}
                setRoleName={setRoleName}
                roleDesc={roleDesc}
                setRoleDesc={setRoleDesc}
                checkedPermissions={checkedPermissions}
                handlePermissionChange={handlePermissionChange}
                checkAllProjectPermissions={checkAllProjectPermissions}
                checkAllEnvironmentPermissions={checkAllEnvironmentPermissions}
                submitButtonText="Edit"
                errors={errors}
                clearErrors={clearErrors}
                getRoleKey={getRoleKey}
            />
        </FormTemplate>
    );
};

export default EditProjectRole;
