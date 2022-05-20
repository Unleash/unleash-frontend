import { styled, Button, Typography } from '@mui/material';
import { colors } from 'themes/colors';
import { IInstanceStatus, InstanceState } from 'interfaces/instance';
import { INSTANCE_STATUS_BAR_ID } from 'utils/testIds';
import { Info, Warning } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AccessContext from 'contexts/AccessContext';
import { ADMIN } from 'component/providers/AccessProvider/permissions';
import { ConditionallyRender } from '../ConditionallyRender/ConditionallyRender';
import { calculateTrialDaysRemaining } from './InstanceStatus';

interface IInstanceStatusBarProps {
    instanceStatus: IInstanceStatus;
}

export const InstanceStatusBar = ({
    instanceStatus,
}: IInstanceStatusBarProps) => {
    const { hasAccess } = useContext(AccessContext);

    const trialDaysRemaining = calculateTrialDaysRemaining(instanceStatus);

    if (
        instanceStatus.state === InstanceState.TRIAL &&
        typeof trialDaysRemaining === 'number' &&
        trialDaysRemaining <= 0
    ) {
        return (
            <StyledWarningBar data-testid={INSTANCE_STATUS_BAR_ID}>
                <StyledWarningIcon />
                <Typography
                    sx={theme => ({
                        fontSize: theme.fontSizes.smallBody,
                    })}
                >
                    <strong>Warning!</strong> Your free {instanceStatus.plan}{' '}
                    trial has expired. <strong>Upgrade trial</strong> otherwise
                    your <strong>account will be deleted.</strong>
                </Typography>
                <ConditionallyRender
                    condition={hasAccess(ADMIN)}
                    show={<UpgradeButton />}
                />
            </StyledWarningBar>
        );
    }

    if (
        instanceStatus.state === InstanceState.TRIAL &&
        typeof trialDaysRemaining === 'number' &&
        trialDaysRemaining <= 10
    ) {
        return (
            <StyledInfoBar data-testid={INSTANCE_STATUS_BAR_ID}>
                <StyledInfoIcon />
                <Typography
                    sx={theme => ({
                        fontSize: theme.fontSizes.smallBody,
                    })}
                >
                    <strong>Heads up!</strong> You have{' '}
                    <strong>{trialDaysRemaining} days</strong> left of your free{' '}
                    {instanceStatus.plan} trial.
                </Typography>
                <ConditionallyRender
                    condition={hasAccess(ADMIN)}
                    show={<UpgradeButton />}
                />
            </StyledInfoBar>
        );
    }

    return null;
};

const UpgradeButton = () => {
    const navigate = useNavigate();

    return (
        <StyledButton
            onClick={() => navigate('/admin/billing')}
            variant="outlined"
        >
            Upgrade trial
        </StyledButton>
    );
};

// TODO - Cleanup to use theme instead of colors
const StyledWarningBar = styled('aside')(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    gap: theme.spacing(1),
    borderBottom: '1px solid',
    borderColor: colors.orange[500],
    background: colors.orange[100],
    color: colors.orange[900],
}));

const StyledInfoBar = styled('aside')(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    gap: theme.spacing(1),
    borderBottom: '1px solid',
    borderColor: colors.blue[200],
    background: colors.blue[50],
    color: colors.blue[700],
}));

const StyledButton = styled(Button)(({ theme }) => ({
    whiteSpace: 'nowrap',
    minWidth: '8rem',
    marginLeft: theme.spacing(2),
}));

// TODO - Cleanup to use theme instead of colors
const StyledWarningIcon = styled(Warning)(({ theme }) => ({
    color: theme.palette.warning.main,
}));

const StyledInfoIcon = styled(Info)(({ theme }) => ({
    color: colors.blue[500],
}));
