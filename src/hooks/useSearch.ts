export const useSearch = (columns: any[], searchValue: string, data: any[]) => {
    if (!searchValue) return data;

    const search = () => {
        const filteredData = filter(columns, searchValue, data);
        const searchedData = searchInFilteredData(
            columns,
            getSearchText(searchValue),
            filteredData
        );

        return searchedData;
    };

    return search();
};

const filter = (columns: any[], searchValue: string, data: any[]) => {
    const filterableColumns = columns.filter(
        column => column.filterName ?? column.isFilter
    );

    let filteredDataSet = data;
    filterableColumns
        .filter(column => isValidFilter(searchValue, column.filterName))
        .forEach(column => {
            const values = searchValue
                .split(`${column.filterName}:`)[1]
                .split(' ')[0]
                .split(',');

            filteredDataSet = filteredDataSet.filter(row => {
                if (column.filterBy) {
                    return column.filterBy(row, values);
                }

                if (typeof column.accessor === 'function') {
                    return defaultFilter(column.accessor(row), values);
                }

                return defaultFilter(row[column.accessor], values);
            });
        });

    return filteredDataSet;
};

const searchInFilteredData = (
    columns: any[],
    searchValue: string,
    filteredData: any[]
) => {
    const searchableColumns = columns.filter(column => column.searchable);

    return filteredData.filter(row => {
        return searchableColumns.some(column => {
            if (typeof column.accessor === 'function') {
                return defaultSearch(column.accessor(row), searchValue);
            }

            return defaultSearch(row[column.accessor], searchValue);
        });
    });
};

const defaultFilter = (fieldValue: string, values: string[]) =>
    values.some(value => fieldValue.toLowerCase() === value.toLowerCase());

const defaultSearch = (fieldValue: string, value: string) =>
    fieldValue.toLowerCase().includes(value.toLowerCase());

export const getSearchText = (searchValue: string) =>
    searchValue
        .split(' ')
        .filter(fragment => !isValidFilter(fragment, '\\w+'))
        .join(' ');

const isValidFilter = (input: string, match: string) =>
    new RegExp(`${match}:\\w+`).test(input);
