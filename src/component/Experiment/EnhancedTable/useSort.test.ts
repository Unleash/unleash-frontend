import { renderHook, act } from '@testing-library/react-hooks';
import { useEffect, useState } from 'react';
import { useSort } from './useSort';

const data = [
    { name: 'Dave', age: 2 },
    { name: 'Anna', age: 3 },
    { name: 'Charlie', age: 4 },
    { name: 'Bob', age: 2 },
    { name: 'Elijah', age: 1 },
];

describe('useSort', () => {
    it('should return the same data if default filter is not provided', async () => {
        const { result } = renderHook(() => useSort(data, { age: 'number' }));

        expect(result.current.data).toEqual(data);
    });
    it('should', async () => {
        const { result } = renderHook(() => {
            const [s, x] = useState(1);
            useEffect(() => {
                x(2);
            }, []);
            return s;
        });

        expect(result.current).toEqual(2);
    });

    it('should return a sort handler that sorts the data', () => {
        const { result } = renderHook(() => useSort(data, { age: 'number' }));
        expect(result.current.onSort).toBeInstanceOf(Function);

        act(() => {
            result.current.onSort('age');
        });

        expect(result.current.data).toEqual([
            { name: 'Elijah', age: 1 },
            { name: 'Dave', age: 2 },
            { name: 'Bob', age: 2 },
            { name: 'Anna', age: 3 },
            { name: 'Charlie', age: 4 },
        ]);
    });

    it('should return a sort handler that sorts the data respecting order', () => {
        const { result } = renderHook(() => useSort(data, { age: 'number' }));

        act(() => {
            result.current.onSort('age', 'desc');
        });

        expect(result.current.data).toEqual([
            { name: 'Charlie', age: 4 },
            { name: 'Anna', age: 3 },
            { name: 'Dave', age: 2 },
            { name: 'Bob', age: 2 },
            { name: 'Elijah', age: 1 },
        ]);
    });

    it('allows to change data', () => {
        const { result, rerender } = renderHook(
            props => useSort(props.data, props.columns),
            {
                initialProps: { data, columns: { age: 'number' as const } },
            }
        );
        rerender({
            data: [
                { name: 'Anna', age: 25 },
                { name: 'Bob', age: 21 },
            ],
            columns: { age: 'number' },
        });

        expect(result.current.data).toHaveLength(2);
        expect(result.current.data).toEqual([
            { name: 'Anna', age: 25 },
            { name: 'Bob', age: 21 },
        ]);
    });

    it('changing data should preserve and apply sort', () => {
        const defaultSort = { field: 'age' };
        const { result, rerender } = renderHook(
            props => useSort(props.data, props.columns, props.defaultSort),
            {
                initialProps: {
                    data,
                    columns: { age: 'number' } as const,
                    defaultSort,
                },
            }
        );
        rerender({
            data: [
                { name: 'Anna', age: 22 },
                { name: 'Bob', age: 21 },
            ],
            columns: { age: 'number' },
            defaultSort,
        });

        expect(result.current.data).toHaveLength(2);
        expect(result.current.data).toEqual([
            { name: 'Bob', age: 21 },
            { name: 'Anna', age: 22 },
        ]);
    });

    it('changing data should not change internal filter state', () => {
        const { result, rerender } = renderHook(
            props => useSort(props.data, props.columns),
            {
                initialProps: {
                    data,
                    columns: { age: 'number' } as const,
                },
            }
        );

        act(() => {
            result.current.onSort('age', 'desc');
        });

        rerender({
            data: [
                { name: 'Bob', age: 21 },
                { name: 'Anna', age: 22 },
            ],
            columns: { age: 'number' },
        });

        expect(result.current.sort).toEqual({
            field: 'age',
            order: 'desc',
        });
        expect(result.current.data).toEqual([
            { name: 'Anna', age: 22 },
            { name: 'Bob', age: 21 },
        ]);
    });
});
