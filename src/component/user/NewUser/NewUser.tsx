import useSWR from 'swr';
import useQueryParams from '../../../hooks/useQueryParams';
import useLoading from '../../../hooks/useLoading';
import { TextField, Typography } from '@material-ui/core';

import StandaloneBanner from '../StandaloneBanner/StandaloneBanner';
import ResetPasswordDetails from '../common/ResetPasswordDetails/ResetPasswordDetails';

import { useStyles } from './NewUser.styles';
import { useCommonStyles } from '../../../common.styles';

const getFetcher = (token: string) => () =>
    fetch(`http://localhost:4242/auth/reset/validate?token=${token}`, {
        method: 'GET',
    });

const NewUser = () => {
    const query = useQueryParams();
    const token = query.get('token') || '';
    const fetcher = getFetcher(token);
    const { data, error } = useSWR(
        `/auth/reset/validate?token=${token}`,
        fetcher
    );
    const loading = !error && !data;
    const ref = useLoading(loading);
    const commonStyles = useCommonStyles();
    const styles = useStyles();

    return (
        <div className={styles.container} ref={ref}>
            <div style={{ width: '40%', minHeight: '100vh' }}>
                <StandaloneBanner showStars title={'Welcome to Unleash'} />
            </div>
            <ResetPasswordDetails data={data} token={token}>
                <Typography
                    data-loading
                    variant="subtitle1"
                    style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}
                >
                    Your username is
                </Typography>
                <TextField
                    data-loading
                    value="fredrik@getunleash.ai"
                    variant="outlined"
                    size="small"
                    style={{ minWidth: '300px' }}
                    disabled
                />
                <div className={styles.roleContainer}>
                    <Typography
                        data-loading
                        variant="subtitle1"
                        style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}
                    >
                        In unleash you are an <i>Editor</i>
                    </Typography>
                    <Typography variant="body1" data-loading>
                        As Editor you have access to most features in Unleash,
                        but you can not manage users and roles in the global
                        scope. If you create a project, you will become a
                        project owner and receive superuser rights within the
                        context of that project.
                    </Typography>
                    <div className={commonStyles.largeDivider} data-loading />
                    <Typography
                        variant="subtitle1"
                        style={{ marginBottom: '0.5rem', fontSize: '1rem' }}
                        data-loading
                    >
                        In order to get started with Unleash. Please set a new
                        password for your account.
                    </Typography>
                </div>
            </ResetPasswordDetails>
        </div>
    );
};

export default NewUser;
