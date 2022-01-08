import FormTemplate from '../../../common/FormTemplate/FormTemplate';
import { useHistory, useParams } from 'react-router-dom';
import CreateFeatureForm from '../CreateFeatureForm/CreateFeatureForm';
import useCreateFeatureForm from '../hooks/useCreateFeatureForm';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';
import useToast from '../../../../hooks/useToast';
import useFeatureApi from '../../../../hooks/api/actions/useFeatureApi/useFeatureApi';
import {
    FormControl,
    ListSubheader,
    MenuItem,
    Select,
} from '@material-ui/core';
import { GitHub, KeyboardArrowDownOutlined } from '@material-ui/icons';
import { useStyles } from '../CreateFeature/CreateFeature.styles';
import { useState } from 'react';
import useFeature from '../../../../hooks/api/getters/useFeature/useFeature';
import { IFeatureViewParams } from '../../../../interfaces/params';
import * as jsonpatch from 'fast-json-patch';

const EditFeature = () => {
    /* @ts-ignore */
    const styles = useStyles();
    const { setToastData, setToastApiError } = useToast();
    const { uiConfig } = useUiConfig();
    const history = useHistory();
    const [sdk, setSdk] = useState('java');
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { patchFeatureToggle, loading } = useFeatureApi();
    const { feature } = useFeature(projectId, featureId);

    const {
        type,
        setType,
        name,
        setName,
        project,
        setProject,
        description,
        setDescription,
        getTogglePayload,
        validateName,
        clearErrors,
        errors,
    } = useCreateFeatureForm(
        feature?.name,
        feature?.type,
        feature?.project,
        feature?.description
    );

    const createPatch = () => {
        const comparison = { ...feature, type, description };
        const patch = jsonpatch.compare(feature, comparison);
        return patch;
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        clearErrors();
        await validateName(name);
        const patch = createPatch();
        try {
            await patchFeatureToggle(project, featureId, patch);
            history.push(`/projects/${project}/features2/${name}`);
            setToastData({
                title: 'Toggle updated successfully',
                text: 'Now you can start using your toggle.',
                type: 'success',
            });
        } catch (e) {
            setToastApiError(e.toString());
        }
    };

    const SDKs = {
        java: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-java',
            code: `unleash.isEnabled("${name}")`,
        },
        php: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-php',
            code: `$unleash->isEnabled('${name}'`,
        },
        python: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-python',
            code: `client.is_enabled("${name}")`,
        },
        dotnet: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-dotnet',
            code: `unleash.IsEnabled("${name}")`,
        },
        ruby: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-ruby',
            code: `if UNLEASH.is_enabled? "${name}", @unleash_context
            puts "AwesomeFeature is enabled"
          end`,
        },
        node: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-node',
            code: `const isEnabled = unleash.isEnabled('${name}');`,
        },
        go: {
            type: 'backend',
            github: 'https://github.com/Unleash/unleash-client-go',
            code: `unleash.IsEnabled("${name}")`,
        },
        javascript: {
            type: 'frontend',
            github: 'https://github.com/Unleash/unleash-proxy-client-js',
            code: `unleash.on('ready', () => {
                if (unleash.isEnabled('${name}')) {
                  console.log('${name} is enabled');
                } else {
                  console.log('${name} is disabled');
                }
              })`,
        },
        ios: {
            type: 'frontend',
            github: 'https://github.com/Unleash/unleash-proxy-client-swift',
            code: `if unleash.isEnabled(name: ${name}) { 
                // do something
            } else {
               // do something else
            }`,
        },
        android: {
            type: 'frontend',
            github: 'https://github.com/Unleash/unleash-android-proxy-sdk',
            code: '..',
        },
        react: {
            type: 'frontend',
            github: 'https://github.com/Unleash/proxy-client-react',
            code: `
            import { useFlag } from '@unleash/proxy-client-react';

            const TestComponent = () => {
              const enabled = useFlag('${name}');
            
              if (enabled) {
                return <SomeComponent />
              }
              return <AnotherComponent />
            };
            
            export default TestComponent;`,
        },
    };

    const formatApiCode = () => {
        return `curl --location --request PATCH '${
            uiConfig.unleashUrl
        }/api/admin/projects/${projectId}/features/${featureId}' \\
    --header 'Authorization: INSERT_API_KEY' \\
    --header 'Content-Type: application/json' \\
    --data-raw '${JSON.stringify(getTogglePayload(), undefined, 2)}'`;
    };

    const handleCancel = () => {
        history.goBack();
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
                    <FormControl
                        variant="outlined"
                        size="small"
                        classes={{ root: styles.customOutline }}
                    >
                        <h4 className={styles.inputDescription}>SDK Usage</h4>
                        <Select
                            value={sdk}
                            className={styles.select}
                            IconComponent={KeyboardArrowDownOutlined}
                            inputProps={{
                                classes: {
                                    icon: styles.iconSelect,
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
                project={project}
                description={description}
                setType={setType}
                setName={setName}
                setProject={setProject}
                setDescription={setDescription}
                SDKs={SDKs}
                sdkSelect={sdk}
                errors={errors}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                submitButtonText="Edit"
                clearErrors={clearErrors}
            />
        </FormTemplate>
    );
};

export default EditFeature;
