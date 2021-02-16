import React from "react";
import { Card } from "react-mdl";

import styles from "./reporting.module.scss";

const ReportCard = () => {
    return (
        <Card className={styles.card}>
            <div className={styles.reportCardContainer}>
                <div className={styles.reportCardList}>
                    <h2 className={styles.header}>Toggle report</h2>
                    <ul>
                        <li>15 active toggles</li>
                        <li>15 stale toggles</li>
                        <li>15 potentially stale toggles</li>
                    </ul>
                </div>
                <div className={styles.reportCardHealth}>
                    <h2 className={styles.header}>Health rating</h2>
                </div>
                <div className={styles.reportCardAction}>
                    <h2 className={styles.header}>Potential actions</h2>
                </div>
            </div>
        </Card>
    );
};

export default ReportCard;
