import { Typography } from '@mui/material';
import { IParameter } from 'interfaces/strategy';
import RolloutSlider from '../RolloutSlider/RolloutSlider';
import Select from 'component/common/select';
import React from 'react';
import Input from 'component/common/Input/Input';
import {
    FLEXIBLE_STRATEGY_GROUP_ID,
    FLEXIBLE_STRATEGY_STICKINESS_ID,
} from 'utils/testIds';
import { HelpIcon } from 'component/common/HelpIcon/HelpIcon';

const builtInStickinessOptions = [
    { key: 'default', label: 'default' },
    { key: 'userId', label: 'userId' },
    { key: 'sessionId', label: 'sessionId' },
    { key: 'random', label: 'random' },
];

interface IFlexibleStrategyProps {
    parameters: IParameter;
    updateParameter: (field: string, value: any) => void;
    context: any;
    editable: boolean;
}

const FlexibleStrategy = ({
    updateParameter,
    parameters,
    context,
    editable = true,
}: IFlexibleStrategyProps) => {
    const onUpdate =
        (field: string) =>
        (
            e: React.ChangeEvent<{ name?: string; value: unknown }>,
            newValue: number
        ) => {
            updateParameter(field, newValue);
        };

    const updateRollout = (
        e: React.ChangeEvent<{}>,
        value: number | number[]
    ) => {
        updateParameter('rollout', value.toString());
    };

    const resolveStickiness = () =>
        builtInStickinessOptions.concat(
            context
                // @ts-expect-error
                .filter(c => c.stickiness)
                .filter(
                    // @ts-expect-error
                    c => !builtInStickinessOptions.find(s => s.key === c.name)
                )
                // @ts-expect-error
                .map(c => ({ key: c.name, label: c.name }))
        );

    const stickinessOptions = resolveStickiness();

    const rollout =
        parameters.rollout !== undefined ? parameters.rollout : '100';
    const stickiness = parameters.stickiness;
    const groupId = parameters.groupId;

    return (
        <div>
            <RolloutSlider
                name="Rollout"
                value={parseInt(rollout)}
                disabled={!editable}
                onChange={updateRollout}
            />

            <br />
            <div>
                <Typography
                    variant="subtitle2"
                    style={{
                        marginBottom: '1rem',
                        display: 'flex',
                        gap: '1ch',
                    }}
                    component="h2"
                >
                    Stickiness
                    <HelpIcon tooltip="Stickiness defines what parameter should be used to ensure that your users get consistency in features. By default unleash will use the first value present in the context in the order of userId, sessionId and random." />
                </Typography>
                <Select
                    id="stickiness-select"
                    name="stickiness"
                    label="Stickiness"
                    options={stickinessOptions}
                    value={stickiness}
                    disabled={!editable}
                    data-testid={FLEXIBLE_STRATEGY_STICKINESS_ID}
                    onChange={e =>
                        onUpdate('stickiness')(e, e.target.value as number)
                    }
                />
                &nbsp;
                <br />
                <br />
                <Typography
                    variant="subtitle2"
                    style={{
                        marginBottom: '1rem',
                        display: 'flex',
                        gap: '1ch',
                    }}
                    component="h2"
                >
                    GroupId
                    <HelpIcon tooltip="GroupId is used to ensure that different toggles will hash differently for the same user. The groupId defaults to feature toggle name, but you can override it to correlate rollout of multiple feature toggles." />
                </Typography>
                <Input
                    label="groupId"
                    id="groupId-input"
                    value={groupId || ''}
                    disabled={!editable}
                    onChange={e => onUpdate('groupId')(e, e.target.value)}
                    data-testid={FLEXIBLE_STRATEGY_GROUP_ID}
                />
            </div>
        </div>
    );
};

export default FlexibleStrategy;
