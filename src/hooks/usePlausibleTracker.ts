import Plausible from 'plausible-tracker';
import { useEffect } from 'react';

const PLAUSIBLE_UNLEASH_API_HOST = 'https://plausible.getunleash.io';
const PLAUSIBLE_UNLEASH_DOMAIN = 'app.unleash-hosted.com';
const PLAUSIBLE_TRACK_LOCALHOST = false;

export const usePlausibleTracker = () => {
    const enable = enablePlausibleTracker();

    useEffect(() => {
        if (enable) {
            try {
                return initPlausibleTracker();
            } catch (error) {
                console.warn(error);
            }
        }
    }, [enable]);
};

const initPlausibleTracker = (): (() => void) => {
    const plausible = Plausible({
        domain: PLAUSIBLE_UNLEASH_DOMAIN,
        apiHost: PLAUSIBLE_UNLEASH_API_HOST,
        trackLocalhost: PLAUSIBLE_TRACK_LOCALHOST,
    });

    return plausible.enableAutoPageviews();
};

export const enablePlausibleTracker = (): boolean => {
    return isUnleashSaasDomain() || isTrackingLocalhost();
};

export const isUnleashSaasDomain = (
    hostname = window.location.hostname
): boolean => {
    return hostname === PLAUSIBLE_UNLEASH_DOMAIN;
};

export const isTrackingLocalhost = (): boolean => {
    return PLAUSIBLE_TRACK_LOCALHOST;
};
