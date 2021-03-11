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
        color: "#fff",
        height: "450px"
    },
    container: {
        height: "100%",
        justifyContent: "space-between"
    }
}));

const Layout = ({ children, location }) => {
    const muiStyles = useStyles();

    return (
        <>
            <Header location={location} />
            <Grid container className={muiStyles.container}>
                <div className={classnames(styles.contentWrapper)}>
                    <Grid item className={styles.content} xs={12} sm={12}>
                        <div className={styles.contentContainer}>
                            {children}
                        </div>
                        <ErrorContainer />
                    </Grid>
                </div>
                <div className={muiStyles.footer} style={{ width: "100%" }}>
                    <FooterMenu />
                    <ShowApiDetailsContainer />
                </div>
            </Grid>
        </>
    );
};

Layout.propTypes = {
    location: PropTypes.object.isRequired
};

export default Layout;
