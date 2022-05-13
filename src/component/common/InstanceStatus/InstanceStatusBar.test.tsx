import { InstanceStatusBar } from 'component/common/InstanceStatus/InstanceStatusBar';
import { InstanceState } from 'interfaces/instance';
import { render } from 'utils/testRenderer';
import { screen } from '@testing-library/react';
import { addDays } from 'date-fns';
import { INSTANCE_STATUS_BAR_ID } from 'utils/testIds';

test('InstanceStatusBar should be hidden by default', async () => {
    render(<InstanceStatusBar instanceStatus={{ plan: 'pro' }} />);

    expect(
        screen.queryByTestId(INSTANCE_STATUS_BAR_ID)
    ).not.toBeInTheDocument();
});

test('InstanceStatusBar should warn when the trial is about to expire', async () => {
    render(
        <InstanceStatusBar
            instanceStatus={{
                plan: 'pro',
                instanceState: InstanceState.TRIAL,
                trialExpiry: addDays(new Date(), 5).toISOString(),
            }}
        />
    );

    expect(screen.getByTestId(INSTANCE_STATUS_BAR_ID)).toBeInTheDocument();
    expect(await screen.findByTestId(INSTANCE_STATUS_BAR_ID)).toMatchSnapshot();
});

test('InstanceStatusBar should be hidden when the trial has expired', async () => {
    render(
        <InstanceStatusBar
            instanceStatus={{
                plan: 'pro',
                instanceState: InstanceState.TRIAL,
                trialExpiry: new Date().toISOString(),
            }}
        />
    );

    expect(
        screen.queryByTestId(INSTANCE_STATUS_BAR_ID)
    ).not.toBeInTheDocument();
});
