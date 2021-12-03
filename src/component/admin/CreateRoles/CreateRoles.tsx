import { useState } from 'react';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import Create from '../../common/Create/Create';
import Input from '../../common/Input/Input';
import { useStyles } from './CreateRoles.styles';

const APIPermissions = {
    project: [
        {
            permission: 'CREATE_FEATURE',
            displayName: 'Create feature',
            id: 'unique-1',
        },
        {
            permission: 'UPDATE_PROJECT',
            displayName: 'Update project',
            id: 'unique-2',
        },
        {
            permission: 'UPDATE_FEATURE_METADATA',
            displayName: 'Update feature toggle metadata',
            id: 'unique-3',
        },
    ],
    environments: [
        {
            environmentName: 'Development',
            permissions: [
                {
                    permission: 'CREATE_FEATURE_STRATEGY',
                    id: 'unique-1',
                    displayName: 'Create feature strategy',
                },
            ],
        },
        { environmentName: 'Production', permissions: [] },
        { environmentName: 'Default', permissions: [] },
    ],
};

const CreateRoles = () => {
    const [permission, setPermissions] = useState(APIPermissions);

    const { project, environments } = permission;

    const formatPermissions = () => {
        const project = APIPermissions.project.map(permission => {
            return { ...permission, checked: false };
        });
    };

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

    const styles = useStyles();
    return (
        <Create
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
        </Create>
    );
};

export default CreateRoles;
