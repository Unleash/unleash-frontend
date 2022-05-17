import { useNavigate } from 'react-router-dom';
import { getBasePath } from 'utils/formatPath';
import useQueryParams from 'hooks/useQueryParams';
import { usePersistentGlobalState } from './usePersistentGlobalState';

export const usePersistentQuery = (key: string) => {
    const params = useQueryParams();
    const navigate = useNavigate();
    const { data, mutate } = usePersistentGlobalState(
        `${getBasePath()}:${key}:v1`,
        Object.fromEntries(params)
    );

    const setQuery = (newData: { [k: string]: string }, replace = true) => {
        mutate(newData);
        navigate(`?${new URLSearchParams(newData)}`, { replace });
    };

    return [data, setQuery];
};
