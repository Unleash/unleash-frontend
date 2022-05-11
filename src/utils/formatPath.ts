export const formatApiPath = (path: string, base = basePath): string => {
    return joinPaths(base, path);
};

export const formatAssetPath = (path: string, base = basePath): string => {
    return joinPaths(base, path);
};

// Parse the basePath value from the HTML meta tag.
export const parseBasePath = (value = basePathMetaTagContent()): string => {
    return value === '::baseUriPath::' ? '' : joinPaths(value);
};

// Join paths with a leading separator and without a trailing separator.
const joinPaths = (...paths: string[]): string => {
    return ['', ...paths]
        .join('/')
        .replace(/\/+$/g, '') // Remove trailing separators.
        .replace(/\/+/g, '/'); // Collapse repeated separators.
};

const basePathMetaTagContent = (): string => {
    const el = document.querySelector<HTMLMetaElement>(
        'meta[name="baseUriPath"]'
    );

    return el?.content ?? '';
};

export const basePath = parseBasePath();
