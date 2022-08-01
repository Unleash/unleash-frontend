import { Button } from '@mui/material';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import React from 'react';
import { useEnvironments } from 'hooks/api/getters/useEnvironments/useEnvironments';
import useProjects from 'hooks/api/getters/useProjects/useProjects';
import GeneralSelect from 'component/common/GeneralSelect/GeneralSelect';
import Input from 'component/common/Input/Input';
import { useStyles } from './ApiTokenForm.styles';
import { SelectAllAutocomplete } from './SelectAllAutocomplete/SelectAllAutocomplete';
import { ApiTokenFormErrorType } from 'component/admin/apiToken/ApiTokenForm/useApiTokenForm';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
interface IApiTokenFormProps {
    username: string;
    type: string;
    projects: string[];
    environments: string[];
    setTokenType: (value: string) => void;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setProjects: React.Dispatch<React.SetStateAction<string[]>>;
    setEnvironments: React.Dispatch<React.SetStateAction<string[]>>;
    handleSubmit: (e: any) => void;
    handleCancel: () => void;
    errors: { [key: string]: string };
    mode: 'Create' | 'Edit';
    clearErrors: (error?: ApiTokenFormErrorType) => void;
}

const ApiTokenForm: React.FC<IApiTokenFormProps> = ({
    children,
    username,
    type,
    projects,
    environments,
    setUsername,
    setTokenType,
    setProjects,
    setEnvironments,
    handleSubmit,
    handleCancel,
    errors,
    clearErrors,
}) => {
    const TYPE_CLIENT = 'CLIENT';
    const TYPE_ADMIN = 'ADMIN';
    const { classes: styles } = useStyles();
    const { environments: availableEnvironments } = useEnvironments();
    const { projects: availableProjects } = useProjects();

    const selectableTypes = [
        { key: 'CLIENT', label: 'Client', title: 'Client SDK token' },
        { key: 'PROXY', label: 'Proxy', title: 'Proxy token' },
        { key: 'ADMIN', label: 'Admin', title: 'Admin API token' },
    ];

    const selectableProjects = availableProjects.map(project => ({
        value: project.id,
        label: project.name,
    }));

    const selectableEnvs = availableEnvironments.map(environment => ({
        value: environment.name,
        label: environment.name,
        disabled: !environment.enabled,
    }));

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.container}>
                <p className={styles.inputDescription}>
                    Who are you generating the token for?
                </p>
                <Input
                    className={styles.input}
                    value={username}
                    name="username"
                    onChange={e => setUsername(e.target.value)}
                    label="Username"
                    error={errors.username !== undefined}
                    errorText={errors.username}
                    onFocus={() => clearErrors('username')}
                    autoFocus
                />
                <p className={styles.inputDescription}>
                    What is your token type?
                </p>
                <GeneralSelect
                    options={selectableTypes}
                    value={type}
                    onChange={setTokenType}
                    label="Token Type"
                    id="api_key_type"
                    name="type"
                    IconComponent={KeyboardArrowDownOutlined}
                    fullWidth
                    className={styles.selectInput}
                />
                <p className={styles.inputDescription}>
                    Which project do you want to give access to?
                </p>
                <SelectAllAutocomplete
                    label="projects"
                    disabled={type === TYPE_ADMIN}
                    options={selectableProjects}
                    defaultValue={projects}
                    onChange={setProjects}
                    error={errors?.projects}
                    onFocus={() => clearErrors('projects')}
                />
                <p className={styles.inputDescription}>
                    Which environment should the token have access to?
                </p>
                <ConditionallyRender
                    condition={type === TYPE_CLIENT}
                    show={
                        <GeneralSelect
                            options={selectableEnvs.map(env => ({
                                key: env.label,
                                ...env,
                            }))}
                            value={environments[0]}
                            onChange={newValue => setEnvironments([newValue])}
                            label="Environment"
                            id="api_key_environment"
                            name="environment"
                            IconComponent={KeyboardArrowDownOutlined}
                            fullWidth
                            className={styles.selectInput}
                        />
                    }
                    elseShow={
                        <SelectAllAutocomplete
                            label="environments"
                            disabled={type === TYPE_ADMIN}
                            options={selectableEnvs}
                            defaultValue={environments}
                            onChange={setEnvironments}
                            error={errors?.environments}
                            onFocus={() => clearErrors('environments')}
                        />
                    }
                />
            </div>
            <div className={styles.buttonContainer}>
                {children}
                <Button onClick={handleCancel} className={styles.cancelButton}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default ApiTokenForm;
