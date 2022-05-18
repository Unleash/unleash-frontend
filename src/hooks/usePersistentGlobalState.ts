import React, { useMemo } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import useSWR from 'swr';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/storage';

type UsePersistentGlobalState<T> = () => [
    value: T,
    setValue: React.Dispatch<React.SetStateAction<T>>
];

/**
 * Create a hook that stores global state (shared across all hook instances).
 * The state is also persisted to localStorage and restored on page load.
 * The localStorage state is not synced between tabs.
 *
 * @deprecated
 */
export const createPersistentGlobalStateHook = <T extends object>(
    key: string,
    initialValue: T
): UsePersistentGlobalState<T> => {
    const container = createGlobalState<{ [key: string]: T }>({
        [key]: getLocalStorageItem(key) ?? initialValue,
    });

    const setGlobalState = (value: React.SetStateAction<T>) => {
        const prev = container.getGlobalState(key);
        const next = value instanceof Function ? value(prev) : value;
        container.setGlobalState(key, next);
        setLocalStorageItem(key, next);
    };

    return () => [container.useGlobalState(key)[0], setGlobalState];
};

export const usePersistentGlobalState = <T extends object>(
    key: string,
    initialValue: T
) => {
    const internalKey = `${key}:usePersistentGlobalState:v1`;
    const { data, mutate } = useSWR<T>(internalKey, () => {
        const state = getLocalStorageItem(internalKey) as T;
        if (state !== undefined) {
            return state;
        }

        return initialValue;
    });

    const output = useMemo(
        () => (data === undefined ? initialValue : data),
        [data] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return {
        data: output,
        mutate: (value: T) => {
            setLocalStorageItem(internalKey, value);
            mutate();
        },
    };
};
