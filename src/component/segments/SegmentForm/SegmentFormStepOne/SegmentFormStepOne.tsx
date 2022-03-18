import { Button } from '@material-ui/core';
import Input from 'component/common/Input/Input';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './SegmentFormStepOne.styles';

interface ISegmentFormPartOneProps {
    name: string;
    description: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    errors: { [key: string]: string };
    clearErrors: () => void;
}

export const SegmentFormStepOne: React.FC<ISegmentFormPartOneProps> = ({
    children,
    name,
    description,
    setName,
    setDescription,
    errors,
    clearErrors,
}) => {
    const history = useHistory();
    const styles = useStyles();

    return (
        <div className={styles.form}>
            <h3 className={styles.formHeader}>Segment information</h3>
            <div className={styles.container}>
                <p className={styles.inputDescription}>
                    What is the segment name?
                </p>
                <Input
                    className={styles.input}
                    label="Segment name*"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    error={Boolean(errors.name)}
                    errorText={errors.name}
                    onFocus={() => clearErrors()}
                    autoFocus
                />
                <p className={styles.inputDescription}>
                    What is the segment description?
                </p>
                <Input
                    className={styles.input}
                    label="Description (optional)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    error={Boolean(errors.description)}
                    errorText={errors.description}
                    onFocus={() => clearErrors()}
                />
            </div>
            <div className={styles.buttonContainer}>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        history.push('/segments/create/part-two');
                    }}
                    disabled={name.length === 0}
                >
                    Next
                </Button>
                <Button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => {
                        history.push('/segments');
                    }}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};
