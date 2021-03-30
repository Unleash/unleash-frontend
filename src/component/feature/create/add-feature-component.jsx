import React, { Component } from "react";
import PropTypes from "prop-types";
import { CardActions, Switch, TextField, Paper } from "@material-ui/core";
import FeatureTypeSelect from "../feature-type-select-container";
import ProjectSelect from "../project-select-container";
import StrategiesList from "../strategy/strategies-list-add-container";

import { FormButtons, styles as commonStyles } from "../../common";
import { trim } from "../../common/util";

import styles from "./add-feature-component.module.scss";
import {
    CF_CREATE_BTN_ID,
    CF_DESC_ID,
    CF_NAME_ID,
    CF_TYPE_ID
} from "../../../testIds";

class AddFeatureComponent extends Component {
    // static displayName = `AddFeatureComponent-${getDisplayName(Component)}`;
    componentDidMount() {
        window.onbeforeunload = () =>
            "Data will be lost if you leave the page, are you sure?";
    }

    componentWillUnmount() {
        window.onbeforeunload = false;
    }

    render() {
        const {
            input,
            errors,
            setValue,
            validateName,
            onSubmit,
            onCancel
        } = this.props;

        return (
            <Paper
                shadow={0}
                className={commonStyles.fullwidth}
                style={{ overflow: "visible" }}
            >
                <h1 className={styles.header}>Create new feature toggle</h1>
                <hr />
                <div className={styles.container}>
                    <form onSubmit={onSubmit}>
                        <div className={styles.formContainer}>
                            <TextField
                                size="small"
                                variant="outlined"
                                label="Name"
                                placeholder="Unique-name"
                                className={styles.nameInput}
                                name="name"
                                inputProps={{
                                    "data-test": CF_NAME_ID
                                }}
                                value={input.name}
                                error={errors.name !== undefined}
                                helperText={errors.name}
                                onBlur={v => validateName(v.target.value)}
                                onChange={v =>
                                    setValue("name", trim(v.target.value))
                                }
                            />

                            <FeatureTypeSelect
                                value={input.type}
                                onChange={v => setValue("type", v.target.value)}
                                label={"Toggle type"}
                                id="feature-type-select"
                                inputProps={{
                                    "data-test": CF_TYPE_ID
                                }}
                            />
                        </div>

                        <section className={styles.formContainer}>
                            <ProjectSelect
                                value={input.project}
                                onChange={v =>
                                    setValue("project", v.target.value)
                                }
                            />
                        </section>
                        <section className={styles.formContainer}>
                            <TextField
                                size="small"
                                variant="outlined"
                                className={commonStyles.fullwidth}
                                multiline
                                rows={4}
                                label="Description"
                                placeholder="A short description of the feature toggle"
                                error={errors.description}
                                helperText={errors.description}
                                value={input.description}
                                inputProps={{
                                    "data-test": CF_DESC_ID
                                }}
                                onChange={v =>
                                    setValue("description", v.target.value)
                                }
                            />
                        </section>
                        <section className={styles.toggleContainer}>
                            <Switch
                                checked={input.enabled}
                                onChange={() => {
                                    setValue("enabled", !input.enabled);
                                }}
                            />
                            <p className={styles.toggleText}>
                                {input.enabled ? "Enabled" : "Disabled"} feature
                                toggle
                            </p>
                        </section>
                        <section className={styles.strategiesContainer}>
                            <StrategiesList
                                configuredStrategies={input.strategies}
                                featureToggleName={input.name}
                                saveStrategies={s => setValue("strategies", s)}
                                editable
                            />
                        </section>
                        <CardActions>
                            <FormButtons
                                submitText={"Create"}
                                primaryButtonTestId={CF_CREATE_BTN_ID}
                                onCancel={onCancel}
                            />
                        </CardActions>
                    </form>
                </div>
            </Paper>
        );
    }
}

AddFeatureComponent.propTypes = {
    input: PropTypes.object,
    errors: PropTypes.object,
    setValue: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    validateName: PropTypes.func.isRequired,
    initCallRequired: PropTypes.bool,
    init: PropTypes.func
};

export default AddFeatureComponent;
