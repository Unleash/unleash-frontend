import { isValid } from 'date-fns';
import semver from 'semver';

export type ConstraintValidatorOutput = [boolean, string];

export const numberValidatorGenerator = (value: unknown) => {
    return (): ConstraintValidatorOutput => {
        const converted = Number(value);

        if (typeof converted !== 'number' || Number.isNaN(converted)) {
            return [false, 'Value must be a number'];
        }

        return [true, ''];
    };
};

export const stringValidatorGenerator = (values: string[]) => {
    return (): ConstraintValidatorOutput => {
        if (!Array.isArray(values)) {
            return [false, 'Values must be a list of strings'];
        }
        return [true, ''];
    };
};

export const semVerValidatorGenerator = (value: string) => {
    return (): ConstraintValidatorOutput => {
        const cleanValue = semver.clean(value) === value;

        if (!semver.valid(value) || !cleanValue) {
            return [false, 'Value is not a valid semver. For example 1.2.4'];
        }

        return [true, ''];
    };
};

export const dateValidatorGenerator = (value: string) => {
    return (): ConstraintValidatorOutput => {
        if (isValid(value)) {
            return [false, 'Value must be a valid date matching RFC3339'];
        }
        return [true, ''];
    };
};
