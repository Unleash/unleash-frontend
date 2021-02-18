export const getObjectProperties = (target, ...keys) => {
    const newObject = {};

    keys.forEach(key => {
        if (target[key] !== undefined) {
            newObject[key] = target[key];
        }
    });

    return newObject;
};

export const sortProjectsByName = projects => {};

export const sortProjectsByLastSeen = projects => {};

export const sortProjectsByCreatedAt = projects => {};

export const sortProjectsByReport = projects => {};
