import React, { useCallback, useMemo } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import useSWR from 'swr';
import { getBasePath } from 'utils/formatPath';
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
    const internalKey = `${getBasePath()}:${key}:usePersistentGlobalState:v1`;
    const { data, mutate } = useSWR<T>(internalKey, () => {
        const state = getLocalStorageItem(internalKey) as T;
        if (state !== undefined) {
            return state;
        }

        return initialValue;
    });

    const output = useMemo(() => {
        if (data) {
            return data;
        }
        const state = getLocalStorageItem(internalKey);
        if (state) {
            return state as T;
        }
        return initialValue;
    }, [data, initialValue, internalKey]);

    const onUpdate = useCallback(
        (value: T) => {
            setLocalStorageItem(internalKey, value);
            mutate();
        },
        [mutate, internalKey]
    );

    return {
        data: output,
        mutate: onUpdate,
    };
};
