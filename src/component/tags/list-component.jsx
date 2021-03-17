import React, { Component } from "react";
import PropTypes from "prop-types";

import {
    List,
    ListItem,
    ListItemText,
    Paper,
    IconButton,
    ListItemIcon,
    Tooltip,
    Icon
} from "@material-ui/core";
import { styles as commonStyles } from "../common";
import styles from "./Tag.module.scss";
import { CREATE_TAG, DELETE_TAG } from "../../permissions";
import ConditionallyRender from "../common/conditionally-render";

class TagsListComponent extends Component {
    static propTypes = {
        tags: PropTypes.array.isRequired,
        fetchTags: PropTypes.func.isRequired,
        removeTag: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        hasPermission: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.fetchTags();
    }

    removeTag = (tag, evt) => {
        evt.preventDefault();
        this.props.removeTag(tag);
    };

    renderListItems = () => {
        const { tags, hasPermission } = this.props;
        return tags.map((tag, i) => (
            <ListItem key={i} className={styles.tagListItem}>
                <ListItemIcon>
                    <Icon>label</Icon>
                </ListItemIcon>
                <ListItemText primary={tag.value} secondary={tag.type} />
                <ConditionallyRender
                    condition={hasPermission(DELETE_TAG)}
                    show={this.deleteButton(tag.type, tag.value)}
                />
            </ListItem>
        ));
    };

    deleteButton = (tagType, tagValue) => (
        <Tooltip title="Delete tag">
            <IconButton
                onClick={this.removeTag.bind(this, { tagType, tagValue })}
            >
                <Icon>delete</Icon>
            </IconButton>
        </Tooltip>
    );

    addButton = () => {
        const { hasPermission } = this.props;
        return (
            <ConditionallyRender
                condition={hasPermission(CREATE_TAG)}
                show={
                    <Tooltip title="Add new tag">
                        <IconButton
                            raised
                            onClick={() =>
                                this.props.history.push("/tags/create")
                            }
                        >
                            <Icon>add</Icon>
                        </IconButton>
                    </Tooltip>
                }
            />
        );
    };

    render() {
        const { tags } = this.props;
        return (
            <Paper
                shadow={0}
                className={commonStyles.fullwidth}
                style={{ overflow: "visible" }}
            >
                <div className={styles.header}>
                    <h1>Tags</h1>
                    <div>{this.addButton()}</div>
                </div>
                <List>
                    <ConditionallyRender
                        condition={tags.length > 0}
                        show={this.renderListItems(tags)}
                        elseShow={
                            <ListItem className={styles.tagListItem}>
                                <ListItemText primary="No tags available" />
                            </ListItem>
                        }
                    />
                </List>
            </Paper>
        );
    }
}

export default TagsListComponent;
