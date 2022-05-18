import { vi } from 'vitest';
import { SWRConfig } from 'swr';
import { usePersistentGlobalState } from './usePersistentGlobalState';
import { act, renderHook } from '@testing-library/react-hooks';

const wrapper = ({ children }: any) => (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
);

describe('usePersistentGlobalState', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return an object with data and mutate properties', () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() =>
            JSON.stringify(undefined)
        );
        const { result } = renderHook(
            () => usePersistentGlobalState('key', {}),
            { wrapper }
        );

        expect(result.current).toEqual({
            data: {},
            mutate: expect.any(Function),
        });
    });

    it('returns default value', () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() =>
            JSON.stringify(undefined)
        );
        const { result } = renderHook(
            () => usePersistentGlobalState('key', { key: 'value' }),
            { wrapper }
        );

        expect(result.current).toEqual({
            data: { key: 'value' },
            mutate: expect.any(Function),
        });
    });

    it('returns a value from local storage', async () => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() =>
            JSON.stringify({ key: 'value' })
        );

        const { result, waitFor } = renderHook(
            () => usePersistentGlobalState('test-key', {}),
            { wrapper }
        );

        await waitFor(() =>
            expect(result.current).toEqual({
                data: { key: 'value' },
                mutate: expect.any(Function),
            })
        );
    });

    it('sets new value to local storage', async () => {
        const setItem = vi.spyOn(Storage.prototype, 'setItem');
        const { result } = renderHook(
            () =>
                usePersistentGlobalState('test-key', { key: 'initial-value' }),
            { wrapper }
        );

        await act(async () => {
            result.current.mutate({ key: 'new-value' });
        });

        expect(setItem).toHaveBeenCalledWith(
            'test-key:usePersistentGlobalState:v1',
            JSON.stringify({ key: 'new-value' })
        );
    });
});
