import { useState } from 'react';

const sortPresetFunctions = {
    string: (a: string, b: string): number => 0, // FIXME: implement
    number: (a: number, b: number): number => a - b,
    date: (a: Date, b: Date): number => 0, // FIXME: implement
};

type NonEmptyArray<T> = [T, ...T[]];

export const useSort = <T extends Record<string, unknown>>(
    data: T[],
    columns: NonEmptyArray<
        | {
              field: keyof T;
              sort: keyof typeof sortPresetFunctions | ((a: T, b: T) => number);
          }
        | {
              field: string;
              sort: (a: T, b: T) => number;
          }
    >,
    defaultSort?: {
        field: keyof T | string; // TODO: warning if not in columns
        order: 'asc' | 'desc';
    }
) => {
    const [sort, setSort] = useState(defaultSort);
    const [sortedData, setSortedData] = useState([...data]);

    const onSort = (field: string, order: 'asc' | 'desc' = 'asc') => {
        const columnOptions = columns.find(col => col.field === field);
        if (!columnOptions) {
            return console.warn('Column not found');
        }

        if (typeof columnOptions.sort === 'string') {
            const sortFunction = sortPresetFunctions[columnOptions.sort];

            setSortedData(prev =>
                prev.sort((a, b) => {
                    if (order === 'desc') {
                        // TODO: deal with sort presets and TS correctly
                        // @ts-expect-error
                        return sortFunction(b[field], a[field]); // arguments reversed for descending
                    }
                    // @ts-expect-error
                    return sortFunction(a[field], b[field]);
                })
            );
        }
    };

    return { data: sortedData, onSort };
};
