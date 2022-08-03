import React from 'react';
import { FormControlLabel, Switch, TextField, Tooltip } from '@mui/material';
import StrategyInputList from '../StrategyInputList/StrategyInputList';
import RolloutSlider from '../RolloutSlider/RolloutSlider';
import {
    IFeatureStrategyParameters,
    IStrategyParameter,
} from 'interfaces/strategy';
import {
    parseParameterNumber,
    parseParameterStrings,
    parseParameterString,
} from 'utils/parseParameter';
import { InputCaption } from 'component/common/InputCaption/InputCaption';

interface IStrategyParameterProps {
    definition: IStrategyParameter;
    parameters: IFeatureStrategyParameters;
    updateParameter: (field: string, value: string) => void;
    editable: boolean;
}

export const StrategyParameter = ({
    definition,
    parameters,
    updateParameter,
    editable,
}: IStrategyParameterProps) => {
    const { type, name, description, required } = definition;

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

    if (type === 'percentage') {
        const value = parseParameterNumber(parameters[name]);
        return (
            <div>
                <RolloutSlider
                    name={name}
                    onChange={onChangePercentage.bind(this, name)}
                    disabled={!editable}
                    value={value}
                    minLabel="off"
                    maxLabel="on"
                />
                <InputCaption text={description} />
            </div>
        );
    }

    if (type === 'list') {
        const values = parseParameterStrings(parameters[name]);
        return (
            <div>
                <StrategyInputList
                    name={name}
                    list={values}
                    disabled={!editable}
                    setConfig={updateParameter}
                />
                <InputCaption text={description} />
            </div>
        );
    }

    if (type === 'number') {
        const regex = new RegExp('^\\d+$');
        const value = parseParameterString(parameters[name]);
        const error = value.length > 0 ? !regex.test(value) : false;
        return (
            <div>
                <TextField
                    error={error}
                    helperText={error && `${name} is not a number!`}
                    variant="outlined"
                    size="small"
                    required={required}
                    style={{ width: '100%' }}
                    disabled={!editable}
                    name={name}
                    label={name}
                    onChange={onChangeTextField.bind(this, name)}
                    value={value}
                />
                <InputCaption text={description} />
            </div>
        );
    }

    if (type === 'boolean') {
        const value = parseParameterString(parameters[name]);
        return (
            <Tooltip title={description} placement="right-end" arrow>
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
        );
    }

    return (
        <div>
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
                onChange={onChangeTextField.bind(this, name)}
                value={parseParameterString(parameters[name])}
            />
            <InputCaption text={description} />
        </div>
    );
};
