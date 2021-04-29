export const getBasePath = () => {
    const paths = window.location.pathname.split('/').filter(path => path);
    if (!paths.length) return '';
    if (paths[0].includes('features')) return '';

    return paths[0];
};

export const formatApiPath = (path: string) => {
    const basePath = getBasePath();
    if (basePath) {
        return `/${basePath}/${path}`;
    }
    return path;
};
