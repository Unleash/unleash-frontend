import { Button } from '@material-ui/core';
import {
    FiberManualRecordOutlined,
    FiberManualRecord,
} from '@material-ui/icons';
import ConditionallyRender from 'component/common/ConditionallyRender';
import Constraint from 'component/common/Constraint/Constraint';
import Input from 'component/common/Input/Input';
import { IConstraint } from 'interfaces/strategy';
import { Fragment } from 'react';
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

    const renderStepCount = () => {
        if (FORMURLPART === 'part-one') return 1;
        return 2;
    };

    const calculatePosition = () => {
        if (FORMURLPART === 'part-one') {
            return '0';
        }

        return 20;
    };

    const renderCircles = () => {
        return (
            <>
                <FiberManualRecord className={styles.emptyCircle} />
                <FiberManualRecord className={styles.emptyCircle} />
                <FiberManualRecord
                    style={{
                        position: 'absolute',
                        left: '102px',
                        transition: 'transform 0.3s ease',
                        transform: `translateX(${calculatePosition()}px)`,
                    }}
                    className={styles.filledCircle}
                />
            </>
        );
    };
    return (
        <>
            <div className={styles.stepsContainer}>
                <span className={styles.stepsText}>
                    Step {renderStepCount()} of 2
                </span>
                {renderCircles()}
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
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
                            constraints={constraints}
                            setConstraints={setConstraints}
                        >
                            {children}
                        </SegmentFormStepTwo>
                    )}
                />
            </form>
        </>
    );
};
