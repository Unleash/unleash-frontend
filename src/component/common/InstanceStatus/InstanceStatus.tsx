import { useInstanceStatus } from 'hooks/api/getters/useInstanceStatus/useInstanceStatus';
import React, { FC, VFC, useEffect, useState, useContext } from 'react';
import { InstanceStatusBar } from 'component/common/InstanceStatus/InstanceStatusBar';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IInstanceStatus, InstanceState } from 'interfaces/instance';
import { differenceInDays, parseISO } from 'date-fns';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import AccessContext from 'contexts/AccessContext';

interface ITrialDialogProps {
    instanceStatus: IInstanceStatus;
}

const TrialDialog: VFC<ITrialDialogProps> = ({ instanceStatus }) => {
    const { hasAccess } = useContext(AccessContext);
    const navigate = useNavigate();
    const trialDaysRemaining = calculateTrialDaysRemaining(instanceStatus);

    const statusExpired =
        instanceStatus?.state === InstanceState.TRIAL &&
        typeof trialDaysRemaining === 'number' &&
        trialDaysRemaining <= 0;

    const [dialogOpen, setDialogOpen] = useState(statusExpired);

    useEffect(() => {
        setDialogOpen(statusExpired);
        const interval = setInterval(() => {
            setDialogOpen(statusExpired);
        }, 60000);
        return () => clearInterval(interval);
    }, [statusExpired]);

    if (hasAccess(ADMIN)) {
        return (
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
        );
    }

    return (
        <Dialogue
            open={dialogOpen}
            secondaryButtonText="Remind me later"
            onClose={() => {
                setDialogOpen(false);
            }}
            title="Your free Pro trial has expired!"
        >
            <Typography>
                Please inform your admin to <strong>Upgrade trial</strong> or
                your <strong>account will be deleted.</strong>
            </Typography>
        </Dialogue>
    );
};

export const InstanceStatus: FC = ({ children }) => {
    const { instanceStatus } = useInstanceStatus();

    return (
        <div hidden={!instanceStatus} style={{ height: '100%' }}>
            <ConditionallyRender
                condition={Boolean(instanceStatus)}
                show={() => (
                    <InstanceStatusBarMemo instanceStatus={instanceStatus!} />
                )}
            />
            <TrialDialog instanceStatus={instanceStatus!} />
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
