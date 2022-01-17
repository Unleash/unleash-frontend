import FormTemplate from '../../../common/FormTemplate/FormTemplate';
import { useHistory } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import useToast from '../../../../hooks/useToast';
import useAddUserForm from '../hooks/useAddUserForm';
import useAdminUsersApi from '../../../../hooks/api/actions/useAdminUsersApi/useAdminUsersApi';

const CreateUser = () => {
    /* @ts-ignore */
    const { setToastData, setToastApiError } = useToast();
    const { uiConfig } = useUiConfig();
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
    } = useAddUserForm();

    const { addUser, userLoading: loading } = useAdminUsersApi();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        clearErrors();
        const validName = validateName();
        const validEmail = validateEmail();

        if (validName && validEmail) {
            const payload = getAddUserPayload();
            try {
                await addUser(payload);
                history.push('/admin/user-admin');
                setToastData({
                    title: 'Team member added',
                    text: 'A new team member has been added. We’ve sent an email on your behalf to inform them of their new account and role. No further steps are required.',
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
        }/api/admin/user-admin' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getAddUserPayload(), undefined, 2)}'`;
    };

    const handleCancel = () => {
        history.push('/admin/users');
    };

    return (
        <FormTemplate
            loading={loading}
            title="Create Unleash user"
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
                submitButtonText="Add"
                clearErrors={clearErrors}
            />
        </FormTemplate>
    );
};

export default CreateUser;
