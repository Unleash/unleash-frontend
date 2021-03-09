import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, ListItem, ListItemText, Card, CardHeader, IconButton, ListItemIcon, Icon } from '@material-ui/core';
import { styles as commonStyles } from '../common';
import { CREATE_TAG, DELETE_TAG } from '../../permissions';
import ConditionallyRender from '../common/conditionally-render';

class TagsListComponent extends Component {
    static propTypes = {
        tags: PropTypes.array.isRequired,
        fetchTags: PropTypes.func.isRequired,
        removeTag: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        hasPermission: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetchTags();
    }

    removeTag = (tag, evt) => {
        evt.preventDefault();
        this.props.removeTag(tag);
    };

    render() {
        const { tags, hasPermission } = this.props;
        let deleteButton = (tagType, tagValue) => (
            <IconButton onClick={this.removeTag.bind(this, { tagType, tagValue })}>
                <Icon>delete</Icon>
            </IconButton>
        );
        let addButton = (
            <IconButton raised onClick={() => this.props.history.push('/tags/create')}>
                <Icon>add</Icon>
                Add new tag
            </IconButton>
        );
        return (
            <Card shadow={0} className={commonStyles.fullwidth} style={{ overflow: 'visible' }}>
                <CardHeader
                    title="Tags"
                    action={<ConditionallyRender condition={hasPermission(CREATE_TAG)} show={addButton} />}
                />
                <List>
                    <ConditionallyRender
                        condition={tags.length > 0}
                        show={tags.map((tag, i) => (
                            <ListItem key={i}>
                                <ListItemIcon>
                                    <Icon>label</Icon>
                                </ListItemIcon>
                                <ListItemText primary={tag.value} secondary={tag.type} />
                                <ConditionallyRender
                                    condition={hasPermission(DELETE_TAG)}
                                    show={deleteButton(tag.type, tag.value)}
                                />
                            </ListItem>
                        ))}
                        elseShow={
                            <ListItem>
                                <ListItemText primary="No tags available" />
                            </ListItem>
                        }
                    />
                </List>
            </Card>
        );
    }
}

export default TagsListComponent;
