import { useEffect, VFC } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import { IFeatureToggleListItem } from 'interfaces/featureToggle';
import { useFeatureEnvironments } from './useFeatureEnvironments';

describe('useFeatureEnvironments', () => {
    it('should return the correct value', () => {
        const { result } = renderHook(() =>
            useFeatureEnvironments({
                type: '-',
                name: 'test',
                createdAt: '',
                environments: [{ name: 'test', enabled: true, sortOrder: 1 }],
            })
        );

        expect(result.current).toEqual(['test']);
    });

    it('should sort environments by `sortOrder`', () => {
        const { result } = renderHook(() =>
            useFeatureEnvironments({
                type: '-',
                name: 'test',
                createdAt: '',
                environments: [
                    { name: 'test-a3', enabled: true, sortOrder: 3 },
                    { name: 'test-b5', enabled: false, sortOrder: 5 },
                    { name: 'test-c1', enabled: true, sortOrder: 1 },
                    { name: 'test-d4', enabled: false, sortOrder: 4 },
                    { name: 'test-e2', enabled: true, sortOrder: 2 },
                ],
            })
        );

        expect(result.current).toEqual([
            'test-c1',
            'test-e2',
            'test-a3',
            'test-d4',
            'test-b5',
        ]);
    });

    it('provides correct value on change', () => {
        const { result, rerender } = renderHook(
            features => useFeatureEnvironments(features),
            {
                initialProps: {
                    type: '-',
                    name: 'test',
                    createdAt: '',
                    environments: [
                        { name: 'test-1', enabled: true, sortOrder: 1 },
                        { name: 'test-2', enabled: true, sortOrder: 2 },
                    ],
                },
            }
        );

        rerender({
            type: '-',
            name: 'test',
            createdAt: '',
            environments: [
                { name: 'test-1', enabled: true, sortOrder: 1 },
                { name: 'test-2', enabled: true, sortOrder: 2 },
                { name: 'test-3', enabled: true, sortOrder: 3 },
            ],
        });

        expect(result.current).toEqual(['test-1', 'test-2', 'test-3']);
    });

    it("should not revalidate if value didn't change", () => {
        let count = 0;

        const Mock: VFC<{ feature: IFeatureToggleListItem }> = ({
            feature,
        }) => {
            const environments = useFeatureEnvironments(feature);

            useEffect(() => {
                count++;
            }, [environments]);

            return <>{JSON.stringify(environments)}</>;
        };

        const { rerender } = render(
            <Mock
                feature={{
                    type: '-',
                    name: 'test',
                    createdAt: '',
                    environments: [
                        { name: 'test1', enabled: true, sortOrder: 1 },
                        { name: 'test2', enabled: false, sortOrder: 2 },
                    ],
                }}
            />
        );

        expect(count).toBe(1);

        rerender(
            <Mock
                feature={{
                    type: 'experimental',
                    name: 'test2',
                    createdAt: '',
                    environments: [
                        { name: 'test2', enabled: false, sortOrder: 2 },
                        { name: 'test1', enabled: true, sortOrder: 1 },
                    ],
                }}
            />
        );

        expect(count).toBe(1);
    });
});
