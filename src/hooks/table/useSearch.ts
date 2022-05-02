import { useMemo, useState } from 'react';

export interface ISearchOptions<T extends Record<string, any>> {
    columns?: (keyof T)[];
    readonly searchFunction?: (data: T[], search: string) => T[];
    readonly defaultSearch?: string;
}

const search = <T extends Record<string, any>>(
    data: T[],
    search: string,
    searchOptions?: Partial<ISearchOptions<T>>
) => {
    if (!search) return data;

    if (searchOptions?.searchFunction) {
        return searchOptions?.searchFunction(data, search);
    }

    const searchColumns =
        searchOptions?.columns ?? (Object.keys(data[0]) as (keyof T)[]);
    return data.filter(a => {
        return searchColumns.some((column: keyof T) => {
            return (a[column] ? a[column].toString() : '')
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    });
};

export const useSearch = <T extends Record<string, any>>(
    data: T[],
    searchOptions?: ISearchOptions<T>
) => {
    const [searchState, setSearchState] = useState<string>(
        searchOptions?.defaultSearch ?? ''
    );

    const searchedData = useMemo(
        () => search(data, searchState, searchOptions),
        [data, searchState] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return {
        data: searchedData,
        onSearch: setSearchState,
        search: searchState,
    };
};
