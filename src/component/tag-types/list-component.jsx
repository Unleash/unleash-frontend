import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
    List,
    ListItem,
    ListItemIcon,
    Icon,
    ListItemText,
    Paper,
    IconButton,
    Tooltip,
    Typography,
} from '@material-ui/core';
import { HeaderTitle, styles as commonStyles } from '../common';
import { CREATE_TAG_TYPE, DELETE_TAG_TYPE } from '../../permissions';
import ConditionallyRender from '../common/conditionally-render';
import Dialogue from '../common/Dialogue/Dialogue';

const TagTypesListComponent = ({ tagTypes, fetchTagTypes, removeTagType, history, hasPermission }) => {
    const [showDelDialog, setShowDelDialog] = useState(false);
    const [delType, setDelType] = useState();

    useCallback(() => {
        fetchTagTypes();
    }, [fetchTagTypes]);

    return (
        <Paper shadow={0} className={commonStyles.fullwidth} style={{ overflow: 'visible' }}>
            <HeaderTitle
                className={commonStyles.sectionPadding}
                title="Tag Types"
                actions={
                    hasPermission(CREATE_TAG_TYPE) ? (
                        <Tooltip title="Add tag type">
                            <IconButton aria-label="add tag type" onClick={() => history.push('/tag-types/create')}>
                                <Icon>add</Icon>
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
                            <Tooltip title={`Delete ${tagType.name}`}>
                                <IconButton
                                    onClick={() => {
                                        setDelType(tagType.name);
                                        setShowDelDialog(true);
                                    }}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                            </Tooltip>
                        );
                        return (
                            <ListItem key={i}>
                                <ListItemIcon>
                                    <Icon>label</Icon>
                                </ListItemIcon>
                                <ListItemText primary={link} secondary={tagType.description} />
                                <ConditionallyRender condition={hasPermission(DELETE_TAG_TYPE)} show={deleteButton} />
                            </ListItem>
                        );
                    })}
                    elseShow={<ListItem>No entries</ListItem>}
                />
            </List>
            <Dialogue
                title="Really delete Tag type?"
                open={showDelDialog}
                onClick={() => {
                    removeTagType(delType);
                    setDelType(undefined);
                    setShowDelDialog(false);
                }}
                onClose={() => {
                    setDelType(undefined);
                    setShowDelDialog(false);
                }}
            >
                <Typography>Are you sure?</Typography>
            </Dialogue>
        </Paper>
    );
};

TagTypesListComponent.propTypes = {
    tagTypes: PropTypes.array.isRequired,
    fetchTagTypes: PropTypes.func.isRequired,
    removeTagType: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
};

export default TagTypesListComponent;
