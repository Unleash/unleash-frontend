import React from "react";
import classnames from "classnames";
import { Button, Card } from "react-mdl";

import CheckIcon from "@material-ui/icons/Check";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import ConditionallyRender from "../common/conditionally-render";

import { isFeatureExpired } from "./utils";

import styles from "./reporting.module.scss";

const ReportCard = ({ features }) => {
    const getActiveToggles = () => {
        const result = features.filter(feature => !feature.stale);

        if (result === 0) return 0;

        return result;
    };

    const getPotentiallyStaleToggles = activeToggles => {
        const result = activeToggles.filter(feature => {
            return isFeatureExpired(feature) && !feature.stale;
        });

        return result;
    };

    const getHealthRating = (
        total,
        staleTogglesCount,
        potentiallyStaleTogglesCount
    ) => {
        const startPercentage = 100;

        const stalePercentage = (staleTogglesCount / total) * 100;

        const potentiallyStalePercentage =
            (potentiallyStaleTogglesCount / total) * 100;

        return Math.round(
            startPercentage - stalePercentage - potentiallyStalePercentage
        );
    };

    const renderActiveToggles = () => (
        <>
            <CheckIcon className={styles.check} />
            <span>{activeTogglesCount} active toggles</span>
        </>
    );

    const renderStaleToggles = () => (
        <>
            <ReportProblemOutlinedIcon className={styles.danger} />
            <span>{staleTogglesCount} stale toggles</span>
        </>
    );

    const renderPotentiallyStaleToggles = () => (
        <>
            <ReportProblemOutlinedIcon className={styles.danger} />
            <span>
                {potentiallyStaleTogglesCount} potentially stale toggles
            </span>
        </>
    );

    const total = features.length;
    const activeTogglesArray = getActiveToggles();
    const potentiallyStaleToggles = getPotentiallyStaleToggles(
        activeTogglesArray
    );

    const activeTogglesCount = activeTogglesArray.length;
    const staleTogglesCount = features.length - activeTogglesCount;
    const potentiallyStaleTogglesCount = potentiallyStaleToggles.length;

    const healthRating = getHealthRating(
        total,
        staleTogglesCount,
        potentiallyStaleTogglesCount
    );

    const healthLessThan50 = healthRating < 50;
    const healthLessThan75 = healthRating < 75;

    const healthClasses = classnames(styles.reportCardHealthRating, {
        [styles.healthWarning]: healthLessThan75,
        [styles.healthDanger]: healthLessThan50
    });

    return (
        <Card className={styles.card}>
            <div className={styles.reportCardContainer}>
                <div className={styles.reportCardListContainer}>
                    <h2 className={styles.header + " loader"}>Toggle report</h2>
                    <ul className={styles.reportCardList}>
                        <li>
                            <ConditionallyRender
                                condition={activeTogglesCount}
                                show={renderActiveToggles}
                            />
                        </li>
                        <li>
                            <ConditionallyRender
                                condition={staleTogglesCount}
                                show={renderStaleToggles}
                            />
                        </li>
                        <li>
                            <ConditionallyRender
                                condition={potentiallyStaleTogglesCount}
                                show={renderPotentiallyStaleToggles}
                            />
                        </li>
                    </ul>
                </div>
                <div className={styles.reportCardHealth}>
                    <h2 className={styles.header}>Health rating</h2>
                    <div className={styles.reportCardHealthInnerContainer}>
                        <ConditionallyRender
                            condition={healthRating}
                            show={
                                <p className={healthClasses}>{healthRating}%</p>
                            }
                        />
                    </div>
                </div>
                <div className={styles.reportCardAction}>
                    <h2 className={styles.header}>Potential actions</h2>
                    <div className={styles.reportCardActionContainer}>
                        <p className={styles.reportCardActionText}>
                            Review your feature toggles and delete unused
                            toggles.
                        </p>
                        <Button className={styles.reportCardBtn}>
                            Overview
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ReportCard;
