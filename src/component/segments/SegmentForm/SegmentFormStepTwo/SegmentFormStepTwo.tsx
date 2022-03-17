import { Button, TextField } from '@material-ui/core';
import { Add, ArrowDropDown } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import Constraint from 'component/common/Constraint/Constraint';
import { ConstraintAccordion } from 'component/common/ConstraintAccordion/ConstraintAccordion';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import { createConstraint } from 'component/feature/FeatureStrategy/FeatureStrategyConstraints2/createConstraint';
import { createEmptyConstraint } from 'component/feature/FeatureStrategy/FeatureStrategyConstraints2/createEmptyConstraint';
import { CREATE_CONTEXT_FIELD } from 'component/providers/AccessProvider/permissions';
import useUnleashContext from 'hooks/api/getters/useUnleashContext/useUnleashContext';
import { IUnleashContextDefinition } from 'interfaces/context';
import { IConstraint } from 'interfaces/strategy';
import { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './SegmentFormStepTwo.styles';

interface ISegmentFormPartTwoProps {
    name: string;
    description: string;
    constraints: IConstraint[];
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setConstraints: React.Dispatch<React.SetStateAction<IConstraint[]>>;
    errors: { [key: string]: string };
    clearErrors: () => void;
}

export const SegmentFormStepTwo: React.FC<ISegmentFormPartTwoProps> = ({
    children,
    name,
    description,
    constraints,
    setName,
    setDescription,
    setConstraints,
    errors,
    clearErrors,
}) => {
    const history = useHistory();
    const styles = useStyles();
    const { context } = useUnleashContext();
    const [selectedContext, setSelectedContext] =
        useState<IUnleashContextDefinition[]>();
    //const constraint = createEmptyConstraint(context);
    const onChange = (_event: any, value: IUnleashContextDefinition[]) => {
        setSelectedContext(value);
        const constraint = createConstraint(value[0].name);
     //   setConstraints(prev => [...prev, constraint]);
    };

    return (
        <div className={styles.form}>
            <div className={styles.container}>
                <h3 className={styles.formHeader}>
                    Select the context fileds you want to include in the segment
                </h3>
                <div>
                    <p className={styles.inputDescription}>
                        Use a predefined context field
                    </p>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={context}
                        getOptionLabel={option => option?.name}
                        filterSelectedOptions
                        popupIcon={<ArrowDropDown />}
                        onChange={onChange}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Select a context"
                                placeholder="Select a context"
                            />
                        )}
                    />
                </div>
                <div className={styles.addContextContainer}>
                    <p className={styles.inputDescription}>
                        Or create and add a new custom context field
                    </p>

                    <PermissionButton
                        permission={CREATE_CONTEXT_FIELD}
                        className={styles.addContextButton}
                        startIcon={<Add />}
                    >
                        Add context field
                    </PermissionButton>
                </div>

                <hr className={styles.divider} />

                {constraints.map(constraint => (
                    <ConstraintAccordion
                        compact={true}
                        editing={true}
                        environmentId={'production'}
                        constraint={constraint}
                        onCancel={() => console.log('cancel')}
                        onSave={newConstraint =>
                            setConstraints(prev => [...prev, newConstraint])
                        }
                        onEdit={() => console.log('edit')}
                        onDelete={() => console.log('delete')}
                    />
                ))}
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
