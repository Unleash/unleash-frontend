import React from "react";

import { Typography } from "@material-ui/core";
import ConditionallyRender from "../ConditionallyRender/ConditionallyRender";

import { useStyles } from "./styles";

const HeaderTitle = ({ title, actions, subtitle, variant }) => {
    const styles = useStyles();

    return (
        <div className={styles.headerTitleContainer}>
            <div>
                <Typography
                    variant={variant || "h2"}
                    className={styles.headerTitle}
                >
                    {title}
                </Typography>
                {subtitle && <small>{subtitle}</small>}
            </div>

            <ConditionallyRender
                condition={actions}
                show={<div className={styles.headerActions}>{actions}</div>}
            />
        </div>
    );
};

export default HeaderTitle;
