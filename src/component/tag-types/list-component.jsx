import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemIcon, ListItemText, Paper, IconButton, Tooltip } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { HeaderTitle, styles as commonStyles } from '../common';
import { CREATE_TAG_TYPE, DELETE_TAG_TYPE } from '../../permissions';
import ConditionallyRender from '../common/conditionally-render';

class TagTypesListComponent extends Component {
    static propTypes = {
        tagTypes: PropTypes.array.isRequired,
        fetchTagTypes: PropTypes.func.isRequired,
        removeTagType: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        hasPermission: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetchTagTypes();
    }

    removeTagType = (tagType, evt) => {
        evt.preventDefault();
        this.props.removeTagType(tagType);
    };

    render() {
        const { tagTypes, hasPermission } = this.props;
        return (
            <Paper shadow={0} className={commonStyles.fullwidth} style={{ overflow: 'visible' }}>
                <HeaderTitle
                    title="Tag Types"
                    actions={
                        hasPermission(CREATE_TAG_TYPE) ? (
                            <Tooltip title="Add tag type">
                                <IconButton
                                    aria-label="add tag type"
                                    onClick={() => this.props.history.push('/tag-types/create')}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            ''
                        )
                    }
                />
                <List>
                    <ConditionallyRender
                        condition={tagTypes.length > 0}
                        show={tagTypes.map((tagType, i) => {
                            let link = (
                                <Link to={`/tag-types/edit/${tagType.name}`}>
                                    <strong>{tagType.name}</strong>
                                </Link>
                            );
                            let deleteButton = (
                                <IconButton onClick={this.removeTagType.bind(this, tagType.name)}>
                                    <DeleteIcon />
                                </IconButton>
                            );
                            return (
                                <ListItem key={i}>
                                    <ListItemIcon>
                                        <LabelIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={link} secondary={tagType.description} />
                                    <ConditionallyRender
                                        condition={hasPermission(DELETE_TAG_TYPE)}
                                        show={deleteButton}
                                    />
                                </ListItem>
                            );
                        })}
                        elseShow={<ListItem>No entries</ListItem>}
                    />
                </List>
            </Paper>
        );
    }
}

export default TagTypesListComponent;
