import AdminMenu from '../menu/AdminMenu';
import { BillingInfoButton } from './BillingInfoButton/BillingInfoButton';
import { PageContent } from 'component/common/PageContent/PageContent';
import { Alert, Divider, Grid, styled, Theme, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { colors } from 'themes/colors';
import { FC } from 'react';
import { SxProps } from '@mui/system';

const GridRow: FC<{ sx?: SxProps<Theme> }> = ({ sx, children }) => {
    return (
        <Grid
            container
            item
            justifyContent="space-between"
            alignItems="center"
            sx={sx}
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
            item
            display="flex"
            alignItems={vertical ? 'start' : 'center'}
            direction={vertical ? 'column' : 'row'}
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

export const Billing = () => {
    return (
        <div>
            <AdminMenu />
            <PageContent header="Billing">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                        <StyledInfoBox
                            sx={{ backgroundColor: colors.grey[200] }}
                        >
                            <Typography
                                variant="body1"
                                sx={{ marginBottom: '32px' }}
                            >
                                Billing Information
                            </Typography>
                            <Alert
                                severity="warning"
                                sx={{ marginBottom: '32px' }}
                            >
                                In order to <strong>Upgrade trial</strong> you
                                need to provide us your billing information.
                            </Alert>
                            <BillingInfoButton>
                                Add billing information
                            </BillingInfoButton>
                            <StyledInfoLabel>
                                Once we have received your billing information
                                we will upgrade your trial within 1 business day
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
                    <Grid item xs={12} sm={7}>
                        <StyledInfoBox
                            sx={{
                                boxShadow: '0px 1px 20px rgba(45, 42, 89, 0.1)',
                                padding: '52px',
                            }}
                        >
                            <Alert
                                severity="info"
                                sx={theme => ({
                                    fontSize: theme.fontSizes.smallerBody,
                                    marginBottom: '24px',
                                    marginTop: '-36px',
                                })}
                            >
                                After you have sent your billing information,
                                your instance will be upgraded - you don't have
                                to do anything.{' '}
                                <a href="mailto:elise@getunleash.ai?subject=PRO plan clarifications">
                                    Get in touch with us
                                </a>{' '}
                                for any clarification
                            </Alert>
                            <StyledPlanBadge>Current plan</StyledPlanBadge>
                            <Grid container>
                                <GridRow sx={{ marginBottom: '25px' }}>
                                    <GridCol>
                                        <StyledPlanSpan>Pro</StyledPlanSpan>
                                        <StyledTrialSpan>Trial</StyledTrialSpan>
                                    </GridCol>
                                    <GridCol>
                                        <StyledPriceSpan>
                                            $80.00
                                        </StyledPriceSpan>
                                    </GridCol>
                                </GridRow>
                                <GridRow sx={{ marginBottom: '12px' }}>
                                    <GridCol>
                                        <Typography>
                                            <strong>5</strong> team members
                                            <GridColLink>
                                                <Link to="/admin/users">
                                                    5 assigned
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
                                                    3 assigned
                                                </Link>
                                            </GridColLink>
                                        </Typography>
                                        <StyledInfoLabel>
                                            Add up to 15 extra paid members -
                                            $15/month per member
                                        </StyledInfoLabel>
                                    </GridCol>
                                    <GridCol>
                                        <Typography
                                            sx={theme => ({
                                                fontSize:
                                                    theme.fontSizes.mainHeader,
                                            })}
                                        >
                                            $45.00
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
                                                fontWeight:
                                                    theme.fontWeight.bold,
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
                                                fontWeight:
                                                    theme.fontWeight.bold,
                                                fontSize: '2rem',
                                            })}
                                        >
                                            $125.00
                                        </Typography>
                                    </GridCol>
                                </GridRow>
                            </Grid>
                        </StyledInfoBox>
                    </Grid>
                </Grid>
            </PageContent>
        </div>
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
    color: theme.palette.primary.main,
    fontWeight: 800,
}));

const StyledTrialSpan = styled('span')(({ theme }) => ({
    marginLeft: '12px',
    color: colors.orange[900],
    fontWeight: theme.fontWeight.bold,
}));

const StyledPriceSpan = styled('span')(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: theme.fontSizes.mainHeader,
    fontWeight: theme.fontWeight.bold,
}));
