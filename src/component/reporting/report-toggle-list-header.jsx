import React, { useState } from "react";
import { Checkbox } from "react-mdl";

import { NAME, LAST_SEEN } from "./constants";

import {
    sortProjectsByLastSeen,
    sortProjectsByNameAscending,
    sortProjectsByNameDescending
} from "./utils";

const ReportToggleListHeader = ({
    handleCheckAll,
    checkAll,
    setSortKey,
    sort,
    setToggleRowData
}) => {
    const ASCENDING = "ascending";
    const DESCENDING = "descending";
    const [sortNameState, setSortNameState] = useState(ASCENDING);

    const handleSort = type => {
        setSortKey(type);
        setToggleRowData(prev => {
            const sorted = sort(prev);
            console.log("SORTED", sorted[0].name);
            return sorted;
        });
    };

    const handleSortName = projects => {
        if (sortNameState === ASCENDING) {
            setSortNameState(DESCENDING);
            return sortProjectsByNameDescending(projects);
        }
        setSortNameState(ASCENDING);
        return sortProjectsByNameAscending(projects);
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
                <th style={{ width: "150px" }}>
                    Name <button onClick={() => handleSort(NAME)}>Sort</button>
                </th>
                <th>Last seen</th>
                <th>Created</th>
                <th>Expired</th>
                <th>Status</th>
                <th>Report</th>
            </tr>
        </thead>
    );
};

export default ReportToggleListHeader;
