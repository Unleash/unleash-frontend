export const getObjectProperties = (target, ...keys) => {
    const newObject = {};

    keys.forEach(key => {
        if (target[key] !== undefined) {
            newObject[key] = target[key];
        }
    });

    return newObject;
};

export const sortProjectsByName = projects => {
    const sorted = [...projects];
    sorted.sort((a, b) => {
        return a.name.toLowerCase()[0] - b.name.toLowerCase()[0];
    });

    console.log(sorted, projects);

    return sorted.reverse();
};

export const sortProjectsByLastSeen = projects => {};

export const sortProjectsByCreatedAt = projects => {};

export const sortProjectsByReport = projects => {};
