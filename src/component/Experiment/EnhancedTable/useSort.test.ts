import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { useSort } from './useSort';

const data = [
    { name: 'Anna', age: 20 },
    { name: 'Bob', age: 22 },
    { name: 'Charlie', age: 18 },
];

describe('useSort', () => {
    it('should return the same data if default filter is not provided', async () => {
        const { result } = renderHook(() =>
            useSort(data, [{ field: 'age', sort: 'number' }])
        );

        expect(result.current.data).toEqual(data);
    });

    it('should return a sort handler that sorts the data', () => {
        const { result } = renderHook(() =>
            useSort(data, [{ field: 'age', sort: 'number' }])
        );
        expect(result.current.onSort).toBeInstanceOf(Function);

        act(() => {
            result.current.onSort('age');
        });

        expect(result.current.data).toEqual([
            { name: 'Charlie', age: 18 },
            { name: 'Anna', age: 20 },
            { name: 'Bob', age: 22 },
        ]);
    });

    it('should return a sort handler that sorts the data respecting order', () => {
        const { result } = renderHook(() =>
            useSort(data, [{ field: 'age', sort: 'number' }])
        );

        act(() => {
            result.current.onSort('age', 'desc');
        });

        expect(result.current.data).toEqual([
            { name: 'Bob', age: 22 },
            { name: 'Anna', age: 20 },
            { name: 'Charlie', age: 18 },
        ]);
    });

    it('allows to change data', () => {
        const { result, rerender } = renderHook(() =>
            useSort(data, [{ field: 'age', sort: 'number' }])
        );

        rerender([
            [
                { name: 'Anna', age: 25 },
                { name: 'Bob', age: 21 },
            ],
            [{ field: 'age', sort: 'number' }],
        ]);

        expect(result.current.data).toHaveLength(2);
    });
});
