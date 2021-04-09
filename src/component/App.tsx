import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import ProtectedRoute from './common/ProtectedRoute/ProtectedRoute';
import LayoutPicker from './layout/LayoutPicker/LayoutPicker';

import { routes } from './menu/routes';

import styles from './styles.module.scss';

import IUser from '../interfaces/user';
interface IAppProps extends RouteComponentProps {
    user: IUser;
}

const App = ({ location, user }: IAppProps) => {
    const renderMainLayoutRoutes = () => {
        return routes.filter(route => route.layout === 'main').map(renderRoute);
    };

    const renderStandaloneRoutes = () => {
        return routes
            .filter(route => route.layout === 'standalone')
            .map(renderRoute);
    };

    // Change this to IRoute once snags with HashRouter and TS is worked out
    const renderRoute = (route: any) => {
        if (route.type === 'protected') {
            // authDetails only exists if the user is not logged in.
            const unauthorized = user?.authDetails !== undefined;

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
                render={props => <route.component {...props} />}
            />
        );
    };

    return (
        <div className={styles.container}>
            <LayoutPicker location={location}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/features" />}
                    />
                    {renderMainLayoutRoutes()}
                    {renderStandaloneRoutes()}
                </Switch>
            </LayoutPicker>
        </div>
    );
};

// Set state to any for now, to avoid typing up entire state object while converting to tsx.
const mapStateToProps = (state: any) => ({
    user: state.user.toJS(),
});

export default connect(mapStateToProps)(App);
