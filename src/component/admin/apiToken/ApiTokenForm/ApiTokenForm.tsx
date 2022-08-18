import {
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import React from 'react';
import { useEnvironments } from 'hooks/api/getters/useEnvironments/useEnvironments';
import useProjects from 'hooks/api/getters/useProjects/useProjects';
import GeneralSelect from 'component/common/GeneralSelect/GeneralSelect';
import Input from 'component/common/Input/Input';
import { useStyles } from './ApiTokenForm.styles';
import { SelectProjectInput } from './SelectProjectInput/SelectProjectInput';
import { ApiTokenFormErrorType } from 'component/admin/apiToken/ApiTokenForm/useApiTokenForm';
interface IApiTokenFormProps {
    username: string;
    type: string;
    projects: string[];
    environment?: string;
    setTokenType: (value: string) => void;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setProjects: React.Dispatch<React.SetStateAction<string[]>>;
    setEnvironment: React.Dispatch<React.SetStateAction<string | undefined>>;
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
    environment,
    setUsername,
    setTokenType,
    setProjects,
    setEnvironment,
    handleSubmit,
    handleCancel,
    errors,
    clearErrors,
}) => {
    const TYPE_ADMIN = 'ADMIN';
    const { classes: styles } = useStyles();
    const { environments } = useEnvironments();
    const { projects: availableProjects } = useProjects();

    const selectableTypes = [
        {
            key: 'CLIENT',
            label: 'CLIENT',
            title: 'For server-side SDK access or Unleash Proxy.',
        },
        {
            key: 'FRONTEND',
            label: 'FRONTEND',
            title: 'Client-side SDK connection for web or mobile.',
        },
        {
            key: 'ADMIN',
            label: 'ADMIN',
            title: 'Full access for managing Unleash.',
        },
    ];

    const selectableProjects = availableProjects.map(project => ({
        value: project.id,
        label: project.name,
    }));

    const selectableEnvs =
        type === TYPE_ADMIN
            ? [{ key: '*', label: 'ALL' }]
            : environments.map(environment => ({
                  key: environment.name,
                  label: environment.name,
                  title: environment.name,
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
                <FormControl className={styles.radioGroup}>
                    <p id="token-type" className={styles.inputDescription}>
                        What is it that you need to connect?
                    </p>
                    <RadioGroup
                        aria-labelledby="token-type"
                        defaultValue="CLIENT"
                        name="radio-buttons-group"
                        value={type}
                        onChange={(event, value) => setTokenType(value)}
                    >
                        {selectableTypes.map(({ key, label, title }) => (
                            <FormControlLabel
                                key={key}
                                value={key}
                                className={styles.radioItem}
                                control={<Radio className={styles.radio} />}
                                label={
                                    <>
                                        {label}
                                        <br />
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {title}
                                        </Typography>
                                    </>
                                }
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                <p className={styles.inputDescription}>
                    Which project do you want to give access to?
                </p>
                <SelectProjectInput
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
                <GeneralSelect
                    disabled={type === TYPE_ADMIN}
                    options={selectableEnvs}
                    value={environment}
                    onChange={setEnvironment}
                    label="Environment"
                    id="api_key_environment"
                    name="environment"
                    IconComponent={KeyboardArrowDownOutlined}
                    fullWidth
                    className={styles.selectInput}
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
