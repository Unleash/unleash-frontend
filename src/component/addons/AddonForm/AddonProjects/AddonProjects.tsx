import React from 'react';
import useProjects from '../../../../hooks/api/getters/useProjects/useProjects';
import { styles as themeStyles } from 'component/common';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
interface IAddonProjectsProps {
    setProject: (projectName: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
    selectedProjects: string[],
    error?: string;
}

export const AddonProjects = ({
    setProject,
    selectedProjects,
    error
}: IAddonProjectsProps) => {
    const { projects: availableProjects } = useProjects();
    return (
        <React.Fragment>
            <h4>Projects</h4>
            <span className={themeStyles.error}>{error}</span>
            <Grid container spacing={0}>
                {availableProjects.map(p => (
                    <Grid item xs={4} key={p.id}>
                        <FormControlLabel
                            control={<Checkbox checked={selectedProjects.includes(p.id)} onChange={setProject(p.id)} />}
                            label={p.name}
                        />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}
