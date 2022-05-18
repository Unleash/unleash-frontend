import { useNavigate } from 'react-router-dom';
import { getBasePath } from 'utils/formatPath';
import useQueryParams from 'hooks/useQueryParams';
import { usePersistentGlobalState } from './usePersistentGlobalState';
import { useCallback } from 'react';

export const usePersistentQuery = <T extends Record<string, string>>(
    key: string
) => {
    const params = useQueryParams();
    const navigate = useNavigate();
    const { data, mutate } = usePersistentGlobalState(
        `${getBasePath()}:${key}:v1`,
        Object.fromEntries(params)
    );

    const setQuery = useCallback<(newData: T, replace?: boolean) => void>(
        (newData, replace = true) => {
            if (
                Object.keys(newData).length === Object.keys(data).length &&
                Object.entries(newData).every(
                    ([key, value]) =>
                        data.hasOwnProperty(key) && data[key] === value
                )
            ) {
                navigate(`?${new URLSearchParams(newData)}`, { replace: true });
                return;
            }
            mutate(newData);
            navigate(`?${new URLSearchParams(newData)}`, { replace });
        },
        [mutate, navigate] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return [data as T, setQuery] as const;
};
