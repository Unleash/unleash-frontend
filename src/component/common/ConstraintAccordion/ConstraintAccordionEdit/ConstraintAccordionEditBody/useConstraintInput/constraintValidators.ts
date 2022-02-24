import React from 'react';

export const numberValidatorGenerator = (
    value: any,
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    return () => {
        if (!Number(value)) {
            setError('Value must be a number');
            return false;
        }

        return true;
    };
};

export const stringValidatorGenerator = (values: string[], setError) => {
    return () => {
        if (!Array.isArray(values)) {
            setError('Values must be a list of strings');
            return false;
        }
        return true;
    };
};

export const semVerValidatorGenerator = (value: string, setError) => {
    return () => {
        return true;
        // Validate semver here
    };
};

export const dateValidatorGenerator = (value: string, setError) => {
    return () => {
        return true;
        // Validate date
    };
};
