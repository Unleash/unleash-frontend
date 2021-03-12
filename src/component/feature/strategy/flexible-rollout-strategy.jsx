import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import strategyInputProps from './strategy-input-props';
import Select from '../../common/select';

import StrategyInputPercentage from './input-percentage';

const builtInStickinessOptions = [
    { key: 'default', label: 'default' },
    { key: 'userId', label: 'userId' },
    { key: 'sessionId', label: 'sessionId' },
    { key: 'random', label: 'random' },
];

export default class FlexibleRolloutStrategy extends Component {
    static propTypes = { ...strategyInputProps, context: PropTypes.array };

    onUpdate = (field, _, newValue) => {
        this.props.updateParameter(field, newValue);
    };

    resolveStickiness = () => {
        const { context } = this.props;
        return builtInStickinessOptions.concat(
            context
                .filter(c => c.stickiness)
                .filter(c => !builtInStickinessOptions.find(s => s.key === c.name))
                .map(c => ({ key: c.name, label: c.name }))
        );
    };

    render() {
        const { editable, parameters, index } = this.props;
        const stickinessOptions = this.resolveStickiness();

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
                    onChange={this.onUpdate.bind(this, 'rollout')}
                    id={`${index}-groupId`}
                />
                <div>
                    <Select
                        name="stickiness"
                        label="Stickiness"
                        options={stickinessOptions}
                        value={stickiness}
                        disabled={!editable}
                        onChange={evt => this.onUpdate('stickiness', evt)}
                    />
                    &nbsp;
                    <TextField
                        floatingLabel
                        label="groupId"
                        size="small"
                        variant="outlined"
                        value={groupId}
                        disabled={!editable}
                        onChange={evt => this.onUpdate('groupId', evt)}
                        id={`${index}-groupId`}
                    />
                </div>
            </div>
        );
    }
}
