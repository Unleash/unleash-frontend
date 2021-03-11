import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import styles from "../styles.module.scss";
import ErrorContainer from "../error/error-container";
import Header from "../menu/header";
import ShowApiDetailsContainer from "../api/show-api-details-container";
import { FooterMenu } from "../menu/footer";

const useStyles = makeStyles(theme => ({
    footer: {
        background: theme.palette.neutral.main,
        padding: "2rem",
        color: "#fff"
    }
}));

const Layout = ({ children, location }) => {
    const muiStyles = useStyles();

    return (
        <Grid container fixedHeader>
            <Header location={location} />
            <div
                style={{ margin: "0 auto" }}
                className={classnames(
                    "mdl-color--grey-50",
                    styles.contentWrapper
                )}
            >
                <Grid item className={styles.content} xs={12} sm={12}>
                    <div className={styles.contentContainer}>{children}</div>
                    <ErrorContainer />
                </Grid>
            </div>
            <Grid item xs={12} sm={12}>
                <div className={muiStyles.footer}>
                    <FooterMenu />
                    <ShowApiDetailsContainer />
                </div>
            </Grid>
        </Grid>
    );
};

Layout.propTypes = {
    location: PropTypes.object.isRequired
};

export default Layout;
