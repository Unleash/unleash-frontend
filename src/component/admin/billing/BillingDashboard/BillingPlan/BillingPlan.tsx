import { FC } from 'react';
import { Alert, Divider, Grid, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { colors } from 'themes/colors';
import useUsers from 'hooks/api/getters/useUsers/useUsers';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { IInstanceStatus, InstanceState } from 'interfaces/instance';
import { calculateTrialDaysRemaining } from 'component/common/InstanceStatus/InstanceStatus';
import { GridRow } from 'component/common/GridRow/GridRow';
import { GridCol } from 'component/common/GridCol/GridCol';
import { GridColLink } from './GridColLink/GridColLink';

interface IBillingPlanProps {
    instanceStatus: IInstanceStatus;
}

export const BillingPlan: FC<IBillingPlanProps> = ({ instanceStatus }) => {
    const { users } = useUsers();
    const trialDaysRemaining = calculateTrialDaysRemaining(instanceStatus);

    const price = {
        pro: 80,
        user: 15,
    };

    const statusExpired =
        instanceStatus.state === InstanceState.TRIAL &&
        typeof trialDaysRemaining === 'number' &&
        trialDaysRemaining <= 0;

    const seats = instanceStatus.seats ?? 5;
    const freeAssigned = Math.min(users.length, seats);
    const paidAssigned = users.length - freeAssigned;
    const paidAssignedPrice = price.user * paidAssigned;
    const finalPrice = price.pro + paidAssignedPrice;
    const inactive = instanceStatus.state !== InstanceState.ACTIVE;

    return (
        <Grid item xs={12} md={7}>
            <StyledPlanBox>
                <ConditionallyRender
                    condition={inactive}
                    show={
                        <StyledAlert severity="info">
                            After you have sent your billing information, your
                            instance will be upgraded - you don't have to do
                            anything.{' '}
                            <a href="mailto:elise@getunleash.ai?subject=PRO plan clarifications">
                                Get in touch with us
                            </a>{' '}
                            for any clarification
                        </StyledAlert>
                    }
                />
                <StyledPlanBadge>Current plan</StyledPlanBadge>
                <Grid container>
                    <GridRow sx={theme => ({ marginBottom: theme.spacing(3) })}>
                        <GridCol>
                            <StyledPlanSpan>
                                {instanceStatus.plan}
                            </StyledPlanSpan>
                            <ConditionallyRender
                                condition={
                                    instanceStatus.state === InstanceState.TRIAL
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
                                            : instanceStatus.trialExtended
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
                    <GridRow
                        sx={theme => ({ marginBottom: theme.spacing(1.5) })}
                    >
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
                            <StyledCheckIcon />
                            <Typography variant="body2">included</Typography>
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
                                Add up to 15 extra paid members - ${price.user}
                                /month per member
                            </StyledInfoLabel>
                        </GridCol>
                        <GridCol>
                            <Typography
                                sx={theme => ({
                                    fontSize: theme.fontSizes.mainHeader,
                                })}
                            >
                                ${paidAssignedPrice.toFixed(2)}
                            </Typography>
                        </GridCol>
                    </GridRow>
                </Grid>
                <StyledDivider />
                <Grid container>
                    <GridRow>
                        <GridCol>
                            <Typography
                                sx={theme => ({
                                    fontWeight: theme.fontWeight.bold,
                                    fontSize: theme.fontSizes.mainHeader,
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
            </StyledPlanBox>
        </Grid>
    );
};

const StyledPlanBox = styled('aside')(({ theme }) => ({
    padding: theme.spacing(2.5),
    height: '100%',
    borderRadius: theme.shape.borderRadiusLarge,
    boxShadow: theme.boxShadows.elevated,
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6.5),
    },
}));

const StyledInfoLabel = styled(Typography)(({ theme }) => ({
    fontSize: theme.fontSizes.smallBody,
    color: theme.palette.text.secondary,
}));

const StyledPlanBadge = styled('span')(({ theme }) => ({
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    borderRadius: theme.shape.borderRadiusLarge,
    fontSize: theme.fontSizes.smallerBody,
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
    marginLeft: theme.spacing(1.5),
    fontWeight: theme.fontWeight.bold,
}));

const StyledPriceSpan = styled('span')(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: theme.fontSizes.mainHeader,
    fontWeight: theme.fontWeight.bold,
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
    fontSize: theme.fontSizes.smallerBody,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(-1.5),
    [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(-4.5),
    },
}));

const StyledCheckIcon = styled(CheckIcon)(({ theme }) => ({
    fontSize: '1rem',
    marginRight: theme.spacing(1),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: `${theme.spacing(3)} 0`,
}));
