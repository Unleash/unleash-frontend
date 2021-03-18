import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Paper,
    Button,
    Icon,
    IconButton
} from "@material-ui/core";
import { HeaderTitle, styles as commonStyles } from "../common";
import { CREATE_ADDON, DELETE_ADDON, UPDATE_ADDON } from "../../permissions";
import ConditionallyRender from "../common/conditionally-render";
import PageContent from "../common/PageContent/PageContent";

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

const AddonListComponent = ({
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

    const onRemoveAddon = addon => () => removeAddon(addon);

    return (
        <>
            <ConditionallyRender
                condition={addons.length > 0}
                show={
                    <PageContent headerContent="Configured addons">
                        <List>
                            {addons.map(addon => (
                                <ListItem key={addon.id}>
                                    <ListItemAvatar>
                                        {getIcon(addon.provider)}
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <span>
                                                <ConditionallyRender
                                                    condition={hasPermission(
                                                        UPDATE_ADDON
                                                    )}
                                                    show={
                                                        <Link
                                                            to={`/addons/edit/${addon.id}`}
                                                        >
                                                            <strong>
                                                                {addon.provider}
                                                            </strong>
                                                        </Link>
                                                    }
                                                    elseShow={
                                                        <strong>
                                                            {addon.provider}
                                                        </strong>
                                                    }
                                                />
                                                {addon.enabled ? null : (
                                                    <small> (Disabled)</small>
                                                )}
                                            </span>
                                        }
                                        secondary={addon.description}
                                    />
                                    <ListItemSecondaryAction>
                                        <ConditionallyRender
                                            condition={hasPermission(
                                                UPDATE_ADDON
                                            )}
                                            show={
                                                <IconButton
                                                    size="small"
                                                    title={
                                                        addon.enabled
                                                            ? "Disable addon"
                                                            : "Enable addon"
                                                    }
                                                    onClick={() =>
                                                        toggleAddon(addon)
                                                    }
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
                                            condition={hasPermission(
                                                DELETE_ADDON
                                            )}
                                            show={
                                                <IconButton
                                                    size="small"
                                                    title="Remove addon"
                                                    onClick={onRemoveAddon(
                                                        addon
                                                    )}
                                                >
                                                    <Icon>delete</Icon>
                                                </IconButton>
                                            }
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </PageContent>
                }
            />

            <br />
            <PageContent headerContent="Available addons">
                <List>
                    {providers.map((provider, i) => (
                        <ListItem key={i}>
                            <ListItemAvatar>
                                {getIcon(provider.name)}
                            </ListItemAvatar>
                            <ListItemText
                                primary={provider.displayName}
                                secondary={provider.description}
                            />
                            <ListItemSecondaryAction>
                                <ConditionallyRender
                                    condition={hasPermission(CREATE_ADDON)}
                                    show={
                                        <Button
                                            variant="contained"
                                            name="device_hub"
                                            onClick={() =>
                                                history.push(
                                                    `/addons/create/${provider.name}`
                                                )
                                            }
                                            title="Configure"
                                        >
                                            Configure
                                        </Button>
                                    }
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </PageContent>
        </>
    );
};
AddonListComponent.propTypes = {
    addons: PropTypes.array.isRequired,
    providers: PropTypes.array.isRequired,
    fetchAddons: PropTypes.func.isRequired,
    removeAddon: PropTypes.func.isRequired,
    toggleAddon: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired
};

export default AddonListComponent;
