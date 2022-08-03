import { useState, useCallback, useMemo } from 'react';
import produce from 'immer';

export interface IFormErrors {
    // Get the error message for a field name, if any.
    get(field: string): string | undefined;

    // Set an error message for a field name.
    set(field: string, message: string): void;

    // Remove an existing error for a field name.
    remove(field: string): void;

    // Check if there are any errors.
    some(): boolean;
}

export const useFormErrors = (): IFormErrors => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const get = useCallback(
        (field: string): string | undefined => errors[field],
        [errors]
    );

    const set = useCallback(
        (field: string, message: string): void => {
            setErrors(
                produce(draft => {
                    draft[field] = message;
                })
            );
        },
        [setErrors]
    );

    const remove = useCallback(
        (field: string): void => {
            setErrors(
                produce(draft => {
                    delete draft[field];
                })
            );
        },
        [setErrors]
    );

    const some = useCallback(
        (): boolean => Object.values(errors).some(Boolean),
        [errors]
    );

    return useMemo(
        () => ({
            get,
            set,
            remove,
            some,
        }),
        [get, set, remove, some]
    );
};
