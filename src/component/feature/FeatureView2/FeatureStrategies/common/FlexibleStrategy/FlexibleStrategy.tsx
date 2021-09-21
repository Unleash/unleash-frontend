import { TextField, Tooltip, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';

import { IParameter } from '../../../../../../interfaces/strategy';
import InputPercentage from '../../../../strategy/EditStrategyModal/input-percentage';
import Select from '../../../../../common/select';

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
}

const FlexibleStrategy = ({
    updateParameter,
    parameters,
    context,
}: IFlexibleStrategyProps) => {
    const onUpdate = (field: string) => (_, newValue) => {
        updateParameter(field, newValue);
    };

    const resolveStickiness = () =>
        builtInStickinessOptions.concat(
            context
                .filter(c => c.stickiness)
                .filter(
                    c => !builtInStickinessOptions.find(s => s.key === c.name)
                )
                .map(c => ({ key: c.name, label: c.name }))
        );

    const stickinessOptions = resolveStickiness();

    const rollout = parameters.rollout;
    const stickiness = parameters.stickiness;
    const groupId = parameters.groupId;

    return (
        <div>
            <InputPercentage
                name="Rollout"
                value={1 * rollout}
                onChange={onUpdate('rollout')}
            />
            <br />
            <div>
                <Tooltip title="Stickiness defines what parameter should be used to ensure that your users get consistency in features. By default unleash will use the first value present in the context in the order of userId, sessionId and random.">
                    <Typography
                        variant="subtitle2"
                        style={{
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Stickiness
                        <Info
                            style={{
                                fontSize: '1rem',
                                color: 'gray',
                                marginLeft: '0.2rem',
                            }}
                        />
                    </Typography>
                </Tooltip>
                <Select
                    name="stickiness"
                    label="Stickiness"
                    options={stickinessOptions}
                    value={stickiness}
                    onChange={e => onUpdate('stickiness')(e, e.target.value)}
                />
                &nbsp;
                <br />
                <br />
                <Tooltip title="GroupId is used to ensure that different toggles will hash differently for the same user. The groupId defaults to feature toggle name, but you can override it to correlate rollout of multiple feature toggles.">
                    <Typography
                        variant="subtitle2"
                        style={{
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        GroupId
                        <Info
                            style={{
                                fontSize: '1rem',
                                color: 'gray',
                                marginLeft: '0.2rem',
                            }}
                        />
                    </Typography>
                </Tooltip>
                <TextField
                    label="groupId"
                    size="small"
                    variant="outlined"
                    value={groupId}
                    onChange={e => onUpdate('groupId')(e, e.target.value)}
                />
            </div>
        </div>
    );
};

export default FlexibleStrategy;
