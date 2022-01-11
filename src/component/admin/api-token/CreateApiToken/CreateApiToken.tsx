import FormTemplate from '../../../common/FormTemplate/FormTemplate';
import useProjectRolesApi from '../../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';
import { useHistory } from 'react-router-dom';
import CreateApiTokenForm from '../CreateApiTokenForm/CreateApiTokenForm';
import useProjectRoleForm from '../hooks/useApiToken';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import useToast from '../../../../hooks/useToast';

const CreateApiToken = () => {
    /* @ts-ignore */
    const { setToastData, setToastApiError } = useToast();
    const { uiConfig } = useUiConfig();
    const history = useHistory();
    const {
        getProjectRolePayload,
        username,
        roleDesc,
        setUsername,
        setRoleDesc,
        errors,
        clearErrors,
    } = useProjectRoleForm();

    const { createRole, loading } = useProjectRolesApi();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
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
        history.push('/admin/roles');
    };

    return (
        <FormTemplate
            loading={loading}
            title="Create Api Token"
            description="fd"
            documentationLink="https://docs.getunleash.io/user_guide/api-token"
            formatApiCode={formatApiCode}
        >
            <CreateApiTokenForm
                username={username}
                roleDesc={roleDesc}
                setRoleDesc={setRoleDesc}
                setUsername={setUsername}                
                errors={errors}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                submitButtonText="Create"
                clearErrors={clearErrors}
            />
        </FormTemplate>
    );
};

export default CreateApiToken;
