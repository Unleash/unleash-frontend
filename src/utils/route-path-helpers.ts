export const getTogglePath = (project: string, featureToggleName: string) => {
    return `/projects/${project}/toggles/${featureToggleName}/strategies`;
};

export const getToggleCopyPath = (
    project: string,
    featureToggleName: string
) => {
    return `/projects/${project}/toggles/${featureToggleName}/strategies/copy`;
};
