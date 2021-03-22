import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { List, ListItem, ListItemIcon, Icon, ListItemText, IconButton, Tooltip, Typography } from '@material-ui/core';
import HeaderTitle from '../../common/HeaderTitle';
import PageContent from '../../common/PageContent/PageContent';
import ConditionallyRender from '../../common/conditionally-render';
import { CREATE_TAG_TYPE, DELETE_TAG_TYPE } from '../../../permissions';
import Dialogue from '../../common/Dialogue/Dialogue';

import styles from '../TagType.module.scss';

const TagTypeList = ({ tagTypes, fetchTagTypes, removeTagType, history, hasPermission }) => {
    const [deletion, setDeletion] = useState({ open: false });

    useCallback(() => {
        fetchTagTypes();
    }, [fetchTagTypes]);

    let header = (
        <HeaderTitle
            title="Tag Types"
            actions={
                <ConditionallyRender
                    condition={hasPermission(CREATE_TAG_TYPE)}
                    show={
                        <Tooltip title="Add tag type">
                            <IconButton aria-label="add tag type" onClick={() => history.push('/tag-types/create')}>
                                <Icon>add</Icon>
                            </IconButton>
                        </Tooltip>
                    }
                />
            }
        />
    );

    const renderTagType = tagType => {
        let link = (
            <Link to={`/tag-types/edit/${tagType.name}`}>
                <strong>{tagType.name}</strong>
            </Link>
        );
        let deleteButton = (
            <Tooltip title={`Delete ${tagType.name}`}>
                <IconButton
                    onClick={() =>
                        setDeletion({
                            open: true,
                            name: tagType.name,
                        })
                    }
                >
                    <Icon>delete</Icon>
                </IconButton>
            </Tooltip>
        );
        return (
            <ListItem key={`${tagType.name}`} classes={{ root: styles.tagListItem }}>
                <ListItemIcon>
                    <Icon>label</Icon>
                </ListItemIcon>
                <ListItemText primary={link} secondary={tagType.description} />
                <ConditionallyRender condition={hasPermission(DELETE_TAG_TYPE)} show={deleteButton} />
            </ListItem>
        );
    };
    return (
        <PageContent headerContent={header}>
            <List>
                <ConditionallyRender
                    condition={tagTypes.length > 0}
                    show={tagTypes.map(tagType => renderTagType(tagType))}
                    elseShow={<ListItem>No entries</ListItem>}
                />
            </List>
            <Dialogue
                title="Really delete Tag type?"
                open={deletion.open}
                onClick={() => {
                    removeTagType(deletion.name);
                    setDeletion({ open: false });
                }}
                onClose={() => {
                    setDeletion({ open: false });
                }}
            >
                <Typography>Are you sure?</Typography>
            </Dialogue>
        </PageContent>
    );
};

TagTypeList.propTypes = {
    tagTypes: PropTypes.array.isRequired,
    fetchTagTypes: PropTypes.func.isRequired,
    removeTagType: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
};

export default TagTypeList;
