import { FormEventHandler, useEffect, useState, useCallback, VFC } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Box,
    Button,
    Divider,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { PlaygroundConnectionFieldset } from './PlaygroundConnectionFieldset/PlaygroundConnectionFieldset';
import { PlaygroundCodeFieldset } from './PlaygroundCodeFieldset/PlaygroundCodeFieldset';
import useToast from 'hooks/useToast';
import { formatUnknownError } from 'utils/formatUnknownError';
import { PlaygroundResultsTable } from './PlaygroundResultsTable/PlaygroundResultsTable';
import { ContextBanner } from './PlaygroundResultsTable/ContextBanner/ContextBanner';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import usePlaygroundApi from 'hooks/api/actions/usePlayground/usePlayground';
import { PlaygroundResponseSchema } from 'hooks/api/actions/usePlayground/playground.model';
import { useEnvironments } from 'hooks/api/getters/useEnvironments/useEnvironments';
import { IEnvironment } from 'interfaces/environments';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

const resolveProjects = (projects: string[] | string): string[] | string => {
    return !projects ||
        projects.length === 0 ||
        (projects.length === 1 && projects[0] === '*')
        ? '*'
        : projects;
};

const resolveDefaultEnvironment = (environmentOptions: IEnvironment[]) => {
    const options = getEnvironmentOptions(environmentOptions);
    if (options.length > 0) {
        return options[0];
    }
    return '';
};

const getEnvironmentOptions = (environments: IEnvironment[]) => {
    return environments
        .filter(({ enabled }) => Boolean(enabled))
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(({ name }) => name);
};

export const Playground: VFC<{}> = () => {
    const theme = useTheme();
    const { environments } = useEnvironments();

    const [environment, setEnvironment] = useState<string>('');
    const [projects, setProjects] = useState<string[]>([]);
    const [context, setContext] = useState<string>();
    const [results, setResults] = useState<
        PlaygroundResponseSchema | undefined
    >();
    const { setToastData } = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const { evaluatePlayground, loading } = usePlaygroundApi();

    useEffect(() => {
        setEnvironment(resolveDefaultEnvironment(environments));
    }, [environments]);

    useEffect(() => {
        // Load initial values from URL
        try {
            const environmentFromUrl = searchParams.get('environment');
            if (environmentFromUrl) {
                setEnvironment(environmentFromUrl);
            }

            let projectsArray: string[];
            let projectsFromUrl = searchParams.get('projects');
            if (projectsFromUrl) {
                projectsArray = projectsFromUrl.split(',');
                setProjects(projectsArray);
            }

            let contextFromUrl = searchParams.get('context');
            if (contextFromUrl) {
                contextFromUrl = decodeURI(contextFromUrl);
                setContext(contextFromUrl);
            }

            const makePlaygroundRequest = async () => {
                if (environmentFromUrl && contextFromUrl) {
                    await evaluatePlaygroundContext(
                        environmentFromUrl,
                        projectsArray || '*',
                        contextFromUrl
                    );
                }
            };

            makePlaygroundRequest();
        } catch (error) {
            setToastData({
                type: 'error',
                title: `Failed to parse URL parameters: ${formatUnknownError(
                    error
                )}`,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const evaluatePlaygroundContext = async (
        environment: string,
        projects: string[] | string,
        context: string | undefined,
        action?: () => void
    ) => {
        try {
            const parsedContext = JSON.parse(context || '{}');
            const response = await evaluatePlayground({
                environment,
                projects: resolveProjects(projects),
                context: {
                    appName: 'playground',
                    ...parsedContext,
                },
            });

            if (action && typeof action === 'function') {
                action();
            }

            setResults(response);
        } catch (error: unknown) {
            setToastData({
                type: 'error',
                title: `Error parsing context: ${formatUnknownError(error)}`,
            });
        }
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault();

        await evaluatePlaygroundContext(
            environment,
            projects,
            context,
            setURLParameters
        );
    };

    const setURLParameters = () => {
        searchParams.set('context', encodeURI(context || '')); // always set because of native validation
        searchParams.set('environment', environment);
        if (
            Array.isArray(projects) &&
            projects.length > 0 &&
            !(projects.length === 1 && projects[0] === '*')
        ) {
            searchParams.set('projects', projects.join(','));
        } else {
            searchParams.delete('projects');
        }
        setSearchParams(searchParams);
    };

    const onCodeFieldChange = useCallback(value => {
        setContext(value);
    }, []);

    return (
        <PageContent
            header={<PageHeader title="Unleash playground" />}
            disableLoading
            bodyClass={'no-padding'}
        >
            <Paper
                elevation={0}
                sx={{
                    px: 4,
                    py: 3,
                    mb: 4,
                    m: 4,
                    background: theme.palette.grey[200],
                }}
            >
                <Box component="form" onSubmit={onSubmit}>
                    <Typography
                        sx={{
                            mb: 3,
                        }}
                    >
                        Configure playground
                    </Typography>
                    <PlaygroundConnectionFieldset
                        environment={environment}
                        projects={projects}
                        setEnvironment={setEnvironment}
                        setProjects={setProjects}
                        environmentOptions={getEnvironmentOptions(environments)}
                    />
                    <Divider
                        variant="fullWidth"
                        sx={{
                            mb: 2,
                            borderColor: theme.palette.dividerAlternative,
                            borderStyle: 'dashed',
                        }}
                    />
                    <PlaygroundCodeFieldset
                        value={context}
                        setValue={setContext}
                    />
                    <CodeMirror
                        value={context}
                        height="200px"
                        extensions={[json()]}
                        onChange={onCodeFieldChange}
                    />
                    <Divider
                        variant="fullWidth"
                        sx={{
                            mt: 3,
                            mb: 2,
                            borderColor: theme.palette.dividerAlternative,
                        }}
                    />
                    <Button variant="contained" size="large" type="submit">
                        Try configuration
                    </Button>
                </Box>
            </Paper>
            <ConditionallyRender
                condition={Boolean(results)}
                show={
                    <>
                        <Divider />
                        <ContextBanner
                            environment={
                                (results as PlaygroundResponseSchema)?.input
                                    ?.environment
                            }
                            projects={
                                (results as PlaygroundResponseSchema)?.input
                                    ?.projects
                            }
                            context={
                                (results as PlaygroundResponseSchema)?.input
                                    ?.context
                            }
                        />
                    </>
                }
            />

            <PlaygroundResultsTable
                loading={loading}
                features={results?.features}
            />
        </PageContent>
    );
};
