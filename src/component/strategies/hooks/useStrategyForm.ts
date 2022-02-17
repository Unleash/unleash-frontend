import { useEffect, useState } from 'react';

export const useStrategyForm = (
    initialStrategyName = '',
    initialStrategyDesc = '',
    initialParams = []
) => {
    const [strategyName, setStrategyName] = useState(initialStrategyName);
    const [strategyDesc, setStrategyDesc] = useState(initialStrategyDesc);
    const [params, setParams] = useState(initialParams);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setStrategyName(initialStrategyName);
    }, [initialStrategyName]);

    useEffect(() => {
        setStrategyDesc(initialStrategyDesc);
    }, [initialStrategyDesc]);

    useEffect(() => {
        setParams(initialParams);
    }, [JSON.stringify(initialParams)]);

    const getStrategyPayload = () => {
        return {
            name: strategyName,
            description: strategyDesc,
            parameters: params,
        };
    };

    const NAME_EXISTS_ERROR = 'A context field with that name already exist';

    const validateNameUniqueness = async () => {
        // try {
        //     await validatestrategyName(strategyName);
        // } catch (e: any) {
        //     if (e.toString().includes(NAME_EXISTS_ERROR)) {
        //         setErrors(prev => ({
        //             ...prev,
        //             name: 'A context field with that name already exist',
        //         }));
        //     }
        // }
    };

    const validateName = () => {
        if (strategyName.length === 0) {
            setErrors(prev => ({ ...prev, name: 'Name can not be empty.' }));
            return false;
        }
        return true;
    };

    const clearErrors = () => {
        setErrors({});
    };

    return {
        strategyName,
        strategyDesc,
        params,
        setStrategyName,
        setStrategyDesc,
        setParams,
        getStrategyPayload,
        validateNameUniqueness,
        validateName,
        setErrors,
        clearErrors,
        errors,
    };
};
