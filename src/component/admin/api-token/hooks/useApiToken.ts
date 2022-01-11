import { useEffect, useState } from 'react';

const useApiToken = (
    initialUserName = '',
    initialtype = '',
) => {
    const [username, setUsername] = useState(initialUserName);
    const [type, setType] = useState(initialtype);
    const [errors, setErrors] = useState({});


    useEffect(() => {
        setUsername(initialUserName);
    }, [initialUserName]);

    useEffect(() => {
        setType(initialtype);
    }, [initialtype]);



    const getProjectRolePayload = () => {
        return {
            username: username,
            type: type,
        };
    };

    const clearErrors = () => {
        setErrors({});
    };

    return {
        username,
        type,
        setUsername,
        setType,
        getProjectRolePayload,
        clearErrors,
        errors,
    };
};

export default useApiToken;
