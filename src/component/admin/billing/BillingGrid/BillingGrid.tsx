import { FC, useMemo } from 'react';
import { SxProps } from '@mui/system';
import { Alert, Divider, Grid, styled, Theme, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { colors } from 'themes/colors';
import useUsers from 'hooks/api/getters/useUsers/useUsers';
import useInvoices from 'hooks/api/getters/useInvoices/useInvoices';
import { BillingInfoButton } from './BillingInfoButton/BillingInfoButton';
import { BillingHistory } from './BillingHistory/BillingHistory';
import { useInstanceStatus } from 'hooks/api/getters/useInstanceStatus/useInstanceStatus';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { InstanceState } from 'interfaces/instance';
import { calculateTrialDaysRemaining } from 'component/common/InstanceStatus/InstanceStatus';

const GridRow: FC<{ sx?: SxProps<Theme> }> = ({ sx, children }) => {
    return (
        <Grid
            container
            item
            justifyContent="space-between"
            alignItems="center"
            sx={{ flexWrap: 'nowrap', ...sx }}
        >
            {children}
        </Grid>
    );
};

const GridCol: FC<{ vertical?: boolean }> = ({
    children,
    vertical = false,
}) => {
    return (
        <Grid
            container={vertical}
            item
            display="flex"
            alignItems={vertical ? 'start' : 'center'}
            direction={vertical ? 'column' : undefined}
        >
            {children}
        </Grid>
    );
};

const GridColLink: FC = ({ children }) => {
    return (
        <Typography
            sx={theme => ({
                fontSize: theme.fontSizes.smallBody,
                marginLeft: '8px',
            })}
            component="span"
        >
            ({children})
        </Typography>
    );
};

export const BillingGrid: FC = () => {
    const { instanceStatus } = useInstanceStatus();
    const { users } = useUsers();
    const { invoices } = useInvoices();
    const trialDaysRemaining = calculateTrialDaysRemaining(instanceStatus);

    const statusExpired =
        instanceStatus?.state === InstanceState.TRIAL &&
        typeof trialDaysRemaining === 'number' &&
        trialDaysRemaining <= 0;

    const price = {
        pro: 80,
        user: 15,
    };

    const seats = instanceStatus?.seats ?? 5;
    const freeAssigned = Math.min(users.length, seats);
    const paidAssigned = users.length - freeAssigned;
    const paidAssignedPrice = price.user * paidAssigned;
    const finalPrice = price.pro + paidAssignedPrice;
    const inactive = instanceStatus?.state !== InstanceState.ACTIVE;

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} md={5}>
                    <StyledInfoBox sx={{ backgroundColor: colors.grey[200] }}>
                        <Typography
                            variant="body1"
                            sx={{ marginBottom: '32px' }}
                        >
                            Billing Information
                        </Typography>
                        <ConditionallyRender
                            condition={inactive}
                            show={
                                <Alert
                                    severity="warning"
                                    sx={{ marginBottom: '32px' }}
                                >
                                    In order to <strong>Upgrade trial</strong>{' '}
                                    you need to provide us your billing
                                    information.
                                </Alert>
                            }
                        />
                        <BillingInfoButton update={!inactive} />
                        <StyledInfoLabel>
                            {inactive
                                ? 'Once we have received your billing information we will upgrade your trial within 1 business day'
                                : 'These changes may take up to 1 business day and they will be visible on your next invoice'}
                        </StyledInfoLabel>
                        <Divider
                            sx={{
                                margin: '20px 0',
                                borderColor: colors.grey[400],
                            }}
                        />
                        <StyledInfoLabel>
                            <a href="mailto:elise@getunleash.ai?subject=PRO plan clarifications">
                                Get in touch with us
                            </a>{' '}
                            for any clarification
                        </StyledInfoLabel>
                    </StyledInfoBox>
                </Grid>
                <Grid item xs={12} md={7}>
                    <StyledInfoBox
                        sx={{
                            boxShadow: '0px 1px 20px rgba(45, 42, 89, 0.1)',
                            padding: {
                                xs: '20px',
                                md: '52px',
                            },
                        }}
                    >
                        <ConditionallyRender
                            condition={inactive}
                            show={
                                <Alert
                                    severity="info"
                                    sx={theme => ({
                                        fontSize: theme.fontSizes.smallerBody,
                                        marginBottom: '24px',
                                        marginTop: {
                                            xs: '-12px',
                                            md: '-36px',
                                        },
                                    })}
                                >
                                    After you have sent your billing
                                    information, your instance will be upgraded
                                    - you don't have to do anything.{' '}
                                    <a href="mailto:elise@getunleash.ai?subject=PRO plan clarifications">
                                        Get in touch with us
                                    </a>{' '}
                                    for any clarification
                                </Alert>
                            }
                        />
                        <StyledPlanBadge>Current plan</StyledPlanBadge>
                        <Grid container>
                            <GridRow sx={{ marginBottom: '25px' }}>
                                <GridCol>
                                    <StyledPlanSpan>
                                        {instanceStatus?.plan}
                                    </StyledPlanSpan>
                                    <ConditionallyRender
                                        condition={
                                            instanceStatus?.state ===
                                            InstanceState.TRIAL
                                        }
                                        show={
                                            <StyledTrialSpan
                                                sx={{
                                                    color: statusExpired
                                                        ? colors.red[800]
                                                        : colors.orange[900],
                                                }}
                                            >
                                                {statusExpired
                                                    ? 'Trial expired'
                                                    : instanceStatus?.trialExtended
                                                    ? 'Extended Trial'
                                                    : 'Trial'}
                                            </StyledTrialSpan>
                                        }
                                    />
                                </GridCol>
                                <GridCol>
                                    <StyledPriceSpan>
                                        ${price.pro.toFixed(2)}
                                    </StyledPriceSpan>
                                </GridCol>
                            </GridRow>
                            <GridRow sx={{ marginBottom: '12px' }}>
                                <GridCol>
                                    <Typography>
                                        <strong>{seats}</strong> team members
                                        <GridColLink>
                                            <Link to="/admin/users">
                                                {freeAssigned} assigned
                                            </Link>
                                        </GridColLink>
                                    </Typography>
                                </GridCol>
                                <GridCol>
                                    <CheckIcon
                                        sx={{
                                            fontSize: '1rem',
                                            marginRight: '8px',
                                        }}
                                    />
                                    <Typography variant="body2">
                                        included
                                    </Typography>
                                </GridCol>
                            </GridRow>
                            <GridRow>
                                <GridCol vertical>
                                    <Typography>
                                        Paid members
                                        <GridColLink>
                                            <Link to="/admin/users">
                                                {paidAssigned} assigned
                                            </Link>
                                        </GridColLink>
                                    </Typography>
                                    <StyledInfoLabel>
                                        Add up to 15 extra paid members - $
                                        {price.user}/month per member
                                    </StyledInfoLabel>
                                </GridCol>
                                <GridCol>
                                    <Typography
                                        sx={theme => ({
                                            fontSize:
                                                theme.fontSizes.mainHeader,
                                        })}
                                    >
                                        ${paidAssignedPrice.toFixed(2)}
                                    </Typography>
                                </GridCol>
                            </GridRow>
                        </Grid>
                        <Divider
                            sx={{
                                margin: '24px 0',
                            }}
                        />
                        <Grid container>
                            <GridRow>
                                <GridCol>
                                    <Typography
                                        sx={theme => ({
                                            fontWeight: theme.fontWeight.bold,
                                            fontSize:
                                                theme.fontSizes.mainHeader,
                                        })}
                                    >
                                        Total per month
                                    </Typography>
                                </GridCol>
                                <GridCol>
                                    <Typography
                                        sx={theme => ({
                                            fontWeight: theme.fontWeight.bold,
                                            fontSize: '2rem',
                                        })}
                                    >
                                        ${finalPrice.toFixed(2)}
                                    </Typography>
                                </GridCol>
                            </GridRow>
                        </Grid>
                    </StyledInfoBox>
                </Grid>
            </Grid>
            <BillingHistory data={invoices} />
        </>
    );
};

const StyledInfoBox = styled('aside')(({ theme }) => ({
    padding: '32px',
    height: '100%',
    borderRadius: theme.shape.borderRadiusLarge,
}));

const StyledInfoLabel = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.smallBody,
    color: theme.palette.text.secondary,
}));

const StyledPlanBadge = styled('span')(({ theme }) => ({
    padding: '4px 8px',
    borderRadius: theme.shape.borderRadiusLarge,
    fontSize: '0.75rem',
    backgroundColor: colors.green[100],
    color: theme.palette.success.dark,
    fontWeight: theme.fontWeight.bold,
}));

const StyledPlanSpan = styled('span')(({ theme }) => ({
    fontSize: '3.25rem',
    lineHeight: 1,
    color: theme.palette.primary.main,
    fontWeight: 800,
}));

const StyledTrialSpan = styled('span')(({ theme }) => ({
    marginLeft: '12px',
    fontWeight: theme.fontWeight.bold,
}));

const StyledPriceSpan = styled('span')(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: theme.fontSizes.mainHeader,
    fontWeight: theme.fontWeight.bold,
}));
