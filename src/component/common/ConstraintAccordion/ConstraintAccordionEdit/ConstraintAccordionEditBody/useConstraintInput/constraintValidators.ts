import React from 'react';
import semver from 'semver';
import { constraintDateTypeSchema } from 'validationSchemas/constraints';

export const numberValidatorGenerator = (
    value: unknown,
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

export const stringValidatorGenerator = (
    values: string[],
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    return () => {
        if (!Array.isArray(values)) {
            setError('Values must be a list of strings');
            return false;
        }
        return true;
    };
};

export const semVerValidatorGenerator = (
    value: string,
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    return () => {
        if (!semver.valid(value)) {
            setError('Value is not a valid semver');
            return false;
        }
        return true;
    };
};

export const dateValidatorGenerator = (
    value: string,
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    return () => {
        const validationResult = constraintDateTypeSchema.validate(value);

        if (validationResult.error) {
            setError('Value must be a valid date matching RFC3339');
            return false;
        }
        return true;
    };
};
