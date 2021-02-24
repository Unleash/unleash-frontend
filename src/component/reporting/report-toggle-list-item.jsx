import React from "react";
import classnames from "classnames";

import { Checkbox } from "react-mdl";
import CheckIcon from "@material-ui/icons/Check";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import ConditionallyRender from "../common/conditionally-render";

import {
    pluralize,
    getDates,
    expired,
    toggleExpiryByTypeMap,
    getDiffInDays
} from "./utils";
import { KILLSWITCH, PERMISSION } from "./constants";

import styles from "./reporting.module.scss";

const ReportToggleListItem = ({
    name,
    stale,
    lastSeenAt,
    createdAt,
    type,
    checked,
    bulkActionsOn,
    setFeatures
}) => {
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

    const formatCreatedAt = () => {
        const [date, now] = getDates(createdAt);

        const diff = getDiffInDays(date, now);
        if (diff === 0) return "1 day";

        const formatted = pluralize(diff, "day");

        return `${formatted} ago`;
    };

    const formatExpiredAt = () => {
        if (type === KILLSWITCH || type === PERMISSION) {
            return "N/A";
        }

        const [date, now] = getDates(createdAt);
        const diff = getDiffInDays(date, now);

        if (expired(diff, type)) {
            const result = diff - toggleExpiryByTypeMap[type];
            if (result === 0) return "1 day";

            return pluralize(result, "day");
        }
    };

    const formatLastSeenAt = () => {
        if (!lastSeenAt) return "Never";

        const [date, now] = getDates(lastSeenAt);
        const diff = getDiffInDays(date, now);
        if (diff === 0) return "1 day";

        if (diff) {
            return pluralize(diff, "day");
        }

        return "1 day";
    };

    const formatReportStatus = () => {
        if (type === KILLSWITCH || type === PERMISSION) {
            return renderStatus(
                <CheckIcon className={styles.reportIcon} />,
                "Active"
            );
        }

        const [date, now] = getDates(createdAt);
        const diff = getDiffInDays(date, now);

        if (expired(diff, type)) {
            return renderStatus(
                <ReportProblemOutlinedIcon className={styles.reportIcon} />,
                "Potentially stale"
            );
        }

        return renderStatus(
            <CheckIcon className={styles.reportIcon} />,
            "Active"
        );
    };

    const renderStatus = (icon, text) => {
        return (
            <span className={styles.reportStatus}>
                {icon}
                {text}
            </span>
        );
    };

    const statusClasses = classnames(styles.active, {
        [styles.stale]: stale
    });

    return (
        <tr>
            <ConditionallyRender
                condition={bulkActionsOn}
                show={
                    <td>
                        <Checkbox
                            checked={checked}
                            value={checked}
                            onChange={handleChange}
                        />
                    </td>
                }
            />
            <td>{name}</td>
            <td>{formatLastSeenAt()}</td>
            <td>{formatCreatedAt()}</td>
            <td className={styles.expired}>{formatExpiredAt()}</td>
            <td className={statusClasses}>{stale ? "Stale" : "Active"}</td>
            <td>{formatReportStatus()}</td>
        </tr>
    );
};

export default React.memo(ReportToggleListItem);
