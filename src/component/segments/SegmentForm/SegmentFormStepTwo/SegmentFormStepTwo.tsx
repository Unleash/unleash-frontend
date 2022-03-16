import { Button } from '@material-ui/core';
import Input from 'component/common/Input/Input';
import { useHistory } from 'react-router-dom';
import { useStyles } from './SegmentFormStepTwo.styles';

interface ISegmentFormPartTwoProps {
    name: string;
    description: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    errors: { [key: string]: string };
    clearErrors: () => void;
}

export const SegmentFormStepTwo: React.FC<ISegmentFormPartTwoProps> = ({
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
            <div className={styles.container}>
                TO DO: 
                Constraint input with contexts
            </div>

            <div className={styles.buttonContainer}>
                <Button
                    type="button"
                    onClick={() => {
                        history.push('/segments/create/part-one');
                    }}
                    className={styles.backButton}
                >
                    Back
                </Button>
                <Button
                    type="button"
                    onClick={() => {
                        history.push('/segments/create/part-two');
                    }}
                    className={styles.cancelButton}
                >
                    Next
                </Button>
                <Button type="button" className={styles.cancelButton}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};
