import { IConstraint } from 'interfaces/strategy';
import { Route, useLocation } from 'react-router-dom';
import { useStyles } from './SegmentForm.styles';
import { SegmentFormStepOne } from '../SegmentFormStepOne/SegmentFormStepOne';
import { SegmentFormStepTwo } from '../SegmentFormStepTwo/SegmentFormStepTwo';
import React from 'react';
import { SegmentFormStepList } from 'component/segments/SegmentFormStepList/SegmentFormStepList';

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
    errors,
    clearErrors,
}) => {
    const styles = useStyles();
    const { pathname } = useLocation();

    const totalSteps = 2;
    const currentStep = pathname.endsWith('part-one') ? 1 : 2;

    return (
        <>
            <SegmentFormStepList total={totalSteps} current={currentStep} />
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
