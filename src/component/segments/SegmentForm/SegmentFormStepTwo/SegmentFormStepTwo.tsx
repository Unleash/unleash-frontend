import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Add, ArrowDropDown, Search } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import ConditionallyRender from 'component/common/ConditionallyRender';
import PermissionButton from 'component/common/PermissionButton/PermissionButton';
import { SidebarModal } from 'component/common/SidebarModal/SidebarModal';
import { CreateContext } from 'component/context/CreateContext/CreateContext';
import { createConstraint } from 'component/feature/FeatureStrategy/FeatureStrategyConstraints2/createConstraint';
import { CREATE_CONTEXT_FIELD } from 'component/providers/AccessProvider/permissions';
import useUnleashContext from 'hooks/api/getters/useUnleashContext/useUnleashContext';
import { IConstraint } from 'interfaces/strategy';
import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { ConstraintsList } from './ConstraintsList';
import { useStyles } from './SegmentFormStepTwo.styles';

interface ISegmentFormPartTwoProps {
    name: string;
    constraints: IConstraint[];
    setConstraints: React.Dispatch<React.SetStateAction<IConstraint[]>>;
}

export const SegmentFormStepTwo: React.FC<ISegmentFormPartTwoProps> = ({
    children,
    name,
    constraints,
    setConstraints,
}) => {
    const history = useHistory();

    const styles = useStyles();
    const { context } = useUnleashContext();
    const [open, setOpen] = useState(false);
    const contextNames = context?.map(c => c.name) ?? [];

    const onChange = (_event: any, values: string[]) => {
        if (values.length >= 1) {
            const constraint = createConstraint(values[values.length - 1]);
            setConstraints(prev => [...prev, constraint]);
        }
    };

    if (!name) {
        return <Redirect to="/segments/create/part-one" />;
    }
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
                                Start adding context fileds by selecting an
                                option from above, or you can create a new
                                context field and use it right away
                            </p>
                        </div>
                    }
                />
                <div className={styles.constraintContainer}>
                    <ConstraintsList
                        constraints={constraints}
                        setConstraints={setConstraints}
                    />
                </div>
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
