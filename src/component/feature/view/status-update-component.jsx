import React from "react";
import { MenuItem } from "@material-ui/core";
import DropdownMenu from "../../common/dropdown-menu";
import PropTypes from "prop-types";

export default function StatusUpdateComponent({ stale, updateStale }) {
    function setStatus(field) {
        if (field === "active") {
            updateStale(false);
        } else if (field === "stale") {
            updateStale(true);
        }
    }

    const renderOptions = () => {
        return [
            <MenuItem disabled={!stale} data-target="active">
                Set toggle Active
            </MenuItem>,
            <MenuItem disabled={stale} data-target="stale">
                Mark toggle as Stale
            </MenuItem>
        ];
    };

    const onClick = e => {
        setStatus(e.target.getAttribute("data-target"));
    };

    return (
        <DropdownMenu
            callback={onClick}
            renderOptions={renderOptions}
            id="feature-stale-dropdown"
            label={stale ? "STALE" : "ACTIVE"}
            style={{ fontWeight: "bold" }}
        />
    );
}

StatusUpdateComponent.propTypes = {
    stale: PropTypes.bool.isRequired,
    updateStale: PropTypes.func.isRequired
};
