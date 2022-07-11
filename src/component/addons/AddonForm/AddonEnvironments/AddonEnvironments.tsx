import React from 'react';
import useProjects from '../../../../hooks/api/getters/useProjects/useProjects';
import { styles as themeStyles } from 'component/common';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useEnvironments } from '../../../../hooks/api/getters/useEnvironments/useEnvironments';
interface IAddonEnvironmentProps {
    selectEnvironment: (envName: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
    selectedEnvironments: string[],
    error?: string;
}

export const AddonEnvironments = ({
                                  selectEnvironment,
                                  selectedEnvironments,
                                  error
                              }: IAddonEnvironmentProps) => {
    const { environments: availableEnvironments } = useEnvironments();
    return (
        <React.Fragment>
            <h4>Environments</h4>
            <span className={themeStyles.error}>{error}</span>
            <Grid container spacing={0}>
                {availableEnvironments.map(e => (
                    <Grid item xs={4} key={e.name}>
                        <FormControlLabel
                            control={<Checkbox checked={selectedEnvironments.includes(e.name)} onChange={selectEnvironment(e.name)} />}
                            label={e.name}
                        />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}
