import { Redirect, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router';
import ProtectedRoute from './common/ProtectedRoute/ProtectedRoute';
import LayoutPicker from './layout/LayoutPicker/LayoutPicker';
import { routes } from './menu/routes';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import NotFound from './common/NotFound/NotFound';
import Feedback from './common/Feedback';
import SWRProvider from './providers/SWRProvider/SWRProvider';
import ConditionallyRender from './common/ConditionallyRender';
import EnvironmentSplash from './common/EnvironmentSplash/EnvironmentSplash';
import Loader from './common/Loader/Loader';
import useUser from '../hooks/api/getters/useUser/useUser';
import ToastRenderer from './common/ToastRenderer/ToastRenderer';
import useUiBootstrap from '../hooks/api/getters/useUiBootstrap/useUiBootstrap';

const App = () => {
    // because we need the userId when the component load.
    const { splash, user, authDetails } = useUser();
    const [showSplash, setShowSplash] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const history = useHistory();
    const { refetchUiBootstrap } = useUiBootstrap();
    const { location } = history;
    useEffect(() => {
        refetchUiBootstrap();
        /* eslint-disable-next-line */
    }, [authDetails?.type]);

    useEffect(() => {
        // Temporary duality until redux store is removed
        if (!isUnauthorized() && !user?.id && !authDetails) {
            setShowLoader(true);
            return;
        }
        setShowLoader(false);
        /* eslint-disable-next-line */
    }, [authDetails, user.id]);

    useEffect(() => {
        if (splash?.environment === undefined) return;
        if (!splash?.environment && !isUnauthorized()) {
            setShowSplash(true);
        }
        /* eslint-disable-next-line */
    }, [splash.environment]);

    const renderMainLayoutRoutes = () => {
        return routes.filter(route => route.layout === 'main').map(renderRoute);
    };

    const renderStandaloneRoutes = () => {
        return routes
            .filter(route => route.layout === 'standalone')
            .map(renderRoute);
    };

    const isUnauthorized = () => {
        // authDetails only exists if the user is not logged in.
        //if (user?.permissions.length === 0) return true;
        return authDetails !== undefined;
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
                        authDetails={authDetails}
                    />
                )}
            />
        );
    };

    return (
        <SWRProvider
            isUnauthorized={isUnauthorized}
            setShowLoader={setShowLoader}
        >
            <ConditionallyRender
                condition={showLoader}
                show={<Loader />}
                elseShow={
                    <div className={styles.container}>
                        <ConditionallyRender
                            condition={showSplash}
                            show={
                                <EnvironmentSplash onFinish={setShowSplash} />
                            }
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
                                    <Feedback
                                        feedbackId="pnps"
                                        openUrl="http://feedback.unleash.run"
                                    />
                                </LayoutPicker>
                            }
                        />

                        <ToastRenderer />
                    </div>
                }
            />
        </SWRProvider>
    );
};
export default App;
