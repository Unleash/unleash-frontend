import { Button } from '@material-ui/core';
import Input from 'component/common/Input/Input';
import { IConstraint } from 'interfaces/strategy';
import { useStyles } from './SegmentForm.styles';

interface ISegmentProps {
    name: string;
    description: string;
    constraints: IConstraint[];
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setConstraints: React.Dispatch<React.SetStateAction<IConstraint[]>>;
    handleSubmit: (e: any) => void;
    handleCancel: () => void;
    errors: { [key: string]: string };
    mode: 'Create' | 'Edit';
    clearErrors: () => void;
}
export const SegmentForm: React.FC<ISegmentProps> = ({
    children,
    name,
    description,
    constraints,
    setName,
    setDescription,
    setConstraints,
    handleSubmit,
    handleCancel,
    errors,
    mode,
    clearErrors,
}) => {
    const styles = useStyles();

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
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
                <p className={styles.inputDescription}>
                    What is the segment description?
                </p>
            </div>
            <div className={styles.buttonContainer}>
                {children}
                <Button
                    type="button"
                    onClick={handleCancel}
                    className={styles.cancelButton}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};
