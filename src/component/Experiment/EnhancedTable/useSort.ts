import { useState } from 'react';

const sortPresetFunctions = {
    string: (a: string, b: string): number => 0, // FIXME: implement
    number: (a: number, b: number): number => 0, // FIXME: implement
    date: (a: Date, b: Date): number => 0, // FIXME: implement
};

// ...features/table?sort=name&sortOrder=desc

type NonEmptyArray<T> = [T, ...T[]];

export const useSort = <T extends Record<string, unknown>>(
    data: T[],
    columns: NonEmptyArray<
        | {
              field: keyof T;
              sort: keyof typeof sortPresetFunctions;
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

    const onSort = (field: string, order: 'asc' | 'desc') => {};

    return { data, onSort };
};
