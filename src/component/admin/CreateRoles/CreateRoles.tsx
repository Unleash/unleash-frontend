import { useState } from 'react';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import FormTemplate from '../../common/FormTemplate/FormTemplate';
import Input from '../../common/Input/Input';
import { useStyles } from './CreateRoles.styles';
import useRolePermissions from '../../../hooks/api/getters/useRolePermissions/useRolePermissions';
import { useEffect } from 'react-router/node_modules/@types/react';
import EnvironmentPermissionAccordion from './EnvironmentPermissionAccordion/EnvironmentPermissionAccordion';

// GET Permission endpoint

const CreateRoles = () => {
    const { permissions } = useRolePermissions();

    const { project, environments } = permissions;

    const renderProjectPermissions = () => {
        return project.map(permission => {
            return (
                <FormControlLabel
                    key={permission.id}
                    control={
                        <Checkbox
                            checked={true}
                            onChange={() => {}}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label={permission.displayName}
                />
            );
        });
    };

    const renderEnvironmentPermissions = () => {
        return environments.map(environment => {
            console.log(environment);
            return (
                <EnvironmentPermissionAccordion
                    environment={environment}
                    key={environment.name}
                />
            );
        });
    };

    const styles = useStyles();
    return (
        <FormTemplate
            title="Create project role"
            description="A project role can be
customised to limit access
to resources within a project"
            documentationLink="https://docs.getunleash.io/"
        >
            <div className={styles.container}>
                <Input
                    className={styles.input}
                    label="Role name"
                    value=""
                    onChange={() => {}}
                />
                <TextField
                    className={styles.input}
                    label="Role description"
                    variant="outlined"
                    multiline
                    maxRows={4}
                    value=""
                    onChange={() => {}}
                />
            </div>

            <h3>Project permissions</h3>
            <div className={styles.checkBoxContainer}>
                {renderProjectPermissions()}
            </div>
            <h3>Environment permissions</h3>
            <div className={styles.checkBoxContainer}>
                {renderEnvironmentPermissions()}
            </div>
        </FormTemplate>
    );
};

export default CreateRoles;
