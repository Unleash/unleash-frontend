import React from 'react';
import { Button, Card, Icon } from 'react-mdl';

import styles from './reporting.module.scss';

const ReportCard = () => (
    <Card className={styles.card}>
        <div className={styles.reportCardContainer}>
            <div className={styles.reportCardListContainer}>
                <h2 className={styles.header}>Toggle report</h2>
                <ul className={styles.reportCardList}>
                    <li>
                        <Icon name="check" className={styles.check} />
                        <p>15 active toggles</p>
                    </li>
                    <li>
                        <Icon name="warning" className={styles.danger} />
                        <p>15 stale toggles</p>
                    </li>
                    <li>
                        <Icon name="warning" className={styles.danger} />
                        <p>15 potentially stale toggles</p>
                    </li>
                </ul>
            </div>
            <div className={styles.reportCardHealth}>
                <h2 className={styles.header}>Health rating</h2>
                <div className={styles.reportCardHealthInnerContainer}>
                    <p className={styles.reportCardHealthRating}>50%</p>
                </div>
            </div>
            <div className={styles.reportCardAction}>
                <h2 className={styles.header}>Potential actions</h2>
                <div className={styles.reportCardActionContainer}>
                    <p className={styles.reportCardActionText}>
                        Review your feature toggles and delete unused toggles.
                    </p>
                    <Button className={styles.reportCardBtn}>Overview</Button>
                </div>
            </div>
        </div>
    </Card>
);

export default ReportCard;
