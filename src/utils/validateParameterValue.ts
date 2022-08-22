import {
    IStrategyParameter,
    IFeatureStrategyParameters,
} from 'interfaces/strategy';

export const validateParameterValue = (
    definition: Pick<IStrategyParameter, 'type' | 'required'>,
    value: IFeatureStrategyParameters[string]
): string | undefined => {
    const { type, required } = definition;

    if (shouldValidateRequired(type) && required && value === '') {
        return 'Field is required';
    }

    if (shouldValidateNumeric(type) && !isValidNumberOrEmpty(value)) {
        return 'Not a valid number.';
    }

    if (type === 'boolean' && !isValidBooleanOrEmpty(value)) {
        return 'Not a valid boolean.';
    }
};

// The components for booleans and percentages can't yet show error messages.
// We should not enforce `required` until these errors can be shown in the UI.
const shouldValidateRequired = (type: string): boolean => {
    return type === 'string' || type === 'list' || type === 'number';
};

const shouldValidateNumeric = (type: string): boolean => {
    return type === 'percentage' || type === 'number';
};

const isValidNumberOrEmpty = (value: string | number | undefined): boolean => {
    return value === '' || /^\d+$/.test(String(value));
};

const isValidBooleanOrEmpty = (value: string | number | undefined): boolean => {
    return value === '' || value === 'true' || value === 'false';
};
