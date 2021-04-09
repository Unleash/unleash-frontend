import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import MainLayout from './layout/main';
import ProtectedRoute from './common/ProtectedRoute/ProtectedRoute';

import { routes } from './menu/routes';

import styles from './styles.module.scss';

import IUser from '../interfaces/user';
interface IAppProps extends RouteComponentProps {
    user: IUser;
}

const App = ({ location, user }: IAppProps) => {
    const renderRoutes = () => {
        return routes.map(route => {
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
                    component={route.component}
                />
            );
        });
    };

    return (
        <div className={styles.container}>
            <MainLayout location={location}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/features" />}
                    />
                    {renderRoutes()}
                </Switch>
            </MainLayout>
        </div>
    );
};

// Set state to any for now, to avoid typing up entire state object while converting to tsx.
const mapStateToProps = (state: any) => ({
    user: state.user.toJS(),
});

export default connect(mapStateToProps)(App);
