import FormTemplate from '../../../common/FormTemplate/FormTemplate';
import useProjectRolesApi from '../../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';
import { useHistory } from 'react-router-dom';
import ProjectRoleForm from '../ProjectRoleForm/ProjectRoleForm';
import useProjectRoleForm from '../hooks/useProjectRoleForm';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import useToast from '../../../../hooks/useToast';
import PermissionButton from '../../../common/PermissionButton/PermissionButton';
import { ADMIN } from '../../../providers/AccessProvider/permissions';

const CreateProjectRole = () => {
    const { setToastData, setToastApiError } = useToast();
    const { uiConfig } = useUiConfig();
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
        validateNameUniqueness,
        errors,
        clearErrors,
        getRoleKey,
    } = useProjectRoleForm();

    const { createRole, loading } = useProjectRolesApi();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        clearErrors();
        const validName = validateName();
        const validPermissions = validatePermissions();

        if (validName && validPermissions) {
            const payload = getProjectRolePayload();
            try {
                await createRole(payload);
                history.push('/admin/roles');
                setToastData({
                    title: 'Project role created',
                    text: 'Now you can start assigning your project roles to project members.',
                    confetti: true,
                    type: 'success',
                });
            } catch (e: any) {
                setToastApiError(e.toString());
            }
        }
    };

    const formatApiCode = () => {
        return `curl --location --request POST '${
            uiConfig.unleashUrl
        }/api/admin/roles' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getProjectRolePayload(), undefined, 2)}'`;
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <FormTemplate
            loading={loading}
            title="Create project role"
            description="A project role can be
            customised to limit access
            to resources within a project"
            documentationLink="https://docs.getunleash.io/how-to/how-to-create-and-assign-custom-project-roles"
            formatApiCode={formatApiCode}
        >
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
                checkAllProjectPermissions={checkAllProjectPermissions}
                checkAllEnvironmentPermissions={checkAllEnvironmentPermissions}
                mode="Create"
                clearErrors={clearErrors}
                validateNameUniqueness={validateNameUniqueness}
                getRoleKey={getRoleKey}
            >
                <PermissionButton permission={ADMIN} type="submit">
                    Create role
                </PermissionButton>
            </ProjectRoleForm>
        </FormTemplate>
    );
};

export default CreateProjectRole;
