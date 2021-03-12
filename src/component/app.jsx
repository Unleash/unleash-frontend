import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";

import Features from "../page/features";
import AuthenticationContainer from "./user/authentication-container";
import MainLayout from "./layout/main";

import mainTheme from "../themes/main-theme";
import { routes } from "./menu/routes";

import styles from "./styles.module.scss";
class App extends PureComponent {
    static propTypes = {
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        user: PropTypes.object
    };

    render() {
        if (this.props.user.authDetails) {
            return <AuthenticationContainer history={this.props.history} />;
        }
        return (
            <StylesProvider injectFirst>
                <CssBaseline />
                <ThemeProvider theme={mainTheme}>
                    <div className={styles.container}>
                        <MainLayout {...this.props}>
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <Redirect
                                            to="/features"
                                            component={Features}
                                        />
                                    )}
                                />
                                {routes.map(route => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        component={route.component}
                                    />
                                ))}
                            </Switch>
                        </MainLayout>
                    </div>
                </ThemeProvider>
            </StylesProvider>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.toJS()
});

export default connect(mapStateToProps)(App);
