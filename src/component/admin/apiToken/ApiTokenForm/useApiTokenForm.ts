import { useEffect, useState } from 'react';
import { IApiTokenCreate } from 'hooks/api/actions/useApiTokensApi/useApiTokensApi';
import { useEnvironments } from 'hooks/api/getters/useEnvironments/useEnvironments';
import { oneOf } from 'utils/oneOf';

export type ApiTokenFormErrorType = 'username' | 'projects' | 'environments';

export const useApiTokenForm = () => {
    const { environments: allEnvironments } = useEnvironments();
    const [metadata, setMetadata] = useState({});
    const [username, setUsername] = useState('');
    const [type, setType] = useState('CLIENT');
    const [projects, setProjects] = useState<string[]>(['*']);
    const [memorizedProjects, setMemorizedProjects] =
        useState<string[]>(projects);
    const [environments, setEnvironments] = useState<string[]>(['*']);
    const [memorizedEnvironments, setMemorizedEnvironments] =
        useState<string[]>(environments);
    const [errors, setErrors] = useState<
        Partial<Record<ApiTokenFormErrorType, string>>
    >({});

    useEffect(() => {
        if (oneOf(['CLIENT', 'PROXY'], type)) {
            const initialEnvironment = allEnvironments?.find(
                e => e.enabled
            )?.name;
            setEnvironments(initialEnvironment ? [initialEnvironment] : []);
        }
    }, [type, allEnvironments]);

    useEffect(() => {
        setMetadata({});
    }, [type]);

    const setTokenType = (value: string) => {
        if (value === 'ADMIN') {
            setType(value);
            setMemorizedProjects(projects);
            setMemorizedEnvironments(environments);
            setProjects(['*']);
            setEnvironments(['*']);
        } else {
            setType(value);
            setProjects(memorizedProjects);
            setEnvironments(memorizedEnvironments);
        }
    };

    const getApiTokenPayload = (): IApiTokenCreate => ({
        username,
        type,
        projects,
        environments,
        metadata,
    });

    const isValid = () => {
        const newErrors: Partial<Record<ApiTokenFormErrorType, string>> = {};
        if (!username) {
            newErrors['username'] = 'Username is required';
        }
        if (projects.length === 0) {
            newErrors['projects'] = 'At least one project is required';
        }
        if (environments.length === 0) {
            newErrors['environments'] = 'At least one environment is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearErrors = (error?: ApiTokenFormErrorType) => {
        if (error) {
            const newErrors = { ...errors };
            delete newErrors[error];
            setErrors(newErrors);
        } else {
            setErrors({});
        }
    };

    return {
        username,
        type,
        projects,
        environments,
        setUsername,
        setTokenType,
        setProjects,
        setEnvironments,
        getApiTokenPayload,
        setMetadata,
        metadata,
        isValid,
        clearErrors,
        errors,
    };
};
