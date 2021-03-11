import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemIcon, ListItemText, IconButton, Icon, Paper, Tooltip } from '@material-ui/core';
import { HeaderTitle, styles as commonStyles } from '../common';
import { CREATE_CONTEXT_FIELD, DELETE_CONTEXT_FIELD } from '../../permissions';
import ConditionallyRender from '../common/conditionally-render';

class ContextFieldListComponent extends Component {
    static propTypes = {
        contextFields: PropTypes.array.isRequired,
        fetchContext: PropTypes.func.isRequired,
        removeContextField: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        hasPermission: PropTypes.func.isRequired,
    };

    componentDidMount() {
        // this.props.fetchContext();
    }

    removeContextField = (contextField, evt) => {
        evt.preventDefault();
        this.props.removeContextField(contextField);
    };

    headerButton = () => {
        const { hasPermission } = this.props;
        return (
            <ConditionallyRender
                condition={hasPermission(CREATE_CONTEXT_FIELD)}
                show={
                    <Tooltip title="Add context type">
                        <IconButton onClick={() => this.props.history.push('/context/create')}>
                            <Icon>add</Icon>
                        </IconButton>
                    </Tooltip>
                }
            />
        );
    };

    contextList = () => {
        const { contextFields, hasPermission } = this.props;
        return contextFields.map((field, i) => (
            <ListItem key={i}>
                <ListItemIcon>
                    <Icon>album</Icon>
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Link to={`/context/edit/${field.name}`}>
                            <strong>{field.name}</strong>
                        </Link>
                    }
                    secondary={field.description}
                />
                <ConditionallyRender
                    condition={hasPermission(DELETE_CONTEXT_FIELD)}
                    show={
                        <Tooltip title="Delete context field">
                            <IconButton aria-label="delete" onClick={this.removeContextField.bind(this, field)}>
                                <Icon>delete</Icon>
                            </IconButton>
                        </Tooltip>
                    }
                />
            </ListItem>
        ));
    };

    render() {
        const { contextFields } = this.props;

        return (
            <Paper shadow={0} className={commonStyles.fullwidth} style={{ overflow: 'visible' }}>
                <HeaderTitle title="Context Fields" actions={this.headerButton()} />
                <List>
                    <ConditionallyRender
                        condition={contextFields.length > 0}
                        show={this.contextList()}
                        elseShow={<ListItem>No context fields defined</ListItem>}
                    />
                </List>
            </Paper>
        );
    }
}

export default ContextFieldListComponent;
