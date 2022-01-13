import { useHistory } from 'react-router-dom';
import useCreateEnvironmentForm from '../hooks/useCreateEnvironmentForm';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
import useToast from '../../../hooks/useToast';
import useEnvironmentApi from '../../../hooks/api/actions/useEnvironmentApi/useEnvironmentApi';
import CreateEnvironmentForm from '../CreateEnvironmentForm/CreateEnvironmentForm';
import FormTemplate from '../../common/FormTemplate/FormTemplate';
import useEnvironments from '../../../hooks/api/getters/useEnvironments/useEnvironments';
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import ConditionallyRender from '../../common/ConditionallyRender';
import PageContent from '../../common/PageContent';
import HeaderTitle from '../../common/HeaderTitle';
import CreateEnvironmentSuccess from '../../environments/CreateEnvironment/CreateEnvironmentSuccess/CreateEnvironmentSuccess';
import { useState } from 'react';

const CreateEnvironment = () => {
    /* @ts-ignore */
    const { setToastApiError } = useToast();
    const { uiConfig } = useUiConfig();
    const history = useHistory();
    const [createSuccess, setCreateSucceess] = useState(false);
    const { environments } = useEnvironments();
    const canCreateMoreEnvs = environments.length < 7;
    const { createEnvironment, loading } = useEnvironmentApi();
    const {
        name,
        setName,
        type,
        setType,
        getEnvPayload,
        validateEnvironmentName,
        clearErrors,
        errors,
    } = useCreateEnvironmentForm();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        clearErrors();
        const validName = await validateEnvironmentName();
        if (validName) {
            const payload = getEnvPayload();
            try {
                await createEnvironment(payload);
                setCreateSucceess(true);
            } catch (e: any) {
                setToastApiError(e.toString());
            }
        }
    };

    const formatApiCode = () => {
        return `curl --location --request POST '${
            uiConfig.unleashUrl
        }/api/admin/environments' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getEnvPayload(), undefined, 2)}'`;
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <ConditionallyRender
            condition={createSuccess}
            show={
                <PageContent
                    headerContent={<HeaderTitle title="Create environment" />}
                >
                    <CreateEnvironmentSuccess name={name} type={type} />
                </PageContent>
            }
            elseShow={
                <ConditionallyRender
                    condition={canCreateMoreEnvs}
                    show={
                        <FormTemplate
                            loading={loading}
                            title="Create Environment"
                            description="Environments allow you to manage your 
                            product lifecycle from local development
                            through production. Your projects and
                            feature toggles are accessible in all your
                            environments, but they can take different
                            configurations per environment. This means
                            that you can enable a feature toggle in a
                            development or test environment without
                            enabling the feature toggle in the
                            production environment."
                            documentationLink="https://docs.getunleash.io/"
                            formatApiCode={formatApiCode}
                        >
                            <CreateEnvironmentForm
                                errors={errors}
                                handleSubmit={handleSubmit}
                                handleCancel={handleCancel}
                                validateEnvironmentName={
                                    validateEnvironmentName
                                }
                                name={name}
                                type={type}
                                setName={setName}
                                setType={setType}
                                submitButtonText="Create"
                                clearErrors={clearErrors}
                            />
                        </FormTemplate>
                    }
                    elseShow={
                        <>
                            <PageContent
                                headerContent={
                                    <HeaderTitle title="Create environment" />
                                }
                            >
                                <Alert severity="error">
                                    <p>
                                        Currently Unleash does not support more
                                        than 7 environments. If you need more
                                        please reach out.
                                    </p>
                                </Alert>
                                <br />
                                <Button
                                    onClick={handleCancel}
                                    variant="contained"
                                    color="primary"
                                >
                                    Go back
                                </Button>
                            </PageContent>
                        </>
                    }
                />
            }
        />
    );
};

export default CreateEnvironment;
