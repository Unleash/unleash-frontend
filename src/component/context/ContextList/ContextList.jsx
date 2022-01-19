import PropTypes from 'prop-types';
import PageContent from '../../common/PageContent/PageContent';
import HeaderTitle from '../../common/HeaderTitle';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';
import {
    CREATE_CONTEXT_FIELD,
    DELETE_CONTEXT_FIELD,
    UPDATE_CONTEXT_FIELD,
} from '../../providers/AccessProvider/permissions';
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    useMediaQuery,
    Button,
} from '@material-ui/core';
import { Add, Album, Delete } from '@material-ui/icons';

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';
import ConfirmDialogue from '../../common/Dialogue';
import AccessContext from '../../../contexts/AccessContext';
import useUnleashContext from '../../../hooks/api/getters/useUnleashContext/useUnleashContext';

const ContextList = ({ removeContextField, history }) => {
    const { hasAccess } = useContext(AccessContext);
    const [showDelDialogue, setShowDelDialogue] = useState(false);
    const smallScreen = useMediaQuery('(max-width:700px)');
    const [name, setName] = useState();
    const { context, refetch } = useUnleashContext();

    const styles = useStyles();
    const contextList = () =>
        context.map(field => (
            <ListItem key={field.name} classes={{ root: styles.listItem }}>
                <ListItemIcon>
                    <Album />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <ConditionallyRender
                            condition={hasAccess(UPDATE_CONTEXT_FIELD)}
                            show={
                                <Link to={`/context/edit/${field.name}`}>
                                    <strong>{field.name}</strong>
                                </Link>
                            }
                            elseShow={<strong>{field.name}</strong>}
                        />
                    }
                    secondary={field.description}
                />
                <ConditionallyRender
                    condition={hasAccess(DELETE_CONTEXT_FIELD)}
                    show={
                        <Tooltip title="Delete context field">
                            <IconButton
                                aria-label="delete"
                                onClick={() => {
                                    setName(field.name);
                                    setShowDelDialogue(true);
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    }
                />
            </ListItem>
        ));
    const headerButton = () => (
        <ConditionallyRender
            condition={hasAccess(CREATE_CONTEXT_FIELD)}
            show={
                <ConditionallyRender
                    condition={smallScreen}
                    show={
                        <Tooltip title="Add context type">
                            <IconButton
                                onClick={() => history.push('/context/create')}
                            >
                                <Add />
                            </IconButton>
                        </Tooltip>
                    }
                    elseShow={
                        <Button
                            onClick={() => history.push('/context/create')}
                            color="primary"
                            variant="contained"
                        >
                            Add new context field
                        </Button>
                    }
                />
            }
        />
    );
    return (
        <PageContent
            headerContent={
                <HeaderTitle
                    actions={headerButton()}
                    title={'Context fields'}
                />
            }
        >
            <List>
                <ConditionallyRender
                    condition={context.length > 0}
                    show={contextList}
                    elseShow={<ListItem>No context fields defined</ListItem>}
                />
            </List>
            <ConfirmDialogue
                open={showDelDialogue}
                onClick={() => {
                    removeContextField({ name });
                    refetch();
                    setName(undefined);
                    setShowDelDialogue(false);
                }}
                onClose={() => {
                    setName(undefined);
                    setShowDelDialogue(false);
                }}
                title="Really delete context field"
            />
        </PageContent>
    );
};

ContextList.propTypes = {
    contextFields: PropTypes.array.isRequired,
    removeContextField: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default ContextList;
