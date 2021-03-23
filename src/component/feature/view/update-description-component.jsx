import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    InputAdornment,
    OutlinedInput,
    IconButton,
    FormControl,
    TextField,
    Button,
    InputLabel
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import ConditionallyRender from "../../common/ConditionallyRender/ConditionallyRender";

import { UPDATE_FEATURE } from "../../../permissions";

import styles from "./update-description-component.module.scss";

export default class UpdateDescriptionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false };
    }

    static propTypes = {
        isFeatureView: PropTypes.bool.isRequired,
        update: PropTypes.func,
        featureToggle: PropTypes.object,
        hasPermission: PropTypes.func.isRequired
    };

    onEditMode = (description, evt) => {
        evt.preventDefault();
        this.setState({ editMode: true, description });
    };

    updateValue = evt => {
        evt.preventDefault();
        this.setState({ description: evt.target.value });
    };

    onSave = evt => {
        evt.preventDefault();
        this.props.update(this.state.description);
        this.setState({ editMode: false, description: undefined });
    };

    onCancel = evt => {
        evt.preventDefault();
        this.setState({ editMode: false, description: undefined });
    };

    renderRead({ description, isFeatureView, hasPermission }) {
        const showAdornMent = isFeatureView && hasPermission(UPDATE_FEATURE);
        return (
            <FormControl size="small" variant="outlined">
                <InputLabel htmlFor="description-input">Description</InputLabel>
                <OutlinedInput
                    className={styles.descriptionInput}
                    value={description}
                    type="text"
                    placeholder="Your feature toggles description here"
                    id="description-input"
                    labelWidth={70}
                    disabled
                    endAdornment={
                        <ConditionallyRender
                            condition={showAdornMent}
                            show={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle description edit"
                                        to="#edit"
                                        component={Link}
                                        onClick={this.onEditMode.bind(
                                            this,
                                            description
                                        )}
                                    >
                                        <CreateIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    }
                />
            </FormControl>
        );
    }

    renderEdit() {
        const { description } = this.state;
        return (
            <div>
                <TextField
                    className={styles.descriptionInput}
                    label="Description"
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={this.updateValue}
                />
                <div style={{ marginTop: "0.5rem" }}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        onClick={this.onSave}
                    >
                        Save
                    </Button>
                    &nbsp;
                    <Button type="cancel" raised onClick={this.onCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }

    render() {
        const { editMode } = this.state;
        return editMode
            ? this.renderEdit(this.props)
            : this.renderRead(this.props);
    }
}
