import deepClone from 'lodash.clonedeep';
import { useEffect, useState } from 'react';

export const sortPresetFunctions = {
    string: (a: string, b: string): number =>
        a?.toLowerCase()?.localeCompare(b?.toLowerCase()),
    number: (a: number, b: number): number => a - b,
    date: (a: Date, b: Date): number => a?.getTime() - b?.getTime(), // TODO: test
};

const sort = <T extends Record<string, any>, K extends string>(
    columns: Partial<
        Record<
            K,
            true | keyof typeof sortPresetFunctions | ((a: T, b: T) => number)
        >
    >,
    field: K,
    order: 'asc' | 'desc' = 'asc',
    data: T[]
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
            // @ts-expect-error -- cannot infer sortPresetFunctions
            return sortPreset(b[field], a[field]);
        }
        // @ts-expect-error -- cannot infer sortPresetFunctions
        return sortPreset(a[field], b[field]);
    });
};

export const useSort = <T extends Record<string, any>, K extends string>(
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
    const [sortState, setSortState] = useState(defaultSort);
    const [stableSortedData, setStableSortedData] = useState<T[]>([]);

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
