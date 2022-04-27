import { renderHook, act } from '@testing-library/react-hooks';
import { useSort } from './useSort';

const data = [
    { name: 'John', age: 20 },
    { name: 'Jane', age: 22 },
    { name: 'Joe', age: 18 },
];

describe('useSort', () => {
    it('should return the same data if default filter is not provided', () => {
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
            { name: 'Joe', age: 18 },
            { name: 'John', age: 20 },
            { name: 'Jane', age: 22 },
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
            { name: 'Jane', age: 22 },
            { name: 'John', age: 20 },
            { name: 'Joe', age: 18 },
        ]);
    });
});
