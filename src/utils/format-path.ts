export const getBasePathGenerator = () => {
    let basePath: string | undefined;

    return () => {
        if (process.env.NODE_ENV === 'development') {
            return '';
        }

        if (basePath !== undefined) {
            return basePath;
        }
        const baseUriPath = document.querySelector<HTMLMetaElement>(
            'meta[name="baseUriPath"]'
        );

        if (baseUriPath?.content) {
            basePath = baseUriPath?.content;
            return basePath;
        }
        basePath = '';
        return basePath;
    };
};

export const getBasePath = getBasePathGenerator();

export const formatApiPath = (path: string) => {
    const basePath = getBasePath();
    console.log(basePath);
    if (basePath) {
        return `${basePath}/${path}`;
    }
    return `/${path}`;
};
