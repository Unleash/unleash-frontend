import useSWR, { mutate } from 'swr';
import { useCallback, useMemo } from 'react';
import { formatApiPath } from '../../../../utils/format-path';
import {
    IAuthDetails,
    IAuthStatus,
    IUserResponse,
} from '../../../../interfaces/user';

export interface IUseUserOutput {
    auth?: IAuthStatus;
    refetchAuth: () => void;
    loading: boolean;
    error?: Error;
}

export const useAuth = (): IUseUserOutput => {
    const { data, error } = useSWR<IUserResponse | IAuthDetails>(
        USER_CACHE_KEY,
        fetchAuthStatus,
        swrConfig
    );

    const auth: IAuthStatus | undefined = useMemo(
        () => data && parseAuthResponse(data),
        [data]
    );

    const refetchAuth = useCallback(() => {
        mutate(USER_CACHE_KEY).catch(console.warn);
    }, []);

    return {
        auth,
        refetchAuth,
        loading: !error && !data,
        error,
    };
};

const parseAuthResponse = (data: IUserResponse | IAuthDetails): IAuthStatus => {
    if ('user' in data) {
        return {
            profile: data.user,
            permissions: data.permissions,
            feedback: data.feedback,
            splash: data.splash,
        };
    }

    return {
        authDetails: data,
        permissions: [],
        feedback: [],
        splash: {},
    };
};

const fetchAuthStatus = (): Promise<IUserResponse | IAuthDetails> => {
    return fetch(USER_CACHE_KEY).then(res => res.json());
};

const swrConfig = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 15000,
};

export const USER_CACHE_KEY = formatApiPath(`api/admin/user`);
