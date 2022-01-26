import Input from '../../common/Input/Input';
import { TextField, Button, Switch, Chip, Typography } from '@material-ui/core';
import { useStyles } from './ContextForm.styles';
import React, { useState } from 'react';
import { Add } from '@material-ui/icons';
import { trim } from '../../common/util';

interface IContextForm {
    contextName: string;
    contextDesc: string;
    legalValues: Array<string>;
    stickiness: boolean;
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
}

const ContextForm: React.FC<IContextForm> = ({
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
    setStickiness,
    errors,
    mode,
    validateNameUniqueness,
    setErrors,
    clearErrors,
}) => {
    const styles = useStyles();
    const [value, setValue] = useState('');
    const [valueFocus, setValueFocus] = useState(false);

    const handleKeydown = e => {
        e.stopPropagation();
        if (e.key === 'Enter' && valueFocus) {
            addLegalValue();
            return;
        } else if (e.key === 'Enter') {
            submit(e);
        }
    };

    const submit = e => {
        e.preventDefault();

        if (valueFocus) {
            return;
        }
        handleSubmit(e);
    };

    const handleKeydown = e => {
        e.stopPropagation();
        if (e.key === 'Enter' && valueFocus) {
            addLegacontexlValue();
            return;
        } else if (e.key === 'Enter' && valueFocus === false) {
            submit(e);
        }
    };

    const submit = e => {
        if (valueFocus) {
            return;
        }
        handleSubmit(e);
    };

    const sortIgnoreCase = (a, b) => {
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
                    What is your context name?
                </p>
                <Input
                    className={styles.input}
                    label="Context name"
                    value={contextName}
                    onChange={e => setContextName(e.target.value)}
                    error={Boolean(errors.name)}
                    errorText={errors.name}
                    onFocus={() => clearErrors()}
                    onBlur={validateNameUniqueness}
                />
                <p className={styles.inputDescription}>
                    What is this context for?
                </p>
                <TextField
                    className={styles.input}
                    label="Context description"
                    variant="outlined"
                    multiline
                    maxRows={4}
                    value={contextDesc}
                    onChange={e => setContextDesc(e.target.value)}
                />
                <p className={styles.inputDescription}>
                    Which values do you want to allow?
                </p>
                {legalValues.map((value, index) => {
                    return (
                        <Chip
                            key={index + value}
                            label={value}
                            className={styles.tagValue}
                            onDelete={() => removeLegalValue(index)}
                            title="Remove value"
                        />
                    );
                })}
                <div className={styles.tagContainer}>
                    <TextField
                        label="Value"
                        name="value"
                        className={styles.tagInput}
                        value={value}
                        error={Boolean(errors.tag)}
                        helperText={errors.tag}
                        onKeyDown={e => handleKeydown(e)}
                        variant="outlined"
                        size="small"
<<<<<<< Updated upstream:src/component/context2/ContextForm/ContextForm.tsx
                        onKeyDown={e => {
                            handleKeydown(e);
                        }}
=======
>>>>>>> Stashed changes:src/component/context/ContextForm/ContextForm.tsx
                        onChange={e => setValue(trim(e.target.value))}
                        onFocus={() => setValueFocus(true)}
                        onBlur={() => setValueFocus(false)}
                    />
                    <Button
                        startIcon={<Add />}
                        onClick={addLegalValue}
                        variant="contained"
                        color="primary"
                    >
                        Add
                    </Button>
                </div>
                <h4>Custom stickiness (beta)</h4>
                <p className={styles.input}>
                    By enabling stickiness on this context field you can use it
                    together with the flexible-rollout strategy. This will
                    guarantee a consistent behavior for specific values of this
                    context field. PS! Not all client SDK's support this feature
                    yet!{' '}
                    <a
                        href="https://docs.getunleash.io/advanced/stickiness"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Read more
                    </a>
                </p>
                <div className={styles.flexRow}>
                    <Switch
                        label="Allow stickiness"
                        checked={stickiness}
                        value={stickiness}
                        onChange={() => setStickiness(!stickiness)}
                    />
                    <Typography>{stickiness ? 'On' : 'Off'}</Typography>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <Button onClick={handleCancel} className={styles.cancelButton}>
                    Cancel
                </Button>
                {children}
            </div>
        </form>
    );
};

export default ContextForm;
