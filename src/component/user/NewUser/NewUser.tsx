import useLoading from '../../../hooks/useLoading';
import { TextField, Typography, Button } from '@material-ui/core';

import StandaloneBanner from '../StandaloneBanner/StandaloneBanner';
import ResetPasswordDetails from '../common/ResetPasswordDetails/ResetPasswordDetails';

import { useStyles } from './NewUser.styles';
import { useCommonStyles } from '../../../common.styles';
import useResetPassword from '../../../hooks/useResetPassword';
import StandaloneLayout from '../common/StandaloneLayout/StandaloneLayout';
import ConditionallyRender from '../../common/ConditionallyRender';
import InvalidToken from '../common/InvalidToken/InvalidToken';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link } from 'react-router-dom';

const NewUser = () => {
    const [
        token,
        data,
        error,
        loading,
        setLoading,
        invalidToken,
    ] = useResetPassword();
    const ref = useLoading(loading);
    const commonStyles = useCommonStyles();
    const styles = useStyles();
    console.log(data);
    return (
        <div ref={ref}>
            <StandaloneLayout
                BannerComponent={
                    <StandaloneBanner showStars title={'Welcome to Unleash'}>
                        <ConditionallyRender
                            condition={data?.createdBy}
                            show={
                                <Typography variant="body1">
                                    You have been invited by {data?.createdBy}
                                </Typography>
                            }
                        />
                    </StandaloneBanner>
                }
            >
                <ConditionallyRender
                    condition={invalidToken}
                    show={<InvalidToken />}
                    elseShow={
                        <ResetPasswordDetails
                            token={token}
                            setLoading={setLoading}
                        >
                            <Typography
                                data-loading
                                variant="subtitle1"
                                style={{
                                    marginBottom: '0.5rem',
                                    fontSize: '1.1rem',
                                }}
                            >
                                Your username is
                            </Typography>
                            <TextField
                                data-loading
                                value={data?.email}
                                variant="outlined"
                                size="small"
                                style={{ minWidth: '300px' }}
                                disabled
                            />
                            <div className={styles.roleContainer}>
                                <Typography
                                    data-loading
                                    variant="subtitle1"
                                    style={{
                                        marginBottom: '0.5rem',
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    In unleash you are an{' '}
                                    <i>{data?.role?.name}</i>
                                </Typography>
                                <Typography variant="body1" data-loading>
                                    {data?.role?.description}
                                </Typography>
                                <div
                                    className={commonStyles.largeDivider}
                                    data-loading
                                />
                                <Typography
                                    variant="subtitle1"
                                    style={{
                                        marginBottom: '0.5rem',
                                        fontSize: '1rem',
                                    }}
                                    data-loading
                                >
                                    In order to get started with Unleash. Please
                                    set a new password for your account.
                                </Typography>
                            </div>
                        </ResetPasswordDetails>
                    }
                />
            </StandaloneLayout>
        </div>
    );
};

export default NewUser;
