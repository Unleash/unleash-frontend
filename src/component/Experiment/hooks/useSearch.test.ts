import { renderHook, act } from '@testing-library/react-hooks';
import { useSearch } from './useSearch';

const data = [
    { name: 'Dave', job: 'Engineer', age: 2 },
    { name: 'Anna', job: 'Manager', age: 3 },
    { name: 'Charlie', job: 'Manager', age: 4 },
    { name: 'Bob', job: 'Engineer', age: 2 },
    { name: 'Elijah', job: 'Manager', age: 1 },
];

describe('useSearch', () => {
    it('should return the same data if default search is not provided', async () => {
        const { result } = renderHook(() => useSearch(data));

        expect(result.current.data).toEqual(data);
    });

    it('should return a search handler that searches the data', () => {
        const { result } = renderHook(() => useSearch(data));
        expect(result.current.onSearch).toBeInstanceOf(Function);

        act(() => {
            result.current.onSearch('bob');
        });

        expect(result.current.data).toEqual([
            { name: 'Bob', job: 'Engineer', age: 2 },
        ]);
    });

    it('should return a search handler that searches the data on all columns when no options are set', () => {
        const { result } = renderHook(() => useSearch(data));

        act(() => {
            result.current.onSearch('i');
        });

        expect(result.current.data).toEqual([
            { name: 'Dave', job: 'Engineer', age: 2 },
            { name: 'Charlie', job: 'Manager', age: 4 },
            { name: 'Bob', job: 'Engineer', age: 2 },
            { name: 'Elijah', job: 'Manager', age: 1 },
        ]);
    });

    it('should return a search handler that searches the data by searching fields that are not text', () => {
        const { result } = renderHook(() => useSearch(data));

        act(() => {
            result.current.onSearch('2');
        });

        expect(result.current.data).toEqual([
            { name: 'Dave', job: 'Engineer', age: 2 },
            { name: 'Bob', job: 'Engineer', age: 2 },
        ]);
    });

    it('should support an optional default search state', () => {
        const { result } = renderHook(() =>
            useSearch(data, { defaultSearch: 'manager' })
        );

        expect(result.current.data).toEqual([
            { name: 'Anna', job: 'Manager', age: 3 },
            { name: 'Charlie', job: 'Manager', age: 4 },
            { name: 'Elijah', job: 'Manager', age: 1 },
        ]);
    });

    it('should support searching only on select columns', () => {
        const { result } = renderHook(() =>
            useSearch(data, { columns: ['name'] })
        );

        act(() => {
            result.current.onSearch('i');
        });

        expect(result.current.data).toEqual([
            { name: 'Charlie', job: 'Manager', age: 4 },
            { name: 'Elijah', job: 'Manager', age: 1 },
        ]);
    });

    it('should support custom search implementations', () => {
        const { result } = renderHook(() =>
            useSearch(data, {
                searchFunction: (data, search) =>
                    data.filter(item => item.job[0] === search && item.age < 3),
            })
        );

        act(() => {
            result.current.onSearch('E');
        });

        expect(result.current.data).toEqual([
            { name: 'Dave', job: 'Engineer', age: 2 },
            { name: 'Bob', job: 'Engineer', age: 2 },
        ]);
    });

    it('allows to change data', () => {
        const { result, rerender } = renderHook(
            props => useSearch(props.data),
            {
                initialProps: {
                    data,
                },
            }
        );
        rerender({
            data: [
                { name: 'Francis', job: 'CEO', age: 7 },
                { name: 'Elijah', job: 'Manager', age: 1 },
            ],
        });

        expect(result.current.data).toEqual([
            { name: 'Francis', job: 'CEO', age: 7 },
            { name: 'Elijah', job: 'Manager', age: 1 },
        ]);
    });

    it('changing data should preserve and apply search', () => {
        const { result, rerender } = renderHook(
            props => useSearch(props.data, props.searchOptions),
            {
                initialProps: {
                    data,
                    searchOptions: { defaultSearch: 'ceo' as const },
                },
            }
        );
        rerender({
            data: [
                { name: 'Francis', job: 'CEO', age: 7 },
                { name: 'Elijah', job: 'Manager', age: 1 },
            ],
            searchOptions: { defaultSearch: 'ceo' as const },
        });

        expect(result.current.data).toEqual([
            { name: 'Francis', job: 'CEO', age: 7 },
        ]);
    });

    it('changing data should not change internal search state', () => {
        const { result, rerender } = renderHook(() => useSearch(data));

        act(() => {
            result.current.onSearch('engi');
        });

        rerender({
            data: [
                { name: 'Dave', job: 'Engineer', age: 2 },
                { name: 'Anna', job: 'Manager', age: 3 },
                { name: 'Bob', job: 'Engineer', age: 2 },
            ],
        });

        expect(result.current.search).toEqual('engi');
        expect(result.current.data).toEqual([
            { name: 'Dave', job: 'Engineer', age: 2 },
            { name: 'Bob', job: 'Engineer', age: 2 },
        ]);
    });
});
