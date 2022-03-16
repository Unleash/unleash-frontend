import { Button } from '@material-ui/core';
import ConditionallyRender from 'component/common/ConditionallyRender';
import Constraint from 'component/common/Constraint/Constraint';
import Input from 'component/common/Input/Input';
import { IConstraint } from 'interfaces/strategy';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { useStyles } from './SegmentForm.styles';
import { SegmentFormStepOne } from './SegmentFormStepOne/SegmentFormStepOne';
import { SegmentFormStepTwo } from './SegmentFormStepTwo/SegmentFormStepTwo';

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
    const history = useHistory();
    const { pathname } = useLocation();
    const FORMURLPART = pathname.substring(pathname.lastIndexOf('/') + 1);
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formHeader}>Segment information</h3>
            <Route
                path="/segments/create/part-one"
                render={() => (
                    <SegmentFormStepOne
                        name={name}
                        description={description}
                        setName={setName}
                        setDescription={setDescription}
                        errors={errors}
                        clearErrors={clearErrors}
                    />
                )}
            />
            <Route
                path="/segments/create/part-two"
                render={() => (
                    <SegmentFormStepTwo
                        name={name}
                        description={description}
                        setName={setName}
                        setDescription={setDescription}
                        errors={errors}
                        clearErrors={clearErrors}
                    />
                )}
            />
        </form>
    );
};
