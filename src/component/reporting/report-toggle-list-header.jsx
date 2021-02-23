import React from "react";
import { Checkbox } from "react-mdl";
import UnfoldMoreOutlinedIcon from "@material-ui/icons/UnfoldMoreOutlined";

import { NAME, LAST_SEEN, CREATED, EXPIRED, STATUS, REPORT } from "./constants";

import styles from "./reporting.module.scss";

const ReportToggleListHeader = ({ handleCheckAll, checkAll, setSortData }) => {
    const handleSort = type => {
        setSortData(prev => ({
            sortKey: type,
            ascending: !prev.ascending
        }));
    };

    return (
        <thead>
            <tr>
                <th>
                    <Checkbox
                        onChange={handleCheckAll}
                        value={checkAll}
                        checked={checkAll}
                    />
                </th>
                <th
                    role="button"
                    tabIndex={0}
                    style={{ width: "150px" }}
                    onClick={() => handleSort(NAME)}
                >
                    Name
                    <UnfoldMoreOutlinedIcon className={styles.sortIcon} />
                </th>
                <th
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSort(LAST_SEEN)}
                >
                    Last seen
                    <UnfoldMoreOutlinedIcon className={styles.sortIcon} />
                </th>
                <th
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSort(CREATED)}
                >
                    Created
                    <UnfoldMoreOutlinedIcon className={styles.sortIcon} />
                </th>
                <th
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSort(EXPIRED)}
                >
                    Expired
                    <UnfoldMoreOutlinedIcon className={styles.sortIcon} />
                </th>
                <th
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSort(STATUS)}
                >
                    Status
                    <UnfoldMoreOutlinedIcon className={styles.sortIcon} />
                </th>
                <th
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSort(REPORT)}
                >
                    Report
                    <UnfoldMoreOutlinedIcon className={styles.sortIcon} />
                </th>
            </tr>
        </thead>
    );
};

export default ReportToggleListHeader;
