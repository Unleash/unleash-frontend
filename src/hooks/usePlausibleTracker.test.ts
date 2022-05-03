import { renderHook } from '@testing-library/react-hooks';
import {
    usePlausibleTracker,
    enablePlausibleTracker,
    isTrackingLocalhost,
    isUnleashSaasDomain,
} from 'hooks/usePlausibleTracker';

test('usePlausibleTracker', async () => {
    const { result } = renderHook(() => usePlausibleTracker());
    expect(result.current).toBeUndefined();
});

test('shouldEnablePlausibleTracker', async () => {
    expect(enablePlausibleTracker()).toEqual(false);
});

test('isUnleashSaasDomain', async () => {
    expect(isUnleashSaasDomain()).toEqual(false);
    expect(isUnleashSaasDomain('example.com')).toEqual(false);
    expect(isUnleashSaasDomain('unleash-hosted.com')).toEqual(false);
    expect(isUnleashSaasDomain('app-unleash-hosted.com')).toEqual(false);
    expect(isUnleashSaasDomain('app.unleash-hosted.com')).toEqual(true);
});

test('isTrackingLocalhost', async () => {
    expect(isTrackingLocalhost()).toEqual(false);
});
