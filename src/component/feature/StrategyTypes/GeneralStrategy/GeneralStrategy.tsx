import React from 'react';
import { FormControlLabel, Switch, TextField, Tooltip } from '@mui/material';
import StrategyInputList from '../StrategyInputList/StrategyInputList';
import RolloutSlider from '../RolloutSlider/RolloutSlider';
import { IStrategy, IFeatureStrategyParameters } from 'interfaces/strategy';
import {
    parseParameterNumber,
    parseParameterStrings,
    parseParameterString,
} from 'utils/parseParameter';
import { InputCaption } from 'component/common/InputCaption/InputCaption';
import { styled } from '@mui/system';

interface IGeneralStrategyProps {
    parameters: IFeatureStrategyParameters;
    strategyDefinition: IStrategy;
    updateParameter: (field: string, value: string) => void;
    editable: boolean;
}

const StyledContainer = styled('div')(({ theme }) => ({
    display: 'grid',
    gap: theme.spacing(4),
}));

const GeneralStrategy = ({
    parameters,
    strategyDefinition,
    updateParameter,
    editable,
}: IGeneralStrategyProps) => {
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
        <StyledContainer>
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
                                <InputCaption text={description} />
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
                                <InputCaption text={description} />
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
                                <InputCaption text={description} />
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
                                <InputCaption text={description} />
                            </div>
                        );
                    }
                }
            )}
        </StyledContainer>
    );
};

export default GeneralStrategy;
