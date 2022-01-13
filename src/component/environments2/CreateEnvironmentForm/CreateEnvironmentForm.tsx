import PermissionButton from '../../common/PermissionButton/PermissionButton';
import { ADMIN } from '../../providers/AccessProvider/permissions';
import { Button } from '@material-ui/core';

import { useStyles } from './CreateEnvironmentForm.styles';
import React from 'react';
import Input from '../../common/Input/Input';
import EnvironmentTypeSelector from '../../environments/form/EnvironmentTypeSelector/EnvironmentTypeSelector';

interface ICreateEnvironmentForm {
    name: string;
    type: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setType: React.Dispatch<React.SetStateAction<string>>;
    validateEnvironmentName: (e: any) => void;
    handleSubmit: (e: any) => void;
    handleCancel: () => void;
    errors: { [key: string]: string };
    submitButtonText: string;
    clearErrors: () => void;
}

const CreateEnvironmentForm = ({
    handleSubmit,
    handleCancel,
    name,
    type,
    setName,
    setType,
    validateEnvironmentName,
    errors,
    submitButtonText,
    clearErrors,
}: ICreateEnvironmentForm) => {
    const styles = useStyles();

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formHeader}>Environment information</h3>

            <div className={styles.container}>
                <p className={styles.inputDescription}>
                    What is your environment name? (Can't be changed later)
                </p>
                <Input
                    className={styles.input}
                    label="Environment name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    error={Boolean(errors.name)}
                    errorText={errors.name}
                    onFocus={() => clearErrors()}
                    onBlur={validateEnvironmentName}
                />

                <p className={styles.inputDescription}>
                    What type of environment do you want to create?
                </p>
                <EnvironmentTypeSelector
                    onChange={e => setType(e.currentTarget.value)}
                    value={type}
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
                    {submitButtonText} environment
                </PermissionButton>
            </div>
        </form>
    );
};

export default CreateEnvironmentForm;
