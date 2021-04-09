import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';

import Features from '../page/features';
import MainLayout from './layout/main';

import { routes } from './menu/routes';

import styles from './styles.module.scss';
import ProtectedRoute from './common/ProtectedRoute/ProtectedRoute';

interface IAppProps {
    location: Location;
    match: any;
    history: History;
    user: any;
}

const App = ({ location, match, history, user }: IAppProps) => {
    console.log(user);
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
                        render={() => (
                            <Redirect to="/features" component={Features} />
                        )}
                    />
                    {renderRoutes()}
                </Switch>
            </MainLayout>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.user.toJS(),
});

export default connect(mapStateToProps)(App);
