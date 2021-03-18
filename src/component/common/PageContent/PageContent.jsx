import React from "react";
import HeaderTitle from "../HeaderTitle";
import { Paper } from "@material-ui/core";
import { useStyles } from "./styles";

const PageContent = ({ children, headerContent }) => {
    const styles = useStyles();

    let header = null;
    if (headerContent) {
        if (typeof headerContent === "string") {
            header = (
                <div className={styles.headerContainer}>
                    <HeaderTitle title={headerContent} />
                </div>
            );
        } else {
            header = (
                <div className={styles.headerContainer}>{headerContent}</div>
            );
        }
    }

    return (
        <Paper>
            {header}
            <div className={styles.bodyContainer}>{children}</div>
        </Paper>
    );
};

export default PageContent;
