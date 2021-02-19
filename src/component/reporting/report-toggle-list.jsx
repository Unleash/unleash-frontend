import React, { useState, useEffect } from "react";
import { Card } from "react-mdl";

import ReportToggleListItem from "./report-toggle-list-item";
import ReportToggleListHeader from "./report-toggle-list-header";

import { getObjectProperties } from "./utils";

import styles from "./reporting.module.scss";
import useSort from "./useSort";

const PRESERVE = true;

const ReportToggleList = ({ features, selectedProject }) => {
    const [toggleRowData, setToggleRowData] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [sort, setSortKey] = useSort();

    useEffect(() => {
        const formattedFeatures = features.filter(sameProject).map(feature => ({
            ...getObjectProperties(
                feature,
                "name",
                "lastSeenAt",
                "createdAt",
                "stale"
            ),
            checked: getCheckedState(feature.name),
            setToggleRowData
        }));

        const sortedFeatures = sort(formattedFeatures, PRESERVE);
        setToggleRowData(sortedFeatures);
    }, []);

    const getCheckedState = name => {
        const feature = toggleRowData.find(feature => feature.name === name);

        if (feature) {
            return feature.checked ? feature.checked : false;
        }
        return false;
    };

    const renderListRows = () =>
        toggleRowData.map(feature => (
            <ReportToggleListItem key={feature.name} {...feature} />
        ));

    const sameProject = feature => feature.project === selectedProject;

    const handleCheckAll = () => {
        if (!checkAll) {
            setCheckAll(true);
            return setToggleRowData(prev => applyCheckedToFeatures(prev, true));
        }
        setCheckAll(false);
        return setToggleRowData(prev => applyCheckedToFeatures(prev, false));
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
                        setToggleRowData={setToggleRowData}
                        setSortKey={setSortKey}
                        sort={sort}
                    />

                    <tbody>{renderListRows()}</tbody>
                </table>
            </div>
        </Card>
    );
};

export default ReportToggleList;
