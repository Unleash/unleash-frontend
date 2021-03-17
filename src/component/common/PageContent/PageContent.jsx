import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { useStyles } from "./styles";

const PageContent = ({ children, headerContent }) => {
    const styles = useStyles();

    let header = null;
    if (headerContent) {
        if (typeof headerContent === "string") {
            header = (
                <div className={styles.headerContainer}>
                    <Typography variant="h2">{headerContent}</Typography>
                </div>
            );
        }

        header = <div className={styles.headerContainer}>{headerContent}</div>;
    }

    return (
        <Paper>
            {header}
            <div className={styles.bodyContainer}>{children}</div>
        </Paper>
    );
};

export default PageContent;
