import React from "react";
import {
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import ConditionallyRender from "../../../common/ConditionallyRender/ConditionallyRender";
import { DELETE_ADDON, UPDATE_ADDON } from "../../../../permissions";
import { Link } from "react-router-dom";
import PageContent from "../../../common/PageContent/PageContent";
import PropTypes from "prop-types";

const ConfiguredAddons = ({
    addons,
    hasPermission,
    removeAddon,
    getIcon,
    toggleAddon
}) => {
    const onRemoveAddon = addon => () => removeAddon(addon);
    const renderAddon = addon => (
        <ListItem key={addon.id}>
            <ListItemAvatar>{getIcon(addon.provider)}</ListItemAvatar>
            <ListItemText
                primary={
                    <span>
                        <ConditionallyRender
                            condition={hasPermission(UPDATE_ADDON)}
                            show={
                                <Link to={`/addons/edit/${addon.id}`}>
                                    <strong>{addon.provider}</strong>
                                </Link>
                            }
                            elseShow={<strong>{addon.provider}</strong>}
                        />
                        {addon.enabled ? null : <small> (Disabled)</small>}
                    </span>
                }
                secondary={addon.description}
            />
            <ListItemSecondaryAction>
                <ConditionallyRender
                    condition={hasPermission(UPDATE_ADDON)}
                    show={
                        <IconButton
                            size="small"
                            title={
                                addon.enabled ? "Disable addon" : "Enable addon"
                            }
                            onClick={() => toggleAddon(addon)}
                        >
                            <Icon>
                                {addon.enabled
                                    ? "visibility"
                                    : "visibility_off"}
                            </Icon>
                        </IconButton>
                    }
                />
                <ConditionallyRender
                    condition={hasPermission(DELETE_ADDON)}
                    show={
                        <IconButton
                            size="small"
                            title="Remove addon"
                            onClick={onRemoveAddon(addon)}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    }
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
    return (
        <PageContent headerContent="Configured addons">
            <List>{addons.map(addon => renderAddon(addon))}</List>
        </PageContent>
    );
};
ConfiguredAddons.propTypes = {
    addons: PropTypes.array.isRequired,
    hasPermission: PropTypes.func.isRequired,
    removeAddon: PropTypes.func.isRequired,
    toggleAddon: PropTypes.func.isRequired,
    getIcon: PropTypes.func.isRequired
};

export default ConfiguredAddons;
