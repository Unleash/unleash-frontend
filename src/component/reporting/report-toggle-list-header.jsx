import React from "react";
import { Checkbox } from "react-mdl";

const ReportToggleListHeader = ({ handleCheckAll, checkAll }) => {
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
                <th>Name</th>
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
