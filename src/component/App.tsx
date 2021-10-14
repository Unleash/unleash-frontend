import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import ProtectedRoute from './common/ProtectedRoute/ProtectedRoute';
import LayoutPicker from './layout/LayoutPicker/LayoutPicker';

import { routes } from './menu/routes';

import styles from './styles.module.scss';

import IAuthStatus from '../interfaces/user';
import { useEffect } from 'react';
import NotFound from './common/NotFound/NotFound';
import Feedback from './common/Feedback';
import { SWRConfig } from 'swr';
import useToast from '../hooks/useToast';

interface IAppProps extends RouteComponentProps {
    user: IAuthStatus;
    fetchUiBootstrap: any;
    feedback: any;
}

const App = ({ location, user, fetchUiBootstrap, feedback }: IAppProps) => {
    const { toast, setToastData } = useToast();
    useEffect(() => {
        fetchUiBootstrap();
        /* eslint-disable-next-line */
    }, [user.authDetails?.type]);

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
        return user?.authDetails !== undefined;
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
                        authDetails={user.authDetails}
                    />
                )}
            />
        );
    };

    return (
        <SWRConfig value={{
            onError: (error) => {
                setToastData({
                    show: true,
                    type: 'error',
                    text: error.message,
                });
            },
        }}>
            <div className={styles.container}>
                <LayoutPicker location={location}>
                    <Switch>
                        <ProtectedRoute
                            exact
                            path='/'
                            unauthorized={isUnauthorized()}
                            component={Redirect}
                            renderProps={{ to: '/features' }}
                        />
                        {renderMainLayoutRoutes()}
                        {renderStandaloneRoutes()}
                        <Route path='/404' component={NotFound} />
                        <Redirect to='/404' />
                        {toast}
                    </Switch>
                    <Feedback
                        feedbackId='pnps'
                        openUrl='http://feedback.unleash.run'
                    />
                </LayoutPicker>
            </div>
        </SWRConfig>
    );
};
// Set state to any for now, to avoid typing up entire state object while converting to tsx.
const mapStateToProps = (state: any) => ({
    user: state.user.toJS(),
    feedback: state.feedback,
});

export default connect(mapStateToProps)(App);
