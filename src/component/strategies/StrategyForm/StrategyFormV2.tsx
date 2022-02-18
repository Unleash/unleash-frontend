import Input from '../../common/Input/Input';
import { Button } from '@material-ui/core';
import { useStyles } from './StrategyForm.styles';
import React from 'react';
import { Add } from '@material-ui/icons';
import { trim } from '../../common/util';
import { StrategyParameters } from './StrategyParameters/StrategyParameters';

interface IParameter {
    name: string;
    description: string;
    required: boolean;
    type: string;
}
interface IStrategyForm {
    strategyName: string;
    strategyDesc: string;
    params: IParameter[];
    setStrategyName: React.Dispatch<React.SetStateAction<string>>;
    setStrategyDesc: React.Dispatch<React.SetStateAction<string>>;
    setParams: React.Dispatch<React.SetStateAction<IParameter[]>>;
    handleSubmit: (e: any) => void;
    handleCancel: () => void;
    errors: { [key: string]: string };
    mode: string;
    clearErrors: () => void;
    validateNameUniqueness: () => void;
    setErrors: React.Dispatch<React.SetStateAction<Object>>;
}

export const StrategyFormV2: React.FC<IStrategyForm> = ({
    children,
    handleSubmit,
    handleCancel,
    strategyName,
    strategyDesc,
    params,
    setParams,
    setStrategyName,
    setStrategyDesc,
    errors,
    mode,
    setErrors,
    clearErrors,
}) => {
    const styles = useStyles();
    const updateParameter = (index: number, updated: object) => {
        let item = { ...params[index] };
        params[index] = Object.assign({}, item, updated);
        setParams(prev => [...prev]);
    };

    const appParameter = () => {
        setParams(prev => [
            ...prev,
            { name: '', type: 'string', description: '', required: false },
        ]);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.formHeader}>Strategy type information</h3>

            <div className={styles.container}>
                <p className={styles.inputDescription}>
                    What would you like to call your strategy?
                </p>
                <Input
                    autoFocus
                    className={styles.input}
                    label="Strategy name*"
                    value={strategyName}
                    onChange={e => setStrategyName(trim(e.target.value))}
                    error={Boolean(errors.name)}
                    errorText={errors.name}
                    onFocus={() => clearErrors()}
                />
                <p className={styles.inputDescription}>
                    What is your strategy description?
                </p>
                <Input
                    className={styles.input}
                    label="Strategy description"
                    value={strategyDesc}
                    onChange={e => setStrategyDesc(e.target.value)}
                    rows={2}
                    multiline
                />

                <StrategyParameters
                    input={params}
                    count={params.length}
                    updateParameter={updateParameter}
                    setParams={setParams}
                    errors={errors}
                />
                <Button
                    onClick={e => {
                        e.preventDefault();
                        appParameter();
                    }}
                    variant="outlined"
                    color="secondary"
                    className={styles.paramButton}
                    startIcon={<Add />}
                >
                    Add parameter
                </Button>
            </div>
            <div className={styles.buttonContainer}>
                {children}
                <Button onClick={handleCancel} className={styles.cancelButton}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};
