import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemAvatar, IconButton, Icon, Paper, ListItemText, Tooltip } from '@material-ui/core';
import { HeaderTitle, styles as commonStyles } from '../common';
import { CREATE_STRATEGY, DELETE_STRATEGY } from '../../permissions';

import styles from './strategies.module.scss';
import ConditionallyRender from '../common/conditionally-render';

class StrategiesListComponent extends Component {
    static propTypes = {
        strategies: PropTypes.array.isRequired,
        fetchStrategies: PropTypes.func.isRequired,
        removeStrategy: PropTypes.func.isRequired,
        deprecateStrategy: PropTypes.func.isRequired,
        reactivateStrategy: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        hasPermission: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetchStrategies();
    }

    headerButton = () => {
        const { hasPermission } = this.props;
        return (
            <ConditionallyRender
                condition={hasPermission(CREATE_STRATEGY)}
                show={
                    <Tooltip title="Add new strategy">
                        <IconButton onClick={() => this.props.history.push('/strategies/create')}>
                            <Icon>add</Icon>
                        </IconButton>
                    </Tooltip>
                }
            />
        );
    };

    strategyLink = ({ name, deprecated }) => (
        <Link to={`/strategies/view/${name}`}>
            <strong>{name}</strong>
            <ConditionallyRender condition={deprecated} show={<small> (Deprecated)</small>} />
        </Link>
    );

    reactivateButton = strategy => {
        const { reactivateStrategy } = this.props;
        return (
            <Tooltip title="Reactivate activation strategy">
                <IconButton onClick={() => reactivateStrategy(strategy)}>
                    <Icon>visibility</Icon>
                </IconButton>
            </Tooltip>
        );
    };

    deprecateButton = strategy => {
        const { deprecateStrategy } = this.props;
        return (
            <ConditionallyRender
                condition={strategy.name === 'default'}
                show={
                    <Tooltip title="You cannot deprecate the default strategy">
                        <div>
                            <IconButton disabled>
                                <Icon>visibility_off</Icon>
                            </IconButton>
                        </div>
                    </Tooltip>
                }
                elseShow={
                    <Tooltip title="Deprecate activation strategy">
                        <div>
                            <IconButton onClick={() => deprecateStrategy(strategy)}>
                                <Icon>visibility_off</Icon>
                            </IconButton>
                        </div>
                    </Tooltip>
                }
            />
        );
    };

    deleteButton = strategy => {
        const { removeStrategy } = this.props;
        return (
            <ConditionallyRender
                condition={strategy.editable}
                show={
                    <Tooltip title="Delete strategy">
                        <IconButton onClick={() => removeStrategy(strategy)}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </Tooltip>
                }
                elseShow={
                    <Tooltip title="You cannot delete a built-in strategy">
                        <div>
                            <IconButton disabled>
                                <Icon>delete</Icon>
                            </IconButton>
                        </div>
                    </Tooltip>
                }
            />
        );
    };

    strategyList = () => {
        const { strategies, hasPermission } = this.props;
        return strategies.map((strategy, i) => (
            <ListItem key={i} className={strategy.deprecated ? styles.deprecated : undefined}>
                <ListItemAvatar>
                    <Icon>extension</Icon>
                </ListItemAvatar>
                <ListItemText primary={this.strategyLink(strategy)} secondary={strategy.description} />
                <ConditionallyRender
                    condition={strategy.deprecated}
                    show={this.reactivateButton(strategy)}
                    elseShow={this.deprecateButton(strategy)}
                />
                <ConditionallyRender condition={hasPermission(DELETE_STRATEGY)} show={this.deleteButton(strategy)} />
            </ListItem>
        ));
    };

    render() {
        const { strategies } = this.props;

        return (
            <Paper shadow={0} className={commonStyles.fullwidth}>
                <HeaderTitle title="Strategies" actions={this.headerButton()} />
                <List>
                    <ConditionallyRender
                        condition={strategies.length > 0}
                        show={this.strategyList()}
                        elseShow={<ListItem>No strategies found</ListItem>}
                    />
                </List>
            </Paper>
        );
    }
}

export default StrategiesListComponent;
