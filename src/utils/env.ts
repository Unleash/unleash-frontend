export const isLocalhostDomain = (
    hostname = window.location.hostname
): boolean => {
    return hostname === 'localhost';
};

export const isUnleashDomain = (
    hostname = window.location.hostname
): boolean => {
    return (
        hostname.endsWith('.getunleash.io') ||
        hostname.endsWith('.unleash-hosted.com')
    );
};

export const isVercelBranchDomain = (
    hostname = window.location.hostname
): boolean => {
    return hostname.endsWith('.vercel.app');
};
