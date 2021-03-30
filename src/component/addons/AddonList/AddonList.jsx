import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ConfiguredAddons from "./ConfiguredAddons";
import AvailableAddons from "./AvailableAddons";
import { Avatar, Icon } from "@material-ui/core";
import ConditionallyRender from "../../common/ConditionallyRender/ConditionallyRender";

const style = {
    width: "40px",
    height: "40px",
    marginRight: "16px",
    float: "left"
};

const getIcon = name => {
    switch (name) {
        case "slack":
            return <img style={style} src="public/slack.svg" />;
        case "jira-comment":
            return <img style={style} src="public/jira.svg" />;
        case "webhook":
            return <img style={style} src="public/webhooks.svg" />;
        default:
            return (
                <Avatar>
                    <Icon>device_hub</Icon>
                </Avatar>
            );
    }
};

const AddonList = ({
    addons,
    providers,
    fetchAddons,
    removeAddon,
    toggleAddon,
    history,
    hasPermission
}) => {
    useEffect(() => {
        if (addons.length === 0) {
            fetchAddons();
        }
    }, []);

    return (
        <>
            <ConditionallyRender
                condition={addons.length > 0}
                show={
                    <ConfiguredAddons
                        addons={addons}
                        toggleAddon={toggleAddon}
                        hasPermission={hasPermission}
                        removeAddon={removeAddon}
                        getIcon={getIcon}
                    />
                }
            />

            <br />
            <AvailableAddons
                providers={providers}
                hasPermission={hasPermission}
                history={history}
                getIcon={getIcon}
            />
        </>
    );
};

AddonList.propTypes = {
    addons: PropTypes.array.isRequired,
    providers: PropTypes.array.isRequired,
    fetchAddons: PropTypes.func.isRequired,
    removeAddon: PropTypes.func.isRequired,
    toggleAddon: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired
};

export default AddonList;
