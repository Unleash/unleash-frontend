import { useMemo } from 'react';
import { sortPresetFunctions, useSort } from './useSort';

export const useSortableHeaders = <
    T extends Record<string, any>,
    K extends string
>(
    data: T[],
    columns:
        | Partial<
              Record<
                  keyof T,
                  | true
                  | keyof typeof sortPresetFunctions
                  | ((a: T, b: T) => number)
              >
          >
        | Record<K, (a: T, b: T) => number>,
    defaultSort?: {
        field: K;
        order?: 'asc' | 'desc';
    }
) => {
    const { sort, onSort, ...out } = useSort(data, columns, defaultSort);
    const headerProps = useMemo(
        () =>
            Object.fromEntries(
                Object.entries(columns).map(([field]) => [
                    field,
                    {
                        isSortable: true,
                        onSort: () => {
                            onSort(
                                field as K,
                                sort?.order === 'asc' ? 'desc' : 'asc'
                            );
                        },
                        sortOrder:
                            sort?.field === field ? sort?.order : undefined,
                    },
                ])
            ),
        [columns, onSort, sort?.field, sort?.order]
    );

    return { sort, onSort, ...out, headerProps };
};
