import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, List, ListItem, ListItemText, ListItemAvatar, Switch, Icon } from '@material-ui/core';
import { shorten } from '../common';
import { CREATE_FEATURE, CREATE_STRATEGY } from '../../permissions';
import ConditionallyRender from '../common/conditionally-render';

function ApplicationView({ seenToggles, hasPermission, strategies, instances, formatFullDateTime }) {
    const notFoundListItem = (createUrl, name, i) => (
        <ConditionallyRender
            condition={hasPermission(CREATE_FEATURE)}
            show={
                <ListItem key={i}>
                    <ListItemAvatar>
                        <Icon>report</Icon>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Link to={`${createUrl}?name=${name}`}>{name}</Link>}
                        secondary={'Missing, want to create?'}
                    />
                </ListItem>
            }
            elseShow={<ListItem key={i} />}
        />
    );

    // eslint-disable-next-line react/prop-types
    const foundListItem = ({ viewUrl, name, showSwitch, enabled, description, i }) => (
        <ListItem key={`${name}-${i}`}>
            <ListItemAvatar>
                <ConditionallyRender
                    condition={showSwitch}
                    show={<Switch disabled value={!!enabled} />}
                    elseShow={<Icon>extension</Icon>}
                />
            </ListItemAvatar>
            <ListItemText
                primary={<Link to={`${viewUrl}/${name}`}>{shorten(name, 50)}</Link>}
                secondary={shorten(description, 60)}
            />
        </ListItem>
    );
    return (
        <Grid container style={{ margin: 0 }}>
            <Grid item xl={6} md={6} xs={12}>
                <h6> Toggles</h6>
                <hr />
                <List>
                    {seenToggles.map(({ name, description, enabled, notFound }, i) => (
                        <ConditionallyRender
                            condition={notFound}
                            show={notFoundListItem(name, '/features/create', i)}
                            elseShow={foundListItem({
                                viewUrl: '/features/strategies',
                                name,
                                showSwitch: true,
                                enabled,
                                description,
                                i,
                            })}
                        />
                    ))}
                </List>
            </Grid>
            <Grid item xl={6} md={6} xs={12}>
                <h6>Implemented strategies</h6>
                <hr />
                <List>
                    {strategies.map(({ name, description, notFound }, i) => (
                        <ConditionallyRender
                            condition={notFound}
                            show={notFoundListItem('/strategies/create', name, i)}
                            elseShow={foundListItem({
                                viewUrl: '/strategies/view',
                                name,
                                showSwitch: false,
                                enabled: undefined,
                                description,
                                i,
                            })}
                        />
                    ))}
                </List>
            </Grid>
            <Grid item xl={12} md={12}>
                <h6>{instances.length} Instances registered</h6>
                <hr />
                <List>
                    {instances.map(({ instanceId, clientIp, lastSeen, sdkVersion }, i) => (
                        <ListItem key={i}>
                            <ListItemAvatar>
                                <Icon>timeline</Icon>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <ConditionallyRender
                                        condition={sdkVersion}
                                        show={`${instanceId} (${sdkVersion})`}
                                        elseShow={instanceId}
                                    />
                                }
                                secondary={
                                    <span>
                                        {clientIp} last seen at <small>{formatFullDateTime(lastSeen)}</small>
                                    </span>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
}

ApplicationView.propTypes = {
    instances: PropTypes.array.isRequired,
    seenToggles: PropTypes.array.isRequired,
    strategies: PropTypes.array.isRequired,
    hasPermission: PropTypes.func.isRequired,
    formatFullDateTime: PropTypes.func.isRequired,
};

export default ApplicationView;
