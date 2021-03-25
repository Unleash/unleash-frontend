import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import strategyInputProps from '../strategy-input-props';
import Select from '../../../common/select';

import StrategyInputPercentage from '../input-percentage';

const builtInStickinessOptions = [
    { key: 'default', label: 'default' },
    { key: 'userId', label: 'userId' },
    { key: 'sessionId', label: 'sessionId' },
    { key: 'random', label: 'random' },
];
const FlexibleRolloutStrategy = ({ editable, parameters, index, updateParameter, context }) => {
    const onUpdate = field => (_, newValue) => {
        updateParameter(field, newValue);
    };

    const resolveStickiness = () =>
        builtInStickinessOptions.concat(
            context
                .filter(c => c.stickiness)
                .filter(c => !builtInStickinessOptions.find(s => s.key === c.name))
                .map(c => ({ key: c.name, label: c.name }))
        );

    const stickinessOptions = resolveStickiness();

    const rollout = parameters.rollout;
    const stickiness = parameters.stickiness;
    const groupId = parameters.groupId;

    return (
        <div>
            <br />
            <strong>Rollout</strong>
            <StrategyInputPercentage
                name="Percentage"
                value={1 * rollout}
                minLabel="off"
                maxLabel="on"
                disabled={!editable}
                onChange={onUpdate('rollout')}
                id={`${index}-groupId`}
            />
            <div>
                <Select
                    name="stickiness"
                    label="Stickiness"
                    options={stickinessOptions}
                    value={stickiness}
                    disabled={!editable}
                    onChange={e => onUpdate('stickiness')(e, e.target.value)}
                />
                &nbsp;
                <TextField
                    label="groupId"
                    size="small"
                    variant="outlined"
                    value={groupId}
                    disabled={!editable}
                    onChange={e => onUpdate('groupId')(e, e.target.value)}
                    id={`${index}-groupId`}
                />
            </div>
        </div>
    );
};
FlexibleRolloutStrategy.propTypes = {
    ...strategyInputProps,
    context: PropTypes.array,
};

export default FlexibleRolloutStrategy;
