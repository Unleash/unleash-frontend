import { Button, TextField } from '@material-ui/core';
import React from 'react';
import ConditionallyRender from '../../../common/ConditionallyRender';
import GeneralSelect from '../../../common/GeneralSelect/GeneralSelect';
import Input from '../../../common/Input/Input';
import PermissionButton from '../../../common/PermissionButton/PermissionButton';
import { ADMIN } from '../../../providers/AccessProvider/permissions';
import { useStyles } from './CreateApiTokenForm.styles';

interface ICreateApiTokenFormProps {
    username: string;
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    settype: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: any) => void;
    handleCancel: () => void;
    errors: { [key: string]: string };
    submitButtonText: string;
    clearErrors: () => void;
}
const CreateApiTokenForm = ({
    username,
    type,
    settype,
    setType,
    handleSubmit,
    handleCancel,
    errors,
    clearErrors,
    submitButtonText,
}: ICreateApiTokenFormProps) => {
    const styles = useStyles();
    const selectableTypes = [
        { key: 'CLIENT', label: 'Client', title: 'Client SDK token' },
        { key: 'ADMIN', label: 'Admin', title: 'Admin API token' },
    ];
    return (
        <form onSubmit={handleSubmit}>
            <h3 className={styles.formHeader}>Role information</h3>

            <div className={styles.container}>
                <p className={styles.inputDescription}>
                    What is your role name?
                </p>
                <Input
                    className={styles.input}
                    value={username}
                    name="username"
                    onChange={setType}
                    label="Username"
                    error={errors.username !== undefined}
                    errorText={errors.username}
                />
                <GeneralSelect
                    disabled={false}
                    options={selectableTypes}
                    value={type}
                    onChange={setType}
                    label="Token Type"
                    id="api_key_type"
                    name="type"
                />
                {/* 
                <GeneralSelect
                    disabled={false}
                    options={selectableTypes}
                    value={data.type}
                    onChange={setType}
                    label="Token Type"
                    id="api_key_type"
                    name="type"
                    className={undefined}
                    classes={undefined}
                />
                <GeneralSelect
                    disabled={data.type === TYPE_ADMIN}
                    options={selectableProjects}
                    value={data.project}
                    onChange={setProject}
                    label="Project"
                    id="api_key_project"
                    name="project"
                    className={undefined}
                    classes={undefined}
                />
                <ConditionallyRender condition={true} show={
                    <>
                        <GeneralSelect
                            disabled={data.type === TYPE_ADMIN}
                            options={selectableEnvs}
                            value={data.environment}
                            required
                            onChange={setEnvironment}
                            label="Environment"
                            id="api_key_environment"
                            name="environment"
                            className={undefined}
                            classes={undefined}
                        />
                    </>
                } /> */}

                <p className={styles.inputDescription}>
                    What is this role for?
                </p>
                <TextField
                    className={styles.input}
                    label="Role description"
                    variant="outlined"
                    multiline
                    maxRows={4}
                    value={type}
                    onChange={e => settype(e.target.value)}
                />
            </div>
            <div className={styles.permissionErrorContainer}>
                <ConditionallyRender
                    condition={Boolean(errors.permissions)}
                    show={
                        <span className={styles.errorMessage}>
                            You must select at least one permission for a role.
                        </span>
                    }
                />
            </div>
            <div className={styles.buttonContainer}>
                <Button onClick={handleCancel} className={styles.cancelButton}>
                    Cancel
                </Button>
                <PermissionButton
                    onClick={handleSubmit}
                    permission={ADMIN}
                    type="submit"
                >
                    {submitButtonText} role
                </PermissionButton>
            </div>
        </form>
    );
};

export default CreateApiTokenForm;
