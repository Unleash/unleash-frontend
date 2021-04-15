import useSWR from 'swr';
import useQueryParams from './useQueryParams';
import { useState, useEffect } from 'react';

const getFetcher = (token: string) => () =>
    fetch(`auth/reset/validate?token=${token}`, {
        method: 'GET',
    });

const useResetPassword = () => {
    const query = useQueryParams();
    const token = query.get('token') || '';
    const fetcher = getFetcher(token);
    const { data, error } = useSWR(
        `auth/reset/validate?token=${token}`,
        fetcher
    );
    const [loading, setLoading] = useState(!error && !data);

    useEffect(() => {
        setLoading(!error && !data);
    }, [data, error]);

    const invalidToken = !loading && data?.status === 401;

    return [token, data, error, loading, setLoading, invalidToken];
};

export default useResetPassword;
