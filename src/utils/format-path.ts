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

export const formatPathUtil = (path: string, basePath?: string): string => {
    // If no basepath, return the formatted path
    if (!basePath) {
        // If path exists than one and is already absolute
        // return a path in the format of '/path'
        if (path && path[0] === '/') {
            return path;
        }

        // If path is greater than one and is relative. Return
        // an absolutely formatted path in the format of '/path'
        if (path) {
            return `/${path}`;
        }
    }

    // If basePath is absolute, remove the beginning slash.
    let formattedBasePath =
        basePath && basePath[0] === '/' ? basePath?.substr(1) : basePath;

    // If path exists and path is already absolute, remove the beginning
    // slash and format the path with the basePath first.
    if (path && path[0] === '/') {
        let tempPath = path.substr(1);

        return `/${formattedBasePath}/#/${tempPath}`;
    }

    // If basePath exists and path is relative return formatted path.
    if (path) {
        return `/${formattedBasePath}/#/${path}`;
    }

    return path;
};
