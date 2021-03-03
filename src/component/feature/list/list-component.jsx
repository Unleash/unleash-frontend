import React from "react";
import PropTypes from "prop-types";
import { debounce } from "debounce";
import classnames from "classnames";

import { Link } from "react-router-dom";
import { CardActions, List } from "react-mdl";

import { Button, Paper, Menu, MenuItem } from "@material-ui/core";
import Feature from "./list-item-component";
import SearchField from "../../common/search-field";
import ProjectMenu from "./project-container";
import ListComponentHeader from "./list-component-header";
import ConditionallyRender from "../../common/conditionally-render";

import { CREATE_FEATURE } from "../../../permissions";

import {
    MenuItemWithIcon,
    DropdownButton,
    styles as commonStyles
} from "../../common";

import styles from "./list.module.scss";
export default class FeatureListComponent extends React.Component {
    static propTypes = {
        features: PropTypes.array.isRequired,
        featureMetrics: PropTypes.object.isRequired,
        fetchFeatureToggles: PropTypes.func,
        fetchArchive: PropTypes.func,
        revive: PropTypes.func,
        updateSetting: PropTypes.func.isRequired,
        toggleFeature: PropTypes.func,
        settings: PropTypes.object,
        history: PropTypes.object.isRequired,
        hasPermission: PropTypes.func.isRequired
    };

    constructor(props) {
        super();
        this.state = {
            filter: props.settings.filter,
            updateFilter: debounce(
                props.updateSetting.bind(this, "filter"),
                150
            )
        };
    }

    componentDidMount() {
        if (this.props.fetchFeatureToggles) {
            this.props.fetchFeatureToggles();
        } else {
            this.props.fetchArchive();
        }
    }

    toggleMetrics = () => {
        this.props.updateSetting(
            "showLastHour",
            !this.props.settings.showLastHour
        );
    };

    setFilter = v => {
        const value = typeof v === "string" ? v : "";
        this.setState({ filter: value });
        this.state.updateFilter(value);
    };

    setSort = v => {
        this.props.updateSetting("sort", typeof v === "string" ? v.trim() : "");
    };

    render() {
        const {
            features,
            toggleFeature,
            featureMetrics,
            settings,
            revive,
            hasPermission
        } = this.props;
        features.forEach(e => {
            e.reviveName = e.name;
        });
        return (
            <div className={styles.featureContainer}>
                <div className={styles.searchBarContainer}>
                    <SearchField
                        value={this.props.settings.filter}
                        updateValue={this.props.updateSetting.bind(
                            this,
                            "filter"
                        )}
                        className={styles.searchBar}
                    />
                    <ConditionallyRender
                        condition={hasPermission(CREATE_FEATURE)}
                        show={
                            <Button
                                to="/features/create"
                                size="large"
                                color="primary"
                                variant="contained"
                                component={Link}
                            >
                                Add new feature
                            </Button>
                        }
                    />
                </div>

                <Paper
                    shadow={0}
                    className={classnames(
                        commonStyles.fullwidth,
                        styles.listContainer
                    )}
                >
                    <div>
                        <ListComponentHeader
                            settings={this.props.settings}
                            toggleMetrics={this.toggleMetrics}
                            setSort={this.setSort}
                            updateSetting={this.props.updateSetting}
                        />
                    </div>

                    <hr />
                    <List>
                        {features.length > 0 ? (
                            features.map((feature, i) => (
                                <Feature
                                    key={i}
                                    settings={settings}
                                    metricsLastHour={
                                        featureMetrics.lastHour[feature.name]
                                    }
                                    metricsLastMinute={
                                        featureMetrics.lastMinute[feature.name]
                                    }
                                    feature={feature}
                                    toggleFeature={toggleFeature}
                                    revive={revive}
                                    hasPermission={hasPermission}
                                    setFilter={this.setFilter}
                                />
                            ))
                        ) : (
                            <p
                                style={{
                                    textAlign: "center",
                                    marginTop: "50px",
                                    color: "gray"
                                }}
                            >
                                Empty list of feature toggles
                            </p>
                        )}
                    </List>
                </Paper>
            </div>
        );
    }
}
