import { TextField, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useCommonStyles } from '../../../common.styles';
import useQueryParams from '../../../hooks/useQueryParams';
import ChangePasswordForm from '../common/ChangePasswordForm/ChangePasswordForm';
import StandaloneBanner from '../StandaloneBanner/StandaloneBanner';
import useSWR from 'swr';

import { useStyles } from './NewUser.styles';

const getFetcher = (token: string) => () =>
    fetch('http://localhost:4242/auth/reset/validate', {
        method: 'GET',
    });

const NewUser = () => {
    const styles = useStyles();
    const commonStyles = useCommonStyles();
    const query = useQueryParams();
    const token = query.get('token') || '';
    const fetcher = getFetcher(token);
    const { data, error } = useSWR(
        `/auth/reset/validate?token=${token}`,
        fetcher
    );

    console.log(data, error);

    return (
        <div className={styles.container}>
            <div style={{ width: '50%', minHeight: '100vh' }}>
                <StandaloneBanner />
            </div>
            <div
                style={{
                    width: '50%',
                    minHeight: '100vh',
                    padding: '4rem 3rem',
                }}
            >
                <Typography
                    variant="subtitle1"
                    style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}
                >
                    Your username is
                </Typography>
                <TextField
                    value="fredrik@getunleash.ai"
                    variant="outlined"
                    size="small"
                    style={{ minWidth: '300px' }}
                    disabled
                />
                <div className={styles.roleContainer}>
                    <Typography
                        variant="subtitle1"
                        style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}
                    >
                        In unleash you are an <i>Editor</i>
                    </Typography>
                    <Typography variant="body1">
                        As Editor you have access to most features in Unleash,
                        but you can not manage users and roles in the global
                        scope. If you creates a project, you will become a
                        project owner and receive superuser rights within the
                        context of that project.
                    </Typography>
                    <div className={commonStyles.largeDivider} />
                    <Typography
                        variant="subtitle1"
                        style={{ marginBottom: '0.5rem', fontSize: '1rem' }}
                    >
                        In order to get started with Unleash. Please set a new
                        password for your account.
                    </Typography>
                    <ChangePasswordForm />
                </div>
            </div>
        </div>
    );
};

export default NewUser;
