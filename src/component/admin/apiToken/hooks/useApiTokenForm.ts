import { useEffect, useState } from 'react';
import { useEnvironments } from 'hooks/api/getters/useEnvironments/useEnvironments';
import { IApiTokenCreate } from 'hooks/api/actions/useApiTokensApi/useApiTokensApi';

export const useApiTokenForm = () => {
    const { environments } = useEnvironments();
    const initialEnvironment = environments?.find(e => e.enabled)?.name;

    const [username, setUsername] = useState('');
    const [type, setType] = useState('CLIENT');
    const [project, setProject] = useState<string | string[]>('*');
    const [environment, setEnvironment] = useState<string>();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setEnvironment(type === 'ADMIN' ? '*' : initialEnvironment);
    }, [type, initialEnvironment]);

    const setTokenType = (value: string) => {
        if (value === 'ADMIN') {
            setType(value);
            setProject('*');
            setEnvironment('*');
        } else {
            setType(value);
            setEnvironment(initialEnvironment);
        }
    };

    const getApiTokenPayload = (): IApiTokenCreate => ({
        username,
        type,
        environment,
        ...(typeof project === 'string' ? { project } : { projects: project }),
    });

    const isValid = () => {
        if (!username) {
            setErrors({ username: 'Username is required.' });
            return false;
        } else {
            setErrors({});
            return true;
        }
    };

    const clearErrors = () => {
        setErrors({});
    };

    return {
        username,
        type,
        project,
        environment,
        setUsername,
        setTokenType,
        setProject,
        setEnvironment,
        getApiTokenPayload,
        isValid,
        clearErrors,
        errors,
    };
};
