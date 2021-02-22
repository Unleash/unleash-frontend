import React, { useState } from "react";
import { Checkbox } from "react-mdl";

import { NAME, LAST_SEEN } from "./constants";

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
