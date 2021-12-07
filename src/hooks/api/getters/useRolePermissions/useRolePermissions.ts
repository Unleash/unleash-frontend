import useSWR, { SWRConfiguration } from 'swr';

const permissions = {
    project: [
        {
            permission: 'CREATE_FEATURE',
            displayName: 'Create feature',
            id: 'unique-1',
        },
        {
            permission: 'UPDATE_PROJECT',
            displayName: 'Update project',
            id: 'unique-2',
        },
        {
            permission: 'UPDATE_FEATURE_METADATA',
            displayName: 'Update feature toggle metadata',
            id: 'unique-3',
        },
    ],
    environments: [
        {
            name: 'Development',
            permissions: [
                {
                    permission: 'CREATE_FEATURE_STRATEGY',
                    id: 'unique-1',
                    displayName: 'Create feature strategy',
                },
                {
                    permission: 'UPDATE_FEATURE_STRATEGY',
                    id: 'unique-2',
                    displayName: 'Update feature strategy',
                },
                {
                    permission: 'DELETE_FEATURE_STRATEGY',
                    id: 'unique-3',
                    displayName: 'Delete feature strategy',
                },
                {
                    permission: 'TOGGLE_FEATURE_ENVIRONMENT',
                    id: 'unique-4',
                    displayName: 'Toggle feature environment',
                },
            ],
        },
        {
            name: 'Production',
            permissions: [
                {
                    permission: 'CREATE_FEATURE_STRATEGY',
                    id: 'unique-5',
                    displayName: 'Create feature strategy',
                },
                {
                    permission: 'UPDATE_FEATURE_STRATEGY',
                    id: 'unique-6',
                    displayName: 'Update feature strategy',
                },
                {
                    permission: 'DELETE_FEATURE_STRATEGY',
                    id: 'unique-7',
                    displayName: 'Delete feature strategy',
                },
                {
                    permission: 'TOGGLE_FEATURE_ENVIRONMENT',
                    id: 'unique-8',
                    displayName: 'Toggle feature environment',
                },
            ],
        },
        {
            name: 'Default',
            permissions: [
                {
                    permission: 'CREATE_FEATURE_STRATEGY',
                    id: 'unique-9',
                    displayName: 'Create feature strategy',
                },
                {
                    permission: 'UPDATE_FEATURE_STRATEGY',
                    id: 'unique-10',
                    displayName: 'Update feature strategy',
                },
                {
                    permission: 'DELETE_FEATURE_STRATEGY',
                    id: 'unique-11',
                    displayName: 'Delete feature strategy',
                },
                {
                    permission: 'TOGGLE_FEATURE_ENVIRONMENT',
                    id: 'unique-12',
                    displayName: 'Toggle feature environment',
                },
            ],
        },
    ],
};

const useRolePermissions = (options: SWRConfiguration = {}) => {
    return {
        permissions,
    };
};

export default useRolePermissions;
