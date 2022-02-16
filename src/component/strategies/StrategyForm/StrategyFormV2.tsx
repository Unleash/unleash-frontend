import Input from '../../common/Input/Input';
import { TextField, Button, Switch, Chip, Typography } from '@material-ui/core';
import { useStyles } from './StrategyForm.styles';
import React, { useState } from 'react';
import { Add } from '@material-ui/icons';
import { trim } from '../../common/util';
import ConditionallyRender from '../../common/ConditionallyRender';
import { styles as commonStyles, FormButtons } from '../../common';
import StrategyParameters from './StrategyParameters/StrategyParameters';

interface IContextForm {
    contextName: string;
    contextDesc: string;
    legalValues: Array<string>;
    stickiness: boolean;
    description: string;
    setContextName: React.Dispatch<React.SetStateAction<string>>;
    setContextDesc: React.Dispatch<React.SetStateAction<string>>;
    setStickiness: React.Dispatch<React.SetStateAction<boolean>>;
    setLegalValues: React.Dispatch<React.SetStateAction<string[]>>;
    handleSubmit: (e: any) => void;
    handleCancel: () => void;
    errors: { [key: string]: string };
    mode: string;
    clearErrors: () => void;
    validateNameUniqueness: () => void;
    setErrors: React.Dispatch<React.SetStateAction<Object>>;
    params?: [];
}

const ENTER = 'Enter';

export const StrategyFormV2: React.FC<IContextForm> = ({
    children,
    handleSubmit,
    handleCancel,
    contextName,
    contextDesc,
    legalValues,
    stickiness,
    setContextName,
    setContextDesc,
    setLegalValues,
    description,
    setDescription,
    setStickiness,
    errors,
    mode,
    validateNameUniqueness,
    setErrors,
    clearErrors,
}) => {
    const styles = useStyles();
    const params = [];
    const updateParameter = () => {};
    const [value, setValue] = useState('');
    const [focused, setFocused] = useState(false);
    const editMode = false;

    const submit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (focused) return;
        handleSubmit(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === ENTER && focused) {
            addLegalValue();
            return;
        } else if (event.key === ENTER) {
            handleSubmit(event);
        }
    };

    const sortIgnoreCase = (a: string, b: string) => {
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a === b) return 0;
        if (a > b) return 1;
        return -1;
    };

    const addLegalValue = () => {
        clearErrors();
        if (!value) {
            return;
        }

        if (legalValues.indexOf(value) !== -1) {
            setErrors(prev => ({
                ...prev,
                tag: 'Duplicate legal value',
            }));
            return;
        }
        setLegalValues(prev => [...prev, trim(value)].sort(sortIgnoreCase));
        setValue('');
    };
    const removeLegalValue = (index: number) => {
        const filteredValues = legalValues.filter((_, i) => i !== index);
        setLegalValues([...filteredValues]);
    };

    return (
        <form onSubmit={submit} className={styles.form}>
            <h3 className={styles.formHeader}>Context information</h3>

            <div className={styles.container}>
                <p className={styles.inputDescription}>
                    What would you like your
                </p>
                <TextField
                    className={styles.input}
                    label="Strategy name"
                    name="name"
                    placeholder=""
                    disabled={editMode}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    onChange={e => {
                        clearErrors();
                        setName(trim(e.target.value));
                    }}
                    value={name}
                    variant="outlined"
                    size="small"
                />
                <p className={styles.inputDescription}>
                    What is your context name?
                </p>
                <TextField
                    className={styles.input}
                    multiline
                    rows={2}
                    label="Description"
                    name="description"
                    placeholder=""
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    variant="outlined"
                    size="small"
                />

                <StrategyParameters
                    input={params}
                    count={params.length}
                    updateParameter={updateParameter}
                />
                <Button
                    onClick={e => {
                        e.preventDefault();
                        appParameter();
                    }}
                    startIcon={<Add />}
                >
                    Add parameter
                </Button>

                <ConditionallyRender
                    condition={editMode || true}
                    show={
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ display: 'block' }}
                        >
                            Update
                        </Button>
                    }
                    elseShow={
                        <FormButtons
                            submitText={'Create'}
                            onCancel={handleCancel}
                        />
                    }
                />
            </div>
        </form>
    );
};
