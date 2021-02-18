import React from "react";
import { Checkbox } from "react-mdl";

const ReportToggleListItem = ({ name, stale, lastSeenAt, createdAt }) => {
    return (
        <tr>
            <td>
                <Checkbox />
            </td>
            <td>{name}</td>
            <td>50 days</td>
            <td>100 days ago</td>
            <td>60 days ago</td>
            <td>{stale ? "Stale" : "Active"}</td>
            <td>Potentially stale</td>
        </tr>
    );
};

export default ReportToggleListItem;
