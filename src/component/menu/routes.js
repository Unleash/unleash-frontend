import CreateFeatureToggle from '../../page/features/create';
import CopyFeatureToggle from '../../page/features/copy';
import ViewFeatureToggle from '../../page/features/show';
import Features from '../../page/features';
import CreateStrategies from '../../page/strategies/create';
import StrategyView from '../../page/strategies/show';
import Strategies from '../../page/strategies';
import HistoryPage from '../../page/history';
import HistoryTogglePage from '../../page/history/toggle';
import ShowArchive from '../../page/archive/show';
import Archive from '../../page/archive';
import Applications from '../../page/applications';
import ApplicationView from '../../page/applications/view';
import ContextFields from '../../page/context';
import CreateContextField from '../../page/context/create';
import EditContextField from '../../page/context/edit';
import LogoutFeatures from '../../page/user/logout';
import ListProjects from '../../page/project';
import CreateProject from '../../page/project/create';
import EditProject from '../../page/project/edit';
import EditProjectAccess from '../../page/project/access';
import ListTagTypes from '../../page/tag-types';
import CreateTagType from '../../page/tag-types/create';
import EditTagType from '../../page/tag-types/edit';
import ListTags from '../../page/tags';
import CreateTag from '../../page/tags/create';
import Addons from '../../page/addons';
import AddonsCreate from '../../page/addons/create';
import AddonsEdit from '../../page/addons/edit';
import Admin from '../../page/admin';
import AdminApi from '../../page/admin/api';
import AdminUsers from '../../page/admin/users';
import AdminAuth from '../../page/admin/auth';
import Reporting from '../../page/reporting';
import AuthenticationContainer from '../user/authentication-container';
import { P, C } from '../common/flags';

export const routes = [
    // Features
    {
        path: '/features/create',
        parent: '/features',
        title: 'Create',
        component: CreateFeatureToggle,
        type: 'protected',
    },
    {
        path: '/features/copy/:copyToggle',
        parent: '/features',
        title: 'Copy',
        component: CopyFeatureToggle,
        type: 'protected',
    },
    {
        path: '/features/:activeTab/:name',
        parent: '/features',
        title: ':name',
        component: ViewFeatureToggle,
        type: 'protected',
    },
    {
        path: '/features',
        title: 'Feature Toggles',
        icon: 'list',
        component: Features,
        type: 'protected',
    },

    // Strategies
    {
        path: '/strategies/create',
        title: 'Create',
        parent: '/strategies',
        component: CreateStrategies,
        type: 'protected',
    },
    {
        path: '/strategies/:activeTab/:strategyName',
        title: ':strategyName',
        parent: '/strategies',
        component: StrategyView,
        type: 'protected',
    },
    {
        path: '/strategies',
        title: 'Strategies',
        icon: 'extension',
        component: Strategies,
        type: 'protected',
    },

    // History
    {
        path: '/history/:toggleName',
        title: ':toggleName',
        parent: '/history',
        component: HistoryTogglePage,
        type: 'protected',
    },
    {
        path: '/history',
        title: 'Event History',
        icon: 'history',
        component: HistoryPage,
        type: 'protected',
    },

    // Archive
    {
        path: '/archive/:activeTab/:name',
        title: ':name',
        parent: '/archive',
        component: ShowArchive,
        type: 'protected',
    },
    {
        path: '/archive',
        title: 'Archived Toggles',
        icon: 'archive',
        component: Archive,
        type: 'protected',
    },

    // Applications
    {
        path: '/applications/:name',
        title: ':name',
        parent: '/applications',
        component: ApplicationView,
        type: 'protected',
    },
    {
        path: '/applications',
        title: 'Applications',
        icon: 'apps',
        component: Applications,
        type: 'protected',
    },

    // Context
    {
        path: '/context/create',
        parent: '/context',
        title: 'Create',
        component: CreateContextField,
        type: 'protected',
    },
    {
        path: '/context/edit/:name',
        parent: '/context',
        title: ':name',
        component: EditContextField,
        type: 'protected',
    },
    {
        path: '/context',
        title: 'Context Fields',
        icon: 'album',
        component: ContextFields,
        type: 'protected',
        flag: C,
    },

    // Project
    {
        path: '/projects/create',
        parent: '/projects',
        title: 'Create',
        component: CreateProject,
        type: 'protected',
    },
    {
        path: '/projects/edit/:id',
        parent: '/projects',
        title: ':id',
        component: EditProject,
        type: 'protected',
    },
    {
        path: '/projects/:id/access',
        parent: '/projects',
        title: ':id',
        component: EditProjectAccess,
        type: 'protected',
    },

    {
        path: '/projects',
        title: 'Projects',
        icon: 'folder_open',
        component: ListProjects,
        flag: P,
        type: 'protected',
    },

    // Admin
    {
        path: '/admin/api',
        parent: '/admin',
        title: 'API access',
        component: AdminApi,
        type: 'protected',
    },
    {
        path: '/admin/users',
        parent: '/admin',
        title: 'Users',
        component: AdminUsers,
        type: 'protected',
    },
    {
        path: '/admin/auth',
        parent: '/admin',
        title: 'Authentication',
        component: AdminAuth,
        type: 'protected',
    },
    {
        path: '/admin',
        title: 'Admin',
        icon: 'album',
        component: Admin,
        hidden: true,
        type: 'protected',
    },

    {
        path: '/tag-types/create',
        parent: '/tag-types',
        title: 'Create',
        component: CreateTagType,
        type: 'protected',
    },
    {
        path: '/tag-types/edit/:name',
        parent: '/tag-types',
        title: ':name',
        component: EditTagType,
        type: 'protected',
    },
    {
        path: '/tag-types',
        title: 'Tag types',
        icon: 'label',
        component: ListTagTypes,
        type: 'protected',
    },

    {
        path: '/tags/create',
        parent: '/tags',
        title: 'Create',
        component: CreateTag,
        type: 'protected',
    },
    {
        path: '/tags',
        title: 'Tags',
        icon: 'label',
        component: ListTags,
        hidden: true,
        type: 'protected',
    },

    // Addons
    {
        path: '/addons/create/:provider',
        parent: '/addons',
        title: 'Create',
        component: AddonsCreate,
        type: 'protected',
    },
    {
        path: '/addons/edit/:id',
        parent: '/addons',
        title: 'Edit',
        component: AddonsEdit,
        type: 'protected',
    },
    {
        path: '/addons',
        title: 'Addons',
        icon: 'device_hub',
        component: Addons,
        hidden: false,
        type: 'protected',
    },
    {
        path: '/reporting',
        title: 'Reporting',
        icon: 'report',
        component: Reporting,
        type: 'protected',
    },
    {
        path: '/logout',
        title: 'Sign out',
        icon: 'exit_to_app',
        component: LogoutFeatures,
        type: 'protected',
    },
    {
        path: '/login',
        title: 'Log in',
        icon: 'user',
        component: AuthenticationContainer,
        type: 'unprotected',
        hidden: true,
    },
];

export const getRoute = path => routes.find(route => route.path === path);

export const baseRoutes = routes
    .filter(route => !route.hidden)
    .filter(route => !route.parent);
