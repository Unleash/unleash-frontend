import React from "react";
import { Checkbox } from "react-mdl";

import { sortProjectsByLastSeen, sortProjectsByName } from "./utils";

const NAME = "name";
const LAST_SEEN = "lastSeen";
const CREATED = "created";
const EXPIRED = "expired";
const STATUS = "status";
const REPORT = "report";

const ReportToggleListHeader = ({
    handleCheckAll,
    checkAll,
    setToggleRowData
}) => {
    const handleSort = type => {
        switch (type) {
            case NAME:
                setToggleRowData(prev => {
                    console.log("FIRING");
                    return sortProjectsByName(prev);
                });
                break;
            case LAST_SEEN:
                setToggleRowData(prev => {
                    return sortProjectsByLastSeen(prev);
                });

                break;
        }
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
