import React, { useState, useEffect } from "react";
import { Card } from "react-mdl";

import ReportToggleListItem from "./report-toggle-list-item";
import ReportToggleListHeader from "./report-toggle-list-header";

import { getObjectProperties, filterByProject } from "./utils";

import useSort from "./useSort";

import styles from "./reporting.module.scss";

//import features from "./testFeatures";

const ReportToggleList = ({ features, selectedProject }) => {
    const [checkAll, setCheckAll] = useState(false);

    const [localFeatures, setFeatures] = useState(features);
    const [sort, setSortData] = useSort();

    useEffect(() => {
        const formattedFeatures = features.map(feature => ({
            ...getObjectProperties(
                feature,
                "name",
                "lastSeenAt",
                "createdAt",
                "stale",
                "type"
            ),
            checked: getCheckedState(feature.name),
            setFeatures
        }));

        setFeatures(formattedFeatures);
    }, [features, selectedProject]);

    const getCheckedState = name => {
        const feature = localFeatures.find(feature => feature.name === name);

        if (feature) {
            return feature.checked ? feature.checked : false;
        }
        return false;
    };

    const renderListRows = () =>
        sort(localFeatures).map(feature => (
            <ReportToggleListItem key={feature.name} {...feature} />
        ));

    const sameProject = filterByProject(selectedProject);

    const handleCheckAll = () => {
        if (!checkAll) {
            setCheckAll(true);
            return setFeatures(prev => applyCheckedToFeatures(prev, true));
        }
        setCheckAll(false);
        return setFeatures(prev => applyCheckedToFeatures(prev, false));
    };

    const applyCheckedToFeatures = (features, checkedState) =>
        features.map(feature => ({ ...feature, checked: checkedState }));

    return (
        <Card className={styles.reportToggleList}>
            <div className={styles.reportToggleListHeader}>
                <h3 className={styles.reportToggleListHeading}>Overview</h3>
            </div>
            <div className={styles.reportToggleListInnerContainer}>
                <table className={styles.reportingToggleTable}>
                    <ReportToggleListHeader
                        handleCheckAll={handleCheckAll}
                        checkAll={checkAll}
                        setSortData={setSortData}
                    />

                    <tbody>{renderListRows()}</tbody>
                </table>
            </div>
        </Card>
    );
};

export default ReportToggleList;
