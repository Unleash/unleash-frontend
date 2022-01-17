import Input from '../../common/Input/Input';
import { TextField, Button } from '@material-ui/core';

import { useStyles } from './TagForm.styles';
import React, { ReactElement } from 'react';

interface ITagForm {
    tagName: string;
    tagDesc: string;
    setTagName: React.Dispatch<React.SetStateAction<string>>;
    setTagDesc: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: any) => void;
    handleCancel: () => void;
    errors: { [key: string]: string };
    mode: string;
    clearErrors: () => void;
    children?: ReactElement
}

const TagForm = ({
    handleSubmit,
    handleCancel,
    tagName,
    tagDesc,
    setTagName,
    setTagDesc,
    errors,
    mode,
    clearErrors,
    children
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
                    disabled={mode === 'Edit'}
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
                {children}
            </div>
        </form>
    );
};

export default TagForm;
