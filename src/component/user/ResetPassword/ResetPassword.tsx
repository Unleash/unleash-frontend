import useSWR from 'swr';
import useQueryParams from '../../../hooks/useQueryParams';
import useLoading from '../../../hooks/useLoading';

import StandaloneBanner from '../StandaloneBanner/StandaloneBanner';
import ResetPasswordDetails from '../common/ResetPasswordDetails/ResetPasswordDetails';

import { useStyles } from './ResetPassword.styles';
import { Typography } from '@material-ui/core';
import ConditionallyRender from '../../common/ConditionallyRender';
import InvalidToken from '../common/InvalidToken/InvalidToken';

const getFetcher = (token: string) => () =>
    fetch(`http://localhost:4242/auth/reset/validate?token=${token}`, {
        method: 'GET',
    });

const ResetPassword = () => {
    const styles = useStyles();
    const query = useQueryParams();
    const token = query.get('token') || '';
    const fetcher = getFetcher(token);
    const { data, error } = useSWR(
        `/auth/reset/validate?token=${token}`,
        fetcher
    );
    const loading = !error && !data;
    const ref = useLoading(loading);

    console.log(data);
    const invalidToken = !loading && data?.status === 401;

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
                condition={false}
                show={<InvalidToken />}
                elseShow={
                    <ResetPasswordDetails data={data} token={token}>
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
