import deepClone from 'lodash.clonedeep';
import { useEffect, useState } from 'react';

const sortPresetFunctions = {
    string: (a: string, b: string): number => 0, // FIXME: implement
    number: (a: number, b: number): number => a - b,
    date: (a: Date, b: Date): number => 0, // FIXME: implement
};

const sort = <T extends string>(
    columns: Partial<
        Record<
            T,
            | true
            | keyof typeof sortPresetFunctions
            | ((a: Record<T, unknown>, b: Record<T, unknown>) => number)
        >
    >,
    field: T,
    order: 'asc' | 'desc' = 'asc',
    data: Record<string, unknown>[]
) => {
    if (!field) return data;

    const sortFunction = columns[field];

    if (sortFunction instanceof Function) {
        return data.sort((a, b) => {
            if (order === 'desc') {
                return sortFunction(b, a); // arguments reversed for descending
            }
            return sortFunction(a, b);
        });
    }

    const sortPreset =
        sortFunction === true
            ? sortPresetFunctions['string']
            : sortPresetFunctions[
                  sortFunction as keyof typeof sortPresetFunctions
              ];

    return data.sort((a, b) => {
        if (order === 'desc') {
            // @ts-expect-error cannot infer sortPresetFunctions
            return sortPreset(b[field], a[field]);
        }
        // @ts-expect-error cannot infer sortPresetFunctions
        return sortPreset(a[field], b[field]);
    });
};

export const useSort = <T extends string>(
    data: Record<T | string, unknown>[],
    columns: Partial<
        Record<
            T,
            | true
            | keyof typeof sortPresetFunctions
            | ((a: Record<T, unknown>, b: Record<T, unknown>) => number)
        >
    >,
    defaultSort?: {
        field: T;
        order?: 'asc' | 'desc';
    }
) => {
    const [sortState, setSortState] = useState(defaultSort);
    const [stableSortedData, setStableSortedData] = useState<typeof data>([]);

    useEffect(() => {
        setStableSortedData(
            sortState?.field
                ? sort(
                      columns,
                      sortState?.field,
                      sortState?.order || 'asc',
                      deepClone(data)
                  )
                : deepClone(data)
        );
    }, [data, setStableSortedData]); // eslint-disable-line react-hooks/exhaustive-deps

    const onSort = (
        field: keyof typeof columns,
        order: 'asc' | 'desc' = 'asc'
    ) => {
        setSortState({ field, order });
        setStableSortedData(prev => sort(columns, field, order, prev));
        return stableSortedData;
    };

    return { data: stableSortedData, onSort, sort: sortState };
};
