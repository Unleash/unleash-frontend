import { FC, useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { TableSearchField } from './TableSearchField/TableSearchField';

interface ITableSearchProps {
    initialValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

export const TableSearch: FC<ITableSearchProps> = ({
    initialValue,
    onChange = () => {},
    placeholder = 'Search',
}) => {
    const [searchInputState, setSearchInputState] = useState(initialValue);
    const debouncedOnSearch = useAsyncDebounce(onChange, 200);

    const onSearchChange = (value: string) => {
        debouncedOnSearch(value);
        setSearchInputState(value);
    };

    return (
        <TableSearchField
            value={searchInputState!}
            onChange={onSearchChange}
            placeholder={`${placeholder}…`}
        />
    );
};
