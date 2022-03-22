import React, { useRef } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Add, ArrowDropDown, Search } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import ConditionallyRender from 'component/common/ConditionallyRender';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import { SidebarModal } from 'component/common/SidebarModal/SidebarModal';
import { CreateContext } from 'component/context/CreateContext/CreateContext';
import { CREATE_CONTEXT_FIELD } from 'component/providers/AccessProvider/permissions';
import useUnleashContext from 'hooks/api/getters/useUnleashContext/useUnleashContext';
import { IConstraint } from 'interfaces/strategy';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from 'component/segments/SegmentFormStepTwo/SegmentFormStepTwo.styles';
import {
    ConstraintAccordionList,
    IConstraintAccordionListRef,
} from 'component/common/ConstraintAccordion/ConstraintAccordionList/ConstraintAccordionList';
import { SegmentFormStep } from '../SegmentForm/SegmentForm';

interface ISegmentFormPartTwoProps {
    constraints: IConstraint[];
    setConstraints: React.Dispatch<React.SetStateAction<IConstraint[]>>;
    setCurrentStep: React.Dispatch<React.SetStateAction<SegmentFormStep>>;
}

export const SegmentFormStepTwo: React.FC<ISegmentFormPartTwoProps> = ({
    children,
    constraints,
    setConstraints,
    setCurrentStep,
}) => {
    const constraintsAccordionListRef = useRef<IConstraintAccordionListRef>();
    const history = useHistory();

    const styles = useStyles();
    const { context } = useUnleashContext();
    const [open, setOpen] = useState(false);
    const contextNames = context?.map(c => c.name) ?? [];

    const onChange = (_event: any, [value]: string[]) => {
        if (value) {
            constraintsAccordionListRef.current?.addConstraint(value);
        }
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
                    <div className={styles.flexContainer}>
                        <div className={styles.iconConatiner}>
                            <Search />
                        </div>
                        <Autocomplete
                            className={styles.autoComplete}
                            classes={{ inputRoot: styles.inputRoot }}
                            multiple
                            id="tags-standard"
                            options={contextNames}
                            value={[]}
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
                </div>

                <div className={styles.addContextContainer}>
                    <p className={styles.inputDescription}>
                        Or create and add a new custom context field
                    </p>
                    <SidebarModal
                        label="Create new context"
                        onClose={() => setOpen(false)}
                        open={open}
                    >
                        <CreateContext
                            onSubmit={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            modal
                        />
                    </SidebarModal>

                    <PermissionButton
                        permission={CREATE_CONTEXT_FIELD}
                        className={styles.addContextButton}
                        startIcon={<Add />}
                        onClick={() => setOpen(true)}
                    >
                        Add context field
                    </PermissionButton>
                </div>

                <ConditionallyRender
                    condition={constraints.length === 0}
                    show={
                        <div className={styles.noConstraintText}>
                            <p className={styles.subtitle}>
                                Start adding context fields by selecting an
                                option from above, or you can create a new
                                context field and use it right away
                            </p>
                        </div>
                    }
                />
                <div className={styles.constraintContainer}>
                    <ConstraintAccordionList
                        ref={constraintsAccordionListRef}
                        constraints={constraints}
                        setConstraints={setConstraints}
                    />
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <Button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className={styles.backButton}
                >
                    Back
                </Button>
                {children}
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
