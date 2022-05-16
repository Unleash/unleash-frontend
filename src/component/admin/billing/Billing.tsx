import AdminMenu from '../menu/AdminMenu';
import { PageContent } from 'component/common/PageContent/PageContent';
import {
    Alert,
    Button,
    Divider,
    Grid,
    styled,
    Typography,
} from '@mui/material';
import { colors } from 'themes/colors';

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
                            <Typography variant="body1">
                                Billing Information
                            </Typography>
                            <Alert severity="warning" sx={{ margin: '32px 0' }}>
                                In order to <strong>Upgrade trial</strong> you
                                need to provide us your billing information.
                            </Alert>
                            <Button
                                variant="contained"
                                sx={{ width: '100%', marginBottom: '12px' }}
                            >
                                Add billing information
                            </Button>
                            <StyledInfoLabel>
                                Once we have received your billing information
                                we will upgrade your trial within 1 business day
                            </StyledInfoLabel>
                            <Divider sx={{ margin: '20px 0' }} />
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
                                paddingTop: '16px',
                            }}
                        >
                            <Alert
                                severity="info"
                                sx={{
                                    fontSize: '0.75rem',
                                    marginBottom: '24px',
                                }}
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
                                <Grid
                                    container
                                    item
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid
                                        item
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <StyledPlanSpan>Pro</StyledPlanSpan>
                                        <StyledTrialSpan>Trial</StyledTrialSpan>
                                    </Grid>
                                    <Grid item>
                                        <StyledPriceSpan>
                                            $80.00
                                        </StyledPriceSpan>
                                    </Grid>
                                </Grid>
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
    fontSize: theme.fontSizes.smallerBody,
    color: theme.palette.text.secondary,
}));

const StyledPlanBadge = styled('span')(({ theme }) => ({
    padding: '4px 8px',
    borderRadius: theme.shape.borderRadiusLarge,
    fontSize: '0.625rem',
    backgroundColor: colors.green[100],
    color: theme.palette.success.dark,
    fontWeight: theme.fontWeight.bold,
}));

const StyledPlanSpan = styled('span')(({ theme }) => ({
    fontSize: '2.875rem',
    color: theme.palette.primary.main,
    fontWeight: 800,
}));

const StyledTrialSpan = styled('span')(({ theme }) => ({
    marginLeft: '12px',
    color: theme.palette.warning.main,
    fontWeight: theme.fontWeight.bold,
}));

const StyledPriceSpan = styled('span')(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: theme.fontSizes.mainHeader,
    fontWeight: theme.fontWeight.bold,
}));
