import useLoading from '../../../hooks/useLoading';

import StandaloneBanner from '../StandaloneBanner/StandaloneBanner';
import ResetPasswordDetails from '../common/ResetPasswordDetails/ResetPasswordDetails';

import { useStyles } from './ResetPassword.styles';
import { Typography } from '@material-ui/core';
import ConditionallyRender from '../../common/ConditionallyRender';
import InvalidToken from '../common/InvalidToken/InvalidToken';
import useResetPassword from '../../../hooks/useResetPassword';

const ResetPassword = () => {
    const styles = useStyles();
    const [
        token,
        data,
        error,
        loading,
        setLoading,
        invalidToken,
    ] = useResetPassword();
    const ref = useLoading(loading);

    return (
        <div className={styles.container} ref={ref}>
            <div className={styles.innerContainer}>
                <StandaloneBanner title="Unleash">
                    <Typography variant="subtitle1">
                        Committed to creating new ways of developing.
                    </Typography>
                </StandaloneBanner>
            </div>
            <ConditionallyRender
                condition={invalidToken}
                show={<InvalidToken />}
                elseShow={
                    <ResetPasswordDetails
                        data={data}
                        token={token}
                        setLoading={setLoading}
                    >
                        <Typography
                            variant="h2"
                            className={styles.title}
                            data-loading
                        >
                            Reset password
                        </Typography>
                    </ResetPasswordDetails>
                }
            />
        </div>
    );
};

export default ResetPassword;
