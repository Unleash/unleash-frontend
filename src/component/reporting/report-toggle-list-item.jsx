import React from "react";
import { Checkbox } from "react-mdl";

import { pluralize } from "./utils";

import { format } from "date-fns";
import differenceInDays from "date-fns/differenceInDays";

const ReportToggleListItem = ({
    name,
    stale,
    lastSeenAt,
    createdAt,
    type,
    checked,
    setFeatures
}) => {
    const EXPERIMENT = "experiment";
    const RELEASE = "release";
    const OPERATIONAL = "operational";
    const KILLSWITCH = "kill-switch";

    const FOURTYDAYS = 20;
    const SEVENDAYS = 7;

    const toggleExpiryByType = {
        [EXPERIMENT]: FOURTYDAYS,
        [RELEASE]: FOURTYDAYS,
        [OPERATIONAL]: SEVENDAYS
    };

    const handleChange = () => {
        setFeatures(prevState => {
            const newState = [...prevState];

            return newState.map(feature => {
                if (nameMatches(feature)) {
                    return { ...feature, checked: !feature.checked };
                }
                return feature;
            });
        });
    };

    const nameMatches = feature => feature.name === name;

    const formatDates = (date, now) => {
        const diff = Math.abs(differenceInDays(date, now));

        return pluralize(diff, "day");
    };

    const formatCreatedAt = () => {
        const date = new Date(createdAt);
        const now = new Date();

        return `${formatDates(date, now)} ago`;
    };

    const formatExpiredAt = () => {
        if (type === KILLSWITCH || type === OPERATIONAL) {
            return "N/A";
        }

        const date = new Date(createdAt);
        const now = new Date();

        const diff = Math.abs(differenceInDays(date, now));

        if (expired(diff)) {
            const result = diff - toggleExpiryByType[type];
            console.log(pluralize(result, "day"));
            return pluralize(result, "day");
        }
        return "";
    };

    const expired = diff => {
        if (diff >= toggleExpiryByType[type]) return true;
        return false;
    };

    const formatLastSeenAt = () => {
        const date = new Date(lastSeenAt);
        const now = new Date();

        const diff = Math.abs(differenceInDays(date, now));
        if (diff) {
            return pluralize(diff, "day");
        }

        return "Never";
    };

    console.log(type);

    return (
        <tr>
            <td>
                <Checkbox
                    checked={checked}
                    value={checked}
                    onChange={handleChange}
                />
            </td>
            <td>{name}</td>
            <td>{formatLastSeenAt()}</td>
            <td>{formatCreatedAt()}</td>
            <td>{formatExpiredAt()}</td>
            <td>{stale ? "Stale" : "Active"}</td>
            <td>Potentially stale</td>
        </tr>
    );
};

export default React.memo(ReportToggleListItem);
