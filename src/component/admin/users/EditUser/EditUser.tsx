import FormTemplate from '../../../common/FormTemplate/FormTemplate';
import { useHistory, useParams } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';
import useAddUserForm from '../hooks/useAddUserForm';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import useToast from '../../../../hooks/useToast';
import useUsers from '../../../../hooks/api/getters/useUsers/useUsers';
import useAdminUsersApi from '../../../../hooks/api/actions/useAdminUsersApi/useAdminUsersApi';

const EditUser = () => {
    const { uiConfig } = useUiConfig();
    const { setToastData, setToastApiError } = useToast();
    const { users } = useUsers();
    const { id } = useParams();
    const user = users.find(user => user.id === id);

    const { updateUser, userLoading: loading } = useAdminUsersApi();
    const history = useHistory();
    const {
        name,
        setName,
        email,
        setEmail,
        sendEmail,
        setSendEmail,
        rootRole,
        setRootRole,
        getAddUserPayload,
        validateName,
        validateEmail,
        errors,
        clearErrors,
    } = useAddUserForm(user?.name, user?.email);

    const formatApiCode = () => {
        return `curl --location --request PUT '${
            uiConfig.unleashUrl
        }/api/admin/user-admin/${id}' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getAddUserPayload(), undefined, 2)}'`;
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const payload = getAddUserPayload();

        const validName = validateName();
        const validEmail = validateEmail();

        if (validName && validEmail) {
            try {
                await updateUser(id, payload);
                refetch();
                history.push('/admin/users');
                setToastData({
                    title: 'User role updated',
                    type: 'success',
                });
            } catch (e: any) {
                setToastApiError(e.toString());
            }
        }
    };

    const handleCancel = () => {
        history.push('/admin/users');
    };

    return (
        <FormTemplate
            loading={loading}
            title="Edit user"
            description="In order to get access to Unleash needs to have an Unleash root role as Admin, Editor or Viewer.
            You can also add the user to projects as member or owner in the specific projects."
            documentationLink="https://docs.getunleash.io/"
            formatApiCode={formatApiCode}
        >
            <UserForm
                errors={errors}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                sendEmail={sendEmail}
                setSendEmail={setSendEmail}
                rootRole={rootRole}
                setRootRole={setRootRole}
                submitButtonText="Edit"
                clearErrors={clearErrors}
            />
        </FormTemplate>
    );
};

export default EditUser;
