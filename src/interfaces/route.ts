import { RouteComponentProps } from 'react-router';

interface IRoute {
    path: string;
    icon?: string;
    component: React.ComponentType<RouteComponentProps | undefined>;
    type: string;
    layout: string;
    hidden?: boolean;
    flag?: string;
    parent?: string;
}

export default IRoute;
