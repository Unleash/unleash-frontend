import { useMemo, useState, VFC } from 'react';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { useEnvironments } from 'hooks/api/getters/useEnvironments/useEnvironments';
import useProjects from 'hooks/api/getters/useProjects/useProjects';
// import { useFeatures } from 'hooks/api/getters/useFeatures/useFeatures';

interface IPlaygroundConnectionFieldsetProps {}

interface IOption {
    label: string;
    id: string;
}

const allOption: IOption = { label: 'ALL', id: '*' };

export const PlaygroundConnectionFieldset: VFC<
    IPlaygroundConnectionFieldsetProps
> = () => {
    const { environments } = useEnvironments();
    const environmentOptions = useMemo(
        () =>
            environments
                .filter(({ enabled }) => Boolean(enabled))
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(({ name }) => name),
        [environments]
    );

    const { projects: availableProjects = [] } = useProjects();
    const projectsOptions = useMemo(
        () => [
            allOption,
            ...availableProjects.map(({ name: label, id }) => ({
                label,
                id,
            })),
        ],
        [availableProjects]
    );
    const [projects, setProjects] = useState<IOption | IOption[]>(allOption);
    // const { features = [] } = useFeatures();
    // const featureFlagsOptions = [
    //     allOption,
    //     ...features.map(({ name: label }) => ({ label, id: label })),
    // ];

    return (
        <Box component="fieldset" sx={{ border: 'none', m: 0, p: 0, pb: 4 }}>
            <Typography variant="body2" sx={{ my: 2 }}>
                Access configuration
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Autocomplete
                    disablePortal
                    id="environment"
                    options={environmentOptions}
                    sx={{ minWidth: 300 }}
                    renderInput={params => (
                        <TextField {...params} label="Environment" required />
                    )}
                    size="small"
                />
                <Autocomplete
                    disablePortal
                    id="projects"
                    multiple={Array.isArray(projects)}
                    options={projectsOptions}
                    sx={{ minWidth: 300 }}
                    renderInput={params => (
                        <TextField {...params} label="Projects" />
                    )}
                    defaultValue={allOption}
                    size="small"
                    value={projects}
                    onChange={(event, value, reason) => {
                        console.log('onChange', { reason, value });
                        if (reason === 'clear' || value === null) {
                            return setProjects(allOption);
                        }
                        if (Array.isArray(value)) {
                            if (value.length === 0) {
                                return setProjects(allOption);
                            }
                            if (
                                value.find(({ id }) => id === allOption.id) !==
                                undefined
                            ) {
                                return setProjects(allOption);
                            }
                            return setProjects(value);
                        }
                        if (value.id === allOption.id) {
                            return setProjects(allOption);
                        }

                        return setProjects([value]);
                    }}
                />
                {/* <Autocomplete
                    disablePortal
                    id="feature-flags"
                    multiple
                    options={featureFlagsOptions}
                    sx={{ minWidth: 300 }}
                    renderInput={params => (
                        <TextField {...params} label="Feature flags" />
                    )}
                    size="small"
                /> */}
            </Box>
        </Box>
    );
};
