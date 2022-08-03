import React from 'react';
import { FormControlLabel, Switch, TextField, Tooltip } from '@mui/material';
import StrategyInputList from '../StrategyInputList/StrategyInputList';
import RolloutSlider from '../RolloutSlider/RolloutSlider';
import { IStrategy, IFeatureStrategyParameters } from 'interfaces/strategy';
import { useStyles } from './GeneralStrategy.styles';
import {
    parseParameterNumber,
    parseParameterStrings,
    parseParameterString,
} from 'utils/parseParameter';

interface IGeneralStrategyProps {
    parameters: IFeatureStrategyParameters;
    strategyDefinition: IStrategy;
    updateParameter: (field: string, value: string) => void;
    editable: boolean;
}

const GeneralStrategy = ({
    parameters,
    strategyDefinition,
    updateParameter,
    editable,
}: IGeneralStrategyProps) => {
    const { classes: styles } = useStyles();
    const onChangeTextField = (
        field: string,
        evt: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = evt.currentTarget;

        evt.preventDefault();
        updateParameter(field, value);
    };

    const onChangePercentage = (
        field: string,
        evt: Event,
        newValue: number | number[]
    ) => {
        evt.preventDefault();
        updateParameter(field, newValue.toString());
    };

    const handleSwitchChange = (field: string, currentValue: any) => {
        const value = currentValue === 'true' ? 'false' : 'true';
        updateParameter(field, value);
    };

    if (!strategyDefinition || strategyDefinition.parameters.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            {strategyDefinition.parameters.map(
                ({ name, type, description, required }) => {
                    if (type === 'percentage') {
                        const value = parseParameterNumber(parameters[name]);
                        return (
                            <div key={name}>
                                <RolloutSlider
                                    name={name}
                                    onChange={onChangePercentage.bind(
                                        this,
                                        name
                                    )}
                                    disabled={!editable}
                                    value={value}
                                    minLabel="off"
                                    maxLabel="on"
                                />
                                {description && (
                                    <p className={styles.helpText}>
                                        {description}
                                    </p>
                                )}
                            </div>
                        );
                    } else if (type === 'list') {
                        const values = parseParameterStrings(parameters[name]);
                        return (
                            <div key={name}>
                                <StrategyInputList
                                    name={name}
                                    list={values}
                                    disabled={!editable}
                                    setConfig={updateParameter}
                                />
                                {description && (
                                    <p className={styles.helpText}>
                                        {description}
                                    </p>
                                )}
                            </div>
                        );
                    } else if (type === 'number') {
                        const regex = new RegExp('^\\d+$');
                        const value = parseParameterString(parameters[name]);
                        const error =
                            value.length > 0 ? !regex.test(value) : false;

                        return (
                            <div key={name}>
                                <TextField
                                    error={error}
                                    helperText={
                                        error && `${name} is not a number!`
                                    }
                                    variant="outlined"
                                    size="small"
                                    required={required}
                                    style={{ width: '100%' }}
                                    disabled={!editable}
                                    name={name}
                                    label={name}
                                    onChange={onChangeTextField.bind(
                                        this,
                                        name
                                    )}
                                    value={value}
                                />
                                {description && (
                                    <p className={styles.helpText}>
                                        {description}
                                    </p>
                                )}
                            </div>
                        );
                    } else if (type === 'boolean') {
                        const value = parseParameterString(parameters[name]);
                        return (
                            <div key={name}>
                                <Tooltip
                                    title={description}
                                    placement="right-end"
                                    arrow
                                >
                                    <FormControlLabel
                                        label={name}
                                        control={
                                            <Switch
                                                name={name}
                                                onChange={handleSwitchChange.bind(
                                                    this,
                                                    name,
                                                    value
                                                )}
                                                checked={value === 'true'}
                                            />
                                        }
                                    />
                                </Tooltip>
                            </div>
                        );
                    } else {
                        const value = parseParameterString(parameters[name]);
                        return (
                            <div key={name}>
                                <TextField
                                    rows={1}
                                    placeholder=""
                                    variant="outlined"
                                    size="small"
                                    style={{ width: '100%' }}
                                    required={required}
                                    disabled={!editable}
                                    name={name}
                                    label={name}
                                    onChange={onChangeTextField.bind(
                                        this,
                                        name
                                    )}
                                    value={value}
                                />
                                {description && (
                                    <p className={styles.helpText}>
                                        {description}
                                    </p>
                                )}
                            </div>
                        );
                    }
                }
            )}
        </div>
    );
};

export default GeneralStrategy;
