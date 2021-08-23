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
import CreateProject from '../../page/project/create';
import EditProject from '../../page/project/edit';
import ViewProject from '../../page/project/view';
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
import AdminInvoice from '../../page/admin/invoice';
import AdminAuth from '../../page/admin/auth';
import Reporting from '../../page/reporting';
import Login from '../user/Login';
import { P, C } from '../common/flags';
import NewUser from '../user/NewUser';
import ResetPassword from '../user/ResetPassword/ResetPassword';
import ForgottenPassword from '../user/ForgottenPassword/ForgottenPassword';
import ProjectListNew from '../project/ProjectList/ProjectList';
import Project from '../project/Project/Project';

export const routes = [
    // Features
    {
        path: '/features/create',
        parent: '/features',
        title: 'Create',
        component: CreateFeatureToggle,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/features/copy/:copyToggle',
        parent: '/features',
        title: 'Copy',
        component: CopyFeatureToggle,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/features/:activeTab/:name',
        parent: '/features',
        title: ':name',
        component: ViewFeatureToggle,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/features',
        title: 'Feature Toggles',
        component: Features,
        type: 'protected',
        layout: 'main',
        menu: {},
    },

    // Strategies
    {
        path: '/strategies/create',
        title: 'Create',
        parent: '/strategies',
        component: CreateStrategies,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/strategies/:activeTab/:strategyName',
        title: ':strategyName',
        parent: '/strategies',
        component: StrategyView,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/strategies',
        title: 'Strategies',
        component: Strategies,
        type: 'protected',
        layout: 'main',
        menu: { advanced: true },
    },

    // History
    {
        path: '/history/:toggleName',
        title: ':toggleName',
        parent: '/history',
        component: HistoryTogglePage,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/history',
        title: 'Event History',
        component: HistoryPage,
        type: 'protected',
        layout: 'main',
        menu: { adminSettings: true },
    },

    // Archive
    {
        path: '/archive/:activeTab/:name',
        title: ':name',
        parent: '/archive',
        component: ShowArchive,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/archive',
        title: 'Archived Toggles',
        component: Archive,
        type: 'protected',
        layout: 'main',
        menu: {},
    },

    // Applications
    {
        path: '/applications/:name',
        title: ':name',
        parent: '/applications',
        component: ApplicationView,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/applications',
        title: 'Applications',
        component: Applications,
        type: 'protected',
        layout: 'main',
        menu: { advanced: true },
    },

    // Context
    {
        path: '/context/create',
        parent: '/context',
        title: 'Create',
        component: CreateContextField,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/context/edit/:name',
        parent: '/context',
        title: ':name',
        component: EditContextField,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/context',
        title: 'Context Fields',
        component: ContextFields,
        type: 'protected',
        flag: C,
        layout: 'main',
        menu: { advanced: true },
    },

    // Project
    {
        path: '/projects/create',
        parent: '/projects',
        title: 'Create',
        component: CreateProject,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/projects/edit/:id',
        parent: '/projects',
        title: ':id',
        component: EditProject,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/projects/view/:id',
        parent: '/projects',
        title: ':id',
        component: ViewProject,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/projects/:id/access',
        parent: '/projects',
        title: ':id',
        component: EditProjectAccess,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/projects/:id',
        parent: '/projects',
        title: ':id',
        component: Project,
        flag: P,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/projects',
        title: 'Projects',
        component: ProjectListNew,
        flag: P,
        type: 'protected',
        layout: 'main',
        menu: {},
    },

    {
        path: '/tag-types/create',
        parent: '/tag-types',
        title: 'Create',
        component: CreateTagType,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/tag-types/edit/:name',
        parent: '/tag-types',
        title: ':name',
        component: EditTagType,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/tag-types',
        title: 'Tag types',
        component: ListTagTypes,
        type: 'protected',
        layout: 'main',
        menu: { advanced: true },
    },

    {
        path: '/tags/create',
        parent: '/tags',
        title: 'Create',
        component: CreateTag,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/tags',
        title: 'Tags',
        component: ListTags,
        hidden: true,
        type: 'protected',
        layout: 'main',
        menu: {},
    },

    // Addons
    {
        path: '/addons/create/:provider',
        parent: '/addons',
        title: 'Create',
        component: AddonsCreate,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/addons/edit/:id',
        parent: '/addons',
        title: 'Edit',
        component: AddonsEdit,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/addons',
        title: 'Addons',
        component: Addons,
        hidden: false,
        type: 'protected',
        layout: 'main',
        menu: { advanced: true },
    },
    {
        path: '/reporting',
        title: 'Reporting',
        component: Reporting,
        type: 'protected',
        layout: 'main',
        menu: { advanced: true },
    },
    // Admin
    {
        path: '/admin/api',
        parent: '/admin',
        title: 'API access',
        component: AdminApi,
        type: 'protected',
        layout: 'main',
        menu: { advanced: true, adminSettings: true },
    },
    {
        path: '/admin/users',
        parent: '/admin',
        title: 'Users',
        component: AdminUsers,
        type: 'protected',
        layout: 'main',
        menu: { adminSettings: true },
    },
    {
        path: '/admin/auth',
        parent: '/admin',
        title: 'Single Sign-On',
        component: AdminAuth,
        type: 'protected',
        layout: 'main',
        menu: { adminSettings: true },
    },
    {
        path: '/admin-invoices',
        title: 'Invoices',
        component: AdminInvoice,
        hidden: true,
        type: 'protected',
        layout: 'main',
        menu: { adminSettings: true },
    },
    {
        path: '/admin',
        title: 'Admin',
        component: Admin,
        hidden: false,
        type: 'protected',
        layout: 'main',
        menu: {},
    },
    {
        path: '/login',
        title: 'Log in',
        component: Login,
        type: 'unprotected',
        hidden: true,
        layout: 'standalone',
        menu: {},
    },
    {
        path: '/new-user',
        title: 'New user',
        hidden: true,
        component: NewUser,
        type: 'unprotected',
        layout: 'standalone',
        menu: {},
    },
    {
        path: '/reset-password',
        title: 'reset-password',
        hidden: true,
        component: ResetPassword,
        type: 'unprotected',
        layout: 'standalone',
        menu: {},
    },
    {
        path: '/forgotten-password',
        title: 'reset-password',
        hidden: true,
        component: ForgottenPassword,
        type: 'unprotected',
        layout: 'standalone',
        menu: {},
    },
];

export const getRoute = path => routes.find(route => route.path === path);

export const baseRoutes = routes
    .filter(route => !route.hidden)
    .filter(route => !route.parent);

const computeRoutes = () => {
    const mainNavRoutes = baseRoutes.filter(route => route.menu.advanced);
    const adminRoutes = routes.filter(route => route.menu.adminSettings);

    const computedRoutes = {
        mainNavRoutes,
        adminRoutes,
    };
    return () => {
        return computedRoutes;
    };
};

export const getRoutes = computeRoutes();
