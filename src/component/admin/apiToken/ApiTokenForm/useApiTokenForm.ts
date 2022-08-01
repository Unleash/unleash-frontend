import { useEffect, useState } from 'react';
import { IApiTokenCreate } from 'hooks/api/actions/useApiTokensApi/useApiTokensApi';
import { useEnvironments } from 'hooks/api/getters/useEnvironments/useEnvironments';

export type ApiTokenFormErrorType = 'username' | 'projects' | 'environments';

export const useApiTokenForm = () => {
    const { environments: allEnvironments } = useEnvironments();

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
        if (type === 'CLIENT') {
            const initialEnvironment = allEnvironments?.find(
                e => e.enabled
            )?.name;
            setEnvironments(initialEnvironment ? [initialEnvironment] : []);
        }
    }, [type, allEnvironments]);

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
        isValid,
        clearErrors,
        errors,
    };
};
