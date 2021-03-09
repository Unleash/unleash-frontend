import React from 'react';
import { Textfield, Icon } from 'react-mdl';
import { Switch, FormControlLabel, Tooltip } from '@material-ui/core';
import strategyInputProps from './strategy-input-props';
import StrategyInputPercentage from './input-percentage';
import StrategyInputList from './input-list';
import styles from './strategy.module.scss';

export default function GeneralStrategyInput({ parameters, strategyDefinition, updateParameter, editable }) {
    const onChange = (field, evt, newValue) => {
        evt.preventDefault();
        updateParameter(field, newValue);
    };

    const handleSwitchChange = (key, currentValue) => {
        const value = currentValue === 'true' ? 'false' : 'true';
        updateParameter(key, value);
    };

    if (strategyDefinition.parameters && strategyDefinition.parameters.length > 0) {
        return strategyDefinition.parameters.map(({ name, type, description, required }) => {
            let value = parameters[name];
            if (type === 'percentage') {
                if (value == null || (typeof value === 'string' && value === '')) {
                    value = 0;
                }
                return (
                    <div key={name}>
                        <br />
                        <StrategyInputPercentage
                            name={name}
                            onChange={onChange.bind(this, name)}
                            value={1 * value}
                            minLabel="off"
                            maxLabel="on"
                        />
                        {description && <p className={styles.helpText}>{description}</p>}
                    </div>
                );
            } else if (type === 'list') {
                let list = [];
                if (typeof value === 'string') {
                    list = value
                        .trim()
                        .split(',')
                        .filter(Boolean);
                }
                return (
                    <div key={name}>
                        <StrategyInputList name={name} list={list} disabled={!editable} setConfig={updateParameter} />
                        {description && <p className={styles.helpText}>{description}</p>}
                    </div>
                );
            } else if (type === 'number') {
                return (
                    <div key={name}>
                        <Textfield
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error={`${name} is not a number!`}
                            floatingLabel
                            required={required}
                            style={{ width: '100%' }}
                            name={name}
                            label={name}
                            onChange={onChange.bind(this, name)}
                            value={value}
                        />
                        {description && <p className={styles.helpText}>{description}</p>}
                    </div>
                );
            } else if (type === 'boolean') {
                return (
                    <div key={name} style={{ padding: '20px 0' }}>
                        <Tooltip title={description} placement="right-end">
                            <FormControlLabel label={name} control={<Switch name={name} onChange={handleSwitchChange.bind(this, name, value)} checked={value === 'true'} />} />
                        </Tooltip>
                    </div>
                );
            } else {
                return (
                    <div key={name}>
                        <Textfield
                            floatingLabel
                            rows={1}
                            placeholder=""
                            style={{ width: '100%' }}
                            required={required}
                            name={name}
                            label={name}
                            onChange={onChange.bind(this, name)}
                            value={value}
                        />
                        {description && <p className={styles.helpText}>{description}</p>}
                    </div>
                );
            }
        });
    }
    return null;
}

GeneralStrategyInput.propTypes = strategyInputProps;
