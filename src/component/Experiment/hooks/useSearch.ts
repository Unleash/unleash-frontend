import { useMemo, useState } from 'react';

export interface ISearchOptions<
    T extends Record<string, any>,
    K extends string
> {
    columns?: Readonly<K[]>;
    readonly searchFunction?: (data: T[], search: string) => T[];
    readonly defaultSearch?: string;
}

const search = <T extends Record<string, any>, K extends string>(
    data: T[],
    search: string,
    searchOptions?: Partial<ISearchOptions<T, K>>
) => {
    if (!search) return data;

    if (searchOptions?.searchFunction) {
        return searchOptions?.searchFunction(data, search);
    }

    try {
        const searchColumns = searchOptions?.columns ?? Object.keys(data[0]);
        const regExp = new RegExp(search, 'i');
        return data.filter(a => {
            return searchColumns.some(column => {
                return regExp.test(a[column] ? a[column].toString() : '');
            });
        });
    } catch (err) {
        if (err instanceof SyntaxError) {
            return data;
        } else {
            throw err;
        }
    }
};

export const useSearch = <T extends Record<string, any>, K extends string>(
    data: T[],
    searchOptions?: ISearchOptions<T, K>
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
