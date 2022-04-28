import { renderHook, act } from '@testing-library/react-hooks';
import { useSortableHeaders } from './useSortableHeaders';

const data = [
    { id: 3, name: 'c', age: 3 },
    { id: 2, name: 'b', age: 2 },
    { id: 4, name: 'd', age: 4 },
    { id: 1, name: 'a', age: 1 },
    { id: 5, name: 'e', age: 5 },
];

describe('useSortableHeaders', () => {
    it('works', () => {
        const { result } = renderHook(() =>
            useSortableHeaders(data, { name: true })
        );

        expect(result.current.headerProps).toBeDefined();
    });

    it('sorts', () => {
        const { result } = renderHook(() =>
            useSortableHeaders(
                data,
                { name: true },
                { field: 'name', order: 'asc' }
            )
        );

        expect(result.current.data).toEqual([
            { id: 1, name: 'a', age: 1 },
            { id: 2, name: 'b', age: 2 },
            { id: 3, name: 'c', age: 3 },
            { id: 4, name: 'd', age: 4 },
            { id: 5, name: 'e', age: 5 },
        ]);
    });

    it('adds headerProps', () => {
        const { result } = renderHook(() =>
            useSortableHeaders(
                data,
                { name: true },
                { field: 'name', order: 'asc' }
            )
        );

        expect(result.current.headerProps).toEqual({
            name: {
                isSortable: true,
                sortOrder: 'asc',
                onSort: expect.any(Function),
            },
        });
    });

    it('has all properties', () => {
        const { result } = renderHook(() =>
            useSortableHeaders(data, { name: true, age: 'number' })
        );

        act(() => {
            result.current.onSort('age', 'desc');
        });
        expect(result.current.data).toBeDefined();
        expect(result.current.sort).toEqual({ field: 'age', order: 'desc' });
        expect(result.current.onSort).toEqual(expect.any(Function));
    });

    it('updates headerProps', () => {
        const { result } = renderHook(() =>
            useSortableHeaders(data, { name: true, age: 'number' })
        );

        act(() => {
            result.current.onSort('age', 'desc');
        });
        expect(result.current.sort).toBeDefined();
        expect(result.current.headerProps).toEqual({
            name: {
                isSortable: true,
                onSort: expect.any(Function),
            },
            age: {
                isSortable: true,
                sortOrder: 'desc',
                onSort: expect.any(Function),
            },
        });

        act(() => {
            result.current.onSort('name', 'desc');
        });
        expect(result.current.headerProps).toEqual({
            name: {
                isSortable: true,
                sortOrder: 'desc',
                onSort: expect.any(Function),
            },
            age: {
                isSortable: true,
                onSort: expect.any(Function),
            },
        });
    });

    it('has working handler on headers', () => {
        const { result } = renderHook(() =>
            useSortableHeaders(data, { name: true, age: 'number' })
        );

        act(() => {
            result.current.headerProps.age.onSort();
        });
        expect(result.current.sort).toEqual({ field: 'age', order: 'asc' });
        expect(result.current.data).toEqual([
            { id: 1, name: 'a', age: 1 },
            { id: 2, name: 'b', age: 2 },
            { id: 3, name: 'c', age: 3 },
            { id: 4, name: 'd', age: 4 },
            { id: 5, name: 'e', age: 5 },
        ]);

        act(() => {
            result.current.headerProps.age.onSort();
        });
        expect(result.current.sort).toEqual({ field: 'age', order: 'desc' });
        expect(result.current.data).toEqual([
            { id: 5, name: 'e', age: 5 },
            { id: 4, name: 'd', age: 4 },
            { id: 3, name: 'c', age: 3 },
            { id: 2, name: 'b', age: 2 },
            { id: 1, name: 'a', age: 1 },
        ]);

        act(() => {
            result.current.headerProps.name.onSort();
        });
        expect(result.current.sort).toEqual({ field: 'name', order: 'asc' });
    });
});
