import ConditionallyRender from './common/ConditionallyRender';
import EnvironmentSplash from './common/EnvironmentSplash/EnvironmentSplash';
import Feedback from './common/Feedback/Feedback';
import LayoutPicker from './layout/LayoutPicker/LayoutPicker';
import Loader from './common/Loader/Loader';
import NotFound from './common/NotFound/NotFound';
import ProtectedRoute from './common/ProtectedRoute/ProtectedRoute';
import SWRProvider from './providers/SWRProvider/SWRProvider';
import ToastRenderer from './common/ToastRenderer/ToastRenderer';
import styles from './styles.module.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { routes } from './menu/routes';
import { useAuth } from '../hooks/api/getters/useAuth/useAuth';
import { useEffect } from 'react';

interface IAppProps extends RouteComponentProps {
    fetchUiBootstrap: () => void;
}

export const App = ({ fetchUiBootstrap }: IAppProps) => {
    const { auth, refetchAuth } = useAuth();
    const hasFetchedAuth = Boolean(auth);
    const isLoggedIn = Boolean(auth?.profile?.id);
    const showEnvSplash = isLoggedIn && auth?.splash.environment === false;

    useEffect(() => {
        fetchUiBootstrap();
    }, [fetchUiBootstrap, auth?.authDetails?.type]);

    const renderMainLayoutRoutes = () => {
        return routes.filter(route => route.layout === 'main').map(renderRoute);
    };

    const renderStandaloneRoutes = () => {
        return routes
            .filter(route => route.layout === 'standalone')
            .map(renderRoute);
    };

    const isUnauthorized = (): boolean => {
        return !isLoggedIn;
    };

    // Change this to IRoute once snags with HashRouter and TS is worked out
    const renderRoute = (route: any) => {
        if (route.type === 'protected') {
            const unauthorized = isUnauthorized();

            return (
                <ProtectedRoute
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    unauthorized={unauthorized}
                />
            );
        }
        return (
            <Route
                key={route.path}
                path={route.path}
                render={props => (
                    <route.component
                        {...props}
                        isUnauthorized={isUnauthorized}
                        authDetails={auth?.authDetails}
                    />
                )}
            />
        );
    };

    return (
        <SWRProvider isUnauthorized={isUnauthorized}>
            <ConditionallyRender
                condition={!hasFetchedAuth}
                show={<Loader />}
                elseShow={
                    <div className={styles.container}>
                        <ToastRenderer />

                        <ConditionallyRender
                            condition={showEnvSplash}
                            show={<EnvironmentSplash onFinish={refetchAuth} />}
                            elseShow={
                                <LayoutPicker location={location}>
                                    <Switch>
                                        <ProtectedRoute
                                            exact
                                            path="/"
                                            unauthorized={isUnauthorized()}
                                            component={Redirect}
                                            renderProps={{ to: '/features' }}
                                        />
                                        {renderMainLayoutRoutes()}
                                        {renderStandaloneRoutes()}
                                        <Route
                                            path="/404"
                                            component={NotFound}
                                        />
                                        <Redirect to="/404" />
                                    </Switch>
                                    <Feedback openUrl="http://feedback.unleash.run" />
                                </LayoutPicker>
                            }
                        />
                    </div>
                }
            />
        </SWRProvider>
    );
};
