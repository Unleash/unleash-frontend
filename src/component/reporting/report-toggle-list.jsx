import React, { useState, useEffect } from "react";
import { Card, Checkbox } from "react-mdl";

import ReportToggleListItem from "./report-toggle-list-item";

import { getObjectProperties } from "./utils";

import styles from "./reporting.module.scss";

const ReportToggleList = ({ features, selectedProject }) => {
    const [toggleRowData, setToggleRowData] = useState([]);

    useEffect(() => {
        const formattedToggles = features.filter(sameProject).map(feature => {
            return {
                ...getObjectProperties(
                    feature,
                    "name",
                    "lastSeenAt",
                    "createdAt",
                    "stale"
                ),
                checked: false
            };
        });

        setToggleRowData(formattedToggles);
    });

    const renderListRows = () => {
        return toggleRowData.map(feature => {
            return (
                <ReportToggleListItem
                    name={feature.name}
                    stale={feature.stale}
                    lastSeenAt={feature.lastSeenAt}
                    createdAt={feature.createdAt}
                />
            );
        });
    };

    const sameProject = feature => {
        return feature.project === selectedProject;
    };

    return (
        <Card className={styles.reportToggleList}>
            <div className={styles.reportToggleListHeader}>
                <h3 className={styles.reportToggleListHeading}>Overview</h3>
            </div>
            <div className={styles.reportToggleListInnerContainer}>
                <table className={styles.reportingToggleTable}>
                    <thead>
                        <tr>
                            <th>
                                <Checkbox />
                            </th>
                            <th>Name</th>
                            <th>Last seen</th>
                            <th>Created</th>
                            <th>Expired</th>
                            <th>Status</th>
                            <th>Report</th>
                        </tr>
                    </thead>

                    <tbody>{renderListRows()}</tbody>
                </table>
            </div>
        </Card>
    );
};

export default ReportToggleList;
