const routes = [
    // Features
    {
        path: '/features/create',
        parent: '/features',
        title: 'Create',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/features/copy/:copyToggle',
        parent: '/features',
        title: 'Copy',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/features/:activeTab/:name',
        parent: '/features',
        title: ':name',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/features',
        title: 'Feature Toggles',
        icon: 'list',
        type: 'protected',
        layout: 'main',
    },

    // Strategies
    {
        path: '/strategies/create',
        title: 'Create',
        parent: '/strategies',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/strategies/:activeTab/:strategyName',
        title: ':strategyName',
        parent: '/strategies',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/strategies',
        title: 'Strategies',
        icon: 'extension',
        type: 'protected',
        layout: 'main',
    },

    // History
    {
        path: '/history/:toggleName',
        title: ':toggleName',
        parent: '/history',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/history',
        title: 'Event History',
        icon: 'history',
        type: 'protected',
        layout: 'main',
    },

    // Archive
    {
        path: '/archive/:activeTab/:name',
        title: ':name',
        parent: '/archive',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/archive',
        title: 'Archived Toggles',
        icon: 'archive',
        type: 'protected',
        layout: 'main',
    },

    // Applications
    {
        path: '/applications/:name',
        title: ':name',
        parent: '/applications',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/applications',
        title: 'Applications',
        icon: 'apps',
        type: 'protected',
        layout: 'main',
    },

    // Context
    {
        path: '/context/create',
        parent: '/context',
        title: 'Create',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/context/edit/:name',
        parent: '/context',
        title: ':name',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/context',
        title: 'Context Fields',
        icon: 'album',
        type: 'protected',
        layout: 'main',
    },

    // Project
    {
        path: '/projects/create',
        parent: '/projects',
        title: 'Create',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/projects/edit/:id',
        parent: '/projects',
        title: ':id',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/projects/:id/access',
        parent: '/projects',
        title: ':id',
        type: 'protected',
        layout: 'main',
    },

    {
        path: '/projects',
        title: 'Projects',
        icon: 'folder_open',
        type: 'protected',
        layout: 'main',
    },

    {
        path: '/tag-types/create',
        parent: '/tag-types',
        title: 'Create',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/tag-types/edit/:name',
        parent: '/tag-types',
        title: ':name',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/tag-types',
        title: 'Tag types',
        icon: 'label',
        type: 'protected',
        layout: 'main',
    },

    {
        path: '/tags/create',
        parent: '/tags',
        title: 'Create',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/tags',
        title: 'Tags',
        icon: 'label',
        hidden: true,
        type: 'protected',
        layout: 'main',
    },

    // Addons
    {
        path: '/addons/create/:provider',
        parent: '/addons',
        title: 'Create',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/addons/edit/:id',
        parent: '/addons',
        title: 'Edit',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/addons',
        title: 'Addons',
        icon: 'device_hub',
        hidden: false,
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/reporting',
        title: 'Reporting',
        icon: 'report',
        type: 'protected',
        layout: 'main',
    },
    // Admin
    {
        path: '/admin/api',
        parent: '/admin',
        title: 'API access',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/admin/users',
        parent: '/admin',
        title: 'Users',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/admin/auth',
        parent: '/admin',
        title: 'Authentication',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/admin',
        title: 'Admin',
        icon: 'album',
        hidden: false,
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/logout',
        title: 'Sign out',
        icon: 'exit_to_app',
        type: 'protected',
        layout: 'main',
    },
    {
        path: '/login',
        title: 'Log in',
        icon: 'user',
        type: 'unprotected',
        hidden: true,
        layout: 'standalone',
    },
    {
        path: '/new-user',
        title: 'New user',
        hidden: true,
        type: 'unprotected',
        layout: 'standalone',
    },
    {
        path: '/reset-password',
        title: 'reset-password',
        hidden: true,
        type: 'unprotected',
        layout: 'standalone',
    },
    {
        path: '/forgotten-password',
        title: 'reset-password',
        hidden: true,
        type: 'unprotected',
        layout: 'standalone',
    },
];

export const getBasePath = () => {
    const path = window.location.pathname;
    const match = routes.filter(route => route.path.includes(path));
    console.log(match.length > 0);
    if (match.length > 0) return '';

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
    return `/${path}`;
};
