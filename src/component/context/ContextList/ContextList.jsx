import PropTypes from 'prop-types';
import PageContent from '../../common/PageContent/PageContent';
import HeaderTitle from '../../common/HeaderTitle';
import ConditionallyRender from '../../common/conditionally-render';
import { CREATE_CONTEXT_FIELD, DELETE_CONTEXT_FIELD } from '../../../permissions';
import { Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';

const ContextList = ({ removeContextField, hasPermission, history, fetchContext, contextFields }) => {
    const styles = useStyles();
    const contextList = () =>
        contextFields.map(field => (
            <ListItem key={field.name} classes={{ root: styles.listItem }}>
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
                            <IconButton aria-label="delete" onClick={() => removeContextField(field)}>
                                <Icon>delete</Icon>
                            </IconButton>
                        </Tooltip>
                    }
                />
            </ListItem>
        ));
    const headerButton = () => (
        <ConditionallyRender
            condition={hasPermission(CREATE_CONTEXT_FIELD)}
            show={
                <Tooltip title="Add context type">
                    <IconButton onClick={() => history.push('/context/create')}>
                        <Icon>add</Icon>
                    </IconButton>
                </Tooltip>
            }
        />
    );
    return (
        <PageContent headerContent={<HeaderTitle actions={headerButton()} title={'Context fields'} />}>
            <List>
                <ConditionallyRender
                    condition={contextFields.length > 0}
                    show={contextList}
                    elseShow={<ListItem>No context fields defined</ListItem>}
                />
            </List>
        </PageContent>
    );
};

ContextList.propTypes = {
    contextFields: PropTypes.array.isRequired,
    fetchContext: PropTypes.func.isRequired,
    removeContextField: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
};

export default ContextList;
