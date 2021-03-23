import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import styles from '../Tag.module.scss';
import { CREATE_TAG, DELETE_TAG } from '../../../permissions';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';
import HeaderTitle from '../../common/HeaderTitle';
import PageContent from '../../common/PageContent/PageContent';

const TagsListComponent = ({ tags, fetchTags, removeTag, history, hasPermission }) => {
    useEffect(() => {
        fetchTags();
    }, []);

    const remove = (tag, evt) => {
        evt.preventDefault();
        removeTag(tag);
    };

    const listItem = tag => (
        <ListItem key={`${tag.type}_${tag.value}`}>
            <ListItemIcon>
                <Icon>label</Icon>
            </ListItemIcon>
            <ListItemText primary={tag.value} secondary={tag.type} />
            <ConditionallyRender
                condition={hasPermission(DELETE_TAG)}
                show={<DeleteButton tagType={tag.type} tagValue={tag.value} />}
            />
        </ListItem>
    );

    const DeleteButton = ({ tagType, tagValue }) => (
        <Tooltip title="Delete tag">
            <IconButton onClick={e => remove({ type: tagType, value: tagValue }, e)}>
                <Icon>delete</Icon>
            </IconButton>
        </Tooltip>
    );

    const AddButton = ({ hasPermission }) => (
        <ConditionallyRender
            condition={hasPermission(CREATE_TAG)}
            show={
                <Tooltip title="Add new tag">
                    <Button color="primary" startIcon={<Icon>add</Icon>} onClick={() => history.push('/tags/create')}>
                        Add new tag
                    </Button>
                </Tooltip>
            }
        />
    );
    return (
        <PageContent headerContent={<HeaderTitle title="Tags" actions={<AddButton hasPermission={hasPermission} />} />}>
            <List>
                <ConditionallyRender
                    condition={tags.length > 0}
                    show={tags.map(tag => listItem(tag))}
                    elseShow={
                        <ListItem className={styles.tagListItem}>
                            <ListItemText primary="No tags available" />
                        </ListItem>
                    }
                />
            </List>
        </PageContent>
    );
};

TagsListComponent.propTypes = {
    tags: PropTypes.array.isRequired,
    fetchTags: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
};

export default TagsListComponent;
