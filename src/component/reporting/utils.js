export const getObjectProperties = (target, ...keys) => {
    const newObject = {};

    keys.forEach(key => {
        if (target[key] !== undefined) {
            newObject[key] = target[key];
        }
    });

    return newObject;
};

export const sortProjectsByNameAscending = projects => {
    const sorted = [...projects];
    sorted.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
    return sorted;
};

export const sortProjectsByNameDescending = projects => {
    const sorted = sortProjectsByNameAscending([...projects]).reverse();

    return sorted;
};

export const sortProjectsByLastSeen = projects => {};

export const sortProjectsByCreatedAt = projects => {};

export const sortProjectsByReport = projects => {};

export const pluralize = (items, word) => {
    if (items === 1) return `${items} ${word}`;
    return `${items} ${word}s`;
};
