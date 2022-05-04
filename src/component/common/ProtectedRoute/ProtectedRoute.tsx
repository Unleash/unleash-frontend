import { VFC } from 'react';
import { Route, useLocation, Navigate, RouteProps } from 'react-router-dom';

interface IProtectedRouteProps {
    unauthorized?: boolean;
}

const ProtectedRoute: VFC<IProtectedRouteProps & RouteProps> = ({
    component: Component,
    unauthorized,
    ...rest
}) => {
    const { pathname, search } = useLocation();
    const redirect = encodeURIComponent(pathname + search);
    const loginLink = `/login?redirect=${redirect}`;

    return unauthorized ? (
        <Route {...rest} render={() => <Navigate to={loginLink} replace />} />
    ) : (
        <Route {...rest} component={Component} />
    );
};

export default ProtectedRoute;
