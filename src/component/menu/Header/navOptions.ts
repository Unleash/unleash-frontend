import { ADMIN } from '../../AccessProvider/permissions';

export const adminOptions = [
    {
        path: '/admin/users',
        permission: ADMIN,
        text: 'Users and roles',
    },
    {
        path: '/admin/api',
        permission: ADMIN,
        text: 'API access',
    },
    {
        path: '/admin/auth',
        permission: ADMIN,
        text: 'Authentication',
    },
    {
        path: '/history',
        permission: ADMIN,
        text: 'Event log',
    },
];

export const advancedOptions = [
    {
        path: '/features',
        permission: '',
        text: 'All toggles',
    },
    {
        path: '/context',
        permission: '',
        text: 'Context fields',
    },
    {
        path: '/tag-types',
        permission: '',
        text: 'Tag types',
    },
    {
        path: '/archive',
        permission: '',
        text: 'Archived toggles',
    },
    {
        path: '/strategies',
        permission: '',
        text: 'Strategies',
    },
    {
        path: '/reporting',
        permission: '',
        text: 'Technical debt',
    },
    {
        path: '/applications',
        permission: '',
        text: 'Applications',
    },
    {
        path: '/addons',
        permission: '',
        text: 'Addons',
    },
];
