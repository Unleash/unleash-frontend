import PermissionButton from '../../common/PermissionButton/PermissionButton';
import { ADMIN } from '../../providers/AccessProvider/permissions';
import Input from '../../common/Input/Input';
import { TextField, Button } from '@material-ui/core';

import { useStyles } from './TagForm.styles';
import React from 'react';

interface ITagForm {
    tagName: string;
    tagDesc: string;
    setTagName: React.Dispatch<React.SetStateAction<string>>;
    setTagDesc: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: any) => void;
    handleCancel: () => void;
    errors: { [key: string]: string };
    submitButtonText: string;
    clearErrors: () => void;
}

const TagForm = ({
    handleSubmit,
    handleCancel,
    tagName,
    tagDesc,
    setTagName,
    setTagDesc,
    errors,
    submitButtonText,
    clearErrors,
}: ITagForm) => {
    const styles = useStyles();

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formHeader}>Tag information</h3>

            <div className={styles.container}>
                <p className={styles.inputDescription}>
                    What is your tag name?
                </p>
                <Input
                    className={styles.input}
                    label="Tag name"
                    value={tagName}
                    onChange={e => setTagName(e.target.value)}
                    error={Boolean(errors.name)}
                    errorText={errors.name}
                    onFocus={() => clearErrors()}
                />

                <p className={styles.inputDescription}>
                    What is this role for?
                </p>
                <TextField
                    className={styles.input}
                    label="Tag description"
                    variant="outlined"
                    multiline
                    maxRows={4}
                    value={tagDesc}
                    onChange={e => setTagDesc(e.target.value)}
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
                    {submitButtonText} type
                </PermissionButton>
            </div>
        </form>
    );
};

export default TagForm;
