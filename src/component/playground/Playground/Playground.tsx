import { FormEventHandler, useEffect, useState, VFC } from 'react';
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

interface IPlaygroundProps {}

export const Playground: VFC<IPlaygroundProps> = () => {
    const theme = useTheme();
    const [environment, onSetEnvironment] = useState<string>('');
    const [projects, onSetProjects] = useState<string[]>([]);
    const [context, setContext] = useState<string>();
    const [contextObject, setContextObject] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any | undefined>();
    const { setToastData } = useToast();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Load initial values from URL
        try {
            const environmentFromUrl = searchParams.get('environment');
            if (environmentFromUrl) {
                onSetEnvironment(environmentFromUrl);
            }
            const projectsFromUrl = searchParams.get('projects');
            if (projectsFromUrl) {
                onSetProjects(projectsFromUrl.split(','));
            }
            const contextFromUrl = searchParams.get('context');
            if (contextFromUrl) {
                setContext(decodeURI(contextFromUrl));
            }
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

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            setContextObject(JSON.parse(context || '{}'));
            // TODO: API integration
            // const result = await openApiAdmin.getPlayground({
            //     playgroundRequestSchema: {
            //         context,
            //         projects
            //         environment
            //     },
            // });

            // Set URL search parameters
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

            // Display results
            setResults({
                input: {
                    context: contextObject as any,
                    environment,
                    projects,
                },
                toggles: [
                    // FIXME: mock
                    {
                        isEnabled: true,
                        name: 'mock',
                        projectId: 'default',
                        variant: {
                            name: 'variant',
                            enabled: true,
                            payload: { type: 'string', value: 'test' },
                        },
                    },
                    {
                        isEnabled: false,
                        name: 'test',
                        projectId: 'default',
                        variant: null,
                    },
                    {
                        isEnabled: false,
                        name: 'playground',
                        projectId: 'default',
                        variant: {
                            name: 'option',
                            enabled: true,
                            payload: { type: 'string', value: '123' },
                        },
                    },
                    {
                        isEnabled: true,
                        name: 'dx',
                        projectId: 'default',
                        variant: null,
                    },
                    {
                        isEnabled: false,
                        name: 'new-context',
                        projectId: 'playground',
                        variant: null,
                    },
                ],
            });
        } catch (error: unknown) {
            setToastData({
                type: 'error',
                title: `Error parsing context: ${formatUnknownError(error)}`,
            });
        }

        setLoading(false);
    };

    return (
        <PageContent header={<PageHeader title="Unleash playground" />}>
            <Paper
                elevation={0}
                sx={{
                    px: 4,
                    py: 3,
                    mb: 4,
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
                        setEnvironment={onSetEnvironment}
                        setProjects={onSetProjects}
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
                condition={Boolean(contextObject)}
                show={<ContextBanner context={contextObject as any} />}
            />

            <PlaygroundResultsTable
                loading={loading}
                features={results?.toggles}
            />
        </PageContent>
    );
};
