import FormTemplate from '../../../common/FormTemplate/FormTemplate';
import { useHistory, useParams } from 'react-router-dom';
import CreateFeatureForm from '../CreateFeatureForm/CreateFeatureForm';
import useCreateFeatureForm from '../hooks/useCreateFeatureForm';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import useToast from '../../../../hooks/useToast';
import useFeatureApi from '../../../../hooks/api/actions/useFeatureApi/useFeatureApi';
import { IFeatureViewParams } from '../../../../interfaces/params';
import {
    FormControl,
    InputLabel,
    ListSubheader,
    MenuItem,
    Select,
} from '@material-ui/core';
import { GitHub, KeyboardArrowDownOutlined } from '@material-ui/icons';
import { useStyles } from './CreateFeature.styles';
import { useState } from 'react';

const CreateFeature = () => {
    /* @ts-ignore */
    const styles = useStyles();
    const { setToastData, setToastApiError } = useToast();
    const { uiConfig } = useUiConfig();
    const history = useHistory();
    const { projectId } = useParams<IFeatureViewParams>();
    const [sdk, setSdk] = useState('java');

    const {
        type,
        setType,
        name,
        setName,
        description,
        setDescription,
        getTogglePayload,
        validateName,
        clearErrors,
        errors,
    } = useCreateFeatureForm();

    const { createFeatureToggle, loading } = useFeatureApi();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        clearErrors();
        if (await validateName(name)) {
            const payload = getTogglePayload();
            try {
                await createFeatureToggle('default', payload);
                history.push('/features');
                setToastData({
                    title: 'Toggle created successfully',
                    text: 'Now you can start assigning your project roles to project members.',
                    confetti: true,
                    type: 'success',
                });
            } catch (e) {
                setToastApiError(e.toString());
            }
        }
    };

    const SDKs = {
        java: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-java',
            code: 'print hi',
        },
        php: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-php',
            code: 'print hi',
        },
        python: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-python',
            code: 'print hi',
        },
        dotnet: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-dotnet',
            code: 'print hi',
        },
        ruby: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-ruby',
            code: 'print hi',
        },
        node: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-node',
            code: 'print hi',
        },
        go: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-go',
            code: 'print hi',
        },
        javascript: {
            type: 'frontend',
            github: 'https://github.com/Unleash/unleash-proxy-client-js',
            code: 'print hi',
        },
        ios: {
            type: 'frontend',
            github: 'https://github.com/Unleash/unleash-proxy-client-swift',
            code: 'print hi',
        },
        android: {
            type: 'frontend',
            github: 'https://github.com/Unleash/unleash-android-proxy-sdk',
            code: 'print hi',
        },
        react: {
            type: 'frontend',
            github: 'https://github.com/Unleash/proxy-client-react',
            code: 'print hi',
        },
    };

    const formatApiCode = () => {
        return `curl --location --request POST '${
            uiConfig.unleashUrl
        }/api/admin/roles' \\
    --header 'Authorization: INSERT_API_KEY' \\
    --header 'Content-Type: application/json' \\
    --data-raw '${JSON.stringify(getTogglePayload(), undefined, 2)}'`;
    };

    const handleCancel = () => {
        history.push('/features');
    };

    return (
        <FormTemplate
            loading={loading}
            title="Create Feature toggle"
            description="Feature toggles support different use cases, each with their own specific needs such as simple static routing or more complex routing.
            The feature toggle is disabled when created and you decide when to enable"
            documentationLink="https://docs.getunleash.io/"
            formatApiCode={formatApiCode}
            sidebarContent={
                <>
                    <FormControl variant="outlined" size="small">
                        <InputLabel htmlFor="SDKs">SDKs</InputLabel>
                        <Select
                            value={sdk}
                            className={styles.select}
                            IconComponent={KeyboardArrowDownOutlined}
                            label="SDK"
                            inputProps={{
                                classes: {
                                    icon: styles.icon,
                                    root: styles.root,
                                },
                            }}
                            onChange={e => setSdk(e.target.value as string)}
                        >
                            <ListSubheader>Server Side SDKs</ListSubheader>
                            <MenuItem value={'java'}>Java</MenuItem>
                            <MenuItem value={'node'}>Node.js</MenuItem>
                            <MenuItem value={'go'}>Go</MenuItem>
                            <MenuItem value={'ruby'}>Ruby</MenuItem>
                            <MenuItem value={'python'}>Python</MenuItem>
                            <MenuItem value={'dotnet'}>.Net</MenuItem>
                            <MenuItem value={'php'}>PHP</MenuItem>
                            <ListSubheader>Frontend SDKs</ListSubheader>
                            <MenuItem value={'javascript'}>JavaScript</MenuItem>
                            <MenuItem value={'android'}>Android</MenuItem>
                            <MenuItem value={'ios'}>iOS Proxy</MenuItem>
                            <MenuItem value={'react'}>React Proxy</MenuItem>
                        </Select>
                    </FormControl>
                    <a
                        className={styles.link}
                        href={SDKs[sdk]?.github}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <GitHub className={styles.icon} />
                        View SDK on GitHub
                    </a>
                </>
            }
        >
            <CreateFeatureForm
                type={type}
                name={name}
                description={description}
                setType={setType}
                setName={setName}
                setDescription={setDescription}
                errors={errors}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                submitButtonText="Create"
                clearErrors={clearErrors}
            />
        </FormTemplate>
    );
};

export default CreateFeature;
