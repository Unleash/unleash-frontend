import { useState } from 'react';
import { headers } from '../store/api-helper';

export type ApiRequest = (path: string, options: RequestInit) => Response;

const useRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async (path: string, options: RequestInit) => {
        setError(null);
        setLoading(true);

        const defaultOptions: RequestInit = {
            headers,
            credentials: 'include',
        };

        try {
            const res = await fetch(path, { ...defaultOptions, ...options });
            setLoading(false);
            return res;
        } catch (e) {
            setError(e);
            setLoading(false);
        }
    };

    return { request, loading, error };
};

export default useRequest;
