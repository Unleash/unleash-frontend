import { useInstanceStatus } from 'hooks/api/getters/useInstanceStatus/useInstanceStatus';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { InstanceStatusBar } from 'component/common/InstanceStatus/InstanceStatusBar';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IInstanceStatus, InstanceState } from 'interfaces/instance';
import { differenceInDays, parseISO } from 'date-fns';

export const InstanceStatus: FC = ({ children }) => {
    const { instanceStatus } = useInstanceStatus();
    const trialDaysRemaining = calculateTrialDaysRemaining(instanceStatus);
    const navigate = useNavigate();

    const statusExpired = useMemo(
        () =>
            instanceStatus?.state === InstanceState.TRIAL &&
            typeof trialDaysRemaining === 'number' &&
            trialDaysRemaining <= 0,
        [instanceStatus, trialDaysRemaining]
    );

    const [dialogOpen, setDialogOpen] = useState(statusExpired);

    useEffect(() => {
        setDialogOpen(statusExpired);
        const interval = setInterval(() => {
            setDialogOpen(statusExpired);
        }, 60000);
        return () => clearInterval(interval);
    }, [statusExpired]);

    return (
        <div hidden={!instanceStatus} style={{ height: '100%' }}>
            {JSON.stringify(dialogOpen)}
            <ConditionallyRender
                condition={Boolean(instanceStatus)}
                show={() => (
                    <InstanceStatusBarMemo instanceStatus={instanceStatus!} />
                )}
            />
            <Dialogue
                open={dialogOpen}
                primaryButtonText="Upgrade trial"
                secondaryButtonText={
                    instanceStatus?.trialExtended
                        ? 'Remind me later'
                        : 'Extend trial (5 days)'
                }
                onClick={() => {
                    navigate('/admin/billing');
                    setDialogOpen(false);
                }}
                onClose={() => {
                    setDialogOpen(false);
                    // TODO: extend trial if !instanceStatus?.trialExtended
                }}
                title="Your free Pro trial has expired!"
            >
                <Typography>
                    <strong>Upgrade trial</strong> otherwise your{' '}
                    <strong>account will be deleted.</strong>
                </Typography>
            </Dialogue>
            {children}
        </div>
    );
};

export const calculateTrialDaysRemaining = (
    instanceStatus?: IInstanceStatus
): number | undefined => {
    return instanceStatus?.trialExpiry
        ? differenceInDays(parseISO(instanceStatus.trialExpiry), new Date())
        : undefined;
};

const InstanceStatusBarMemo = React.memo(InstanceStatusBar);
