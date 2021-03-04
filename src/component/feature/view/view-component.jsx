import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    Paper,
    Typography,
    Button,
    Switch,
    Tab,
    Tabs,
    LinearProgress
} from "@material-ui/core";

import HistoryComponent from "../../history/history-list-toggle-container";
import MetricComponent from "./metric-container";
import UpdateStrategies from "./update-strategies-container";
import EditVariants from "../variant/update-variant-container";
import FeatureTypeSelect from "../feature-type-select-container";
import ProjectSelect from "../project-select-container";
import UpdateDescriptionComponent from "./update-description-component";
import { styles as commonStyles } from "../../common";
import {
    CREATE_FEATURE,
    DELETE_FEATURE,
    UPDATE_FEATURE
} from "../../../permissions";
import StatusComponent from "../status-component";
import FeatureTagComponent from "../feature-tag-component";
import StatusUpdateComponent from "./status-update-component";
import AddTagDialog from "../add-tag-dialog-container";
import ConditionallyRender from "../../common/conditionally-render";

import { scrollToTop } from "../../common/util";

import styles from "./view-component.module.scss";

const TABS = {
    strategies: 0,
    view: 1,
    variants: 2,
    history: 3
};

export default class ViewFeatureToggleComponent extends React.Component {
    isFeatureView;
    constructor(props) {
        super(props);
        this.isFeatureView = !!props.fetchFeatureToggles;
    }

    componentDidMount() {
        scrollToTop();
    }

    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        featureToggleName: PropTypes.string.isRequired,
        features: PropTypes.array.isRequired,
        toggleFeature: PropTypes.func,
        setStale: PropTypes.func,
        removeFeatureToggle: PropTypes.func,
        revive: PropTypes.func,
        fetchArchive: PropTypes.func,
        fetchFeatureToggles: PropTypes.func,
        fetchFeatureToggle: PropTypes.func,
        editFeatureToggle: PropTypes.func,
        featureToggle: PropTypes.object,
        history: PropTypes.object.isRequired,
        hasPermission: PropTypes.func.isRequired,
        fetchTags: PropTypes.func,
        untagFeature: PropTypes.func,
        featureTags: PropTypes.array,
        tagTypes: PropTypes.array
    };

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        if (this.props.features.length === 0) {
            if (this.isFeatureView) {
                this.props.fetchFeatureToggles();
            } else {
                this.props.fetchArchive();
            }
        }
        this.props.fetchTags(this.props.featureToggleName);
    }

    getTabContent(activeTab) {
        const {
            features,
            featureToggle,
            featureToggleName,
            hasPermission
        } = this.props;

        if (TABS[activeTab] === TABS.history) {
            return <HistoryComponent toggleName={featureToggleName} />;
        } else if (TABS[activeTab] === TABS.strategies) {
            if (this.isFeatureView && hasPermission(UPDATE_FEATURE)) {
                return (
                    <UpdateStrategies
                        featureToggle={featureToggle}
                        features={features}
                        history={this.props.history}
                    />
                );
            }
            return (
                <UpdateStrategies
                    featureToggle={featureToggle}
                    features={features}
                    history={this.props.history}
                    editable={false}
                />
            );
        } else if (TABS[activeTab] === TABS.variants) {
            return (
                <EditVariants
                    featureToggle={featureToggle}
                    features={features}
                    history={this.props.history}
                    hasPermission={this.props.hasPermission}
                />
            );
        } else {
            return <MetricComponent featureToggle={featureToggle} />;
        }
    }

    goToTab(tabName, featureToggleName) {
        let view = this.props.fetchFeatureToggles ? "features" : "archive";
        if (view === "features" && tabName === "strategies") {
            const { featureToggleName, fetchFeatureToggle } = this.props;
            fetchFeatureToggle(featureToggleName);
        }
        this.props.history.push(`/${view}/${tabName}/${featureToggleName}`);
    }

    render() {
        const {
            featureToggle,
            features,
            activeTab,
            revive,
            featureToggleName,
            toggleFeature,
            removeFeatureToggle,
            hasPermission,
            featureTags,
            tagTypes,
            untagFeature
        } = this.props;

        if (!featureToggle) {
            if (features.length === 0) {
                return <LinearProgress />;
            }
            return (
                <span>
                    Could not find the toggle{" "}
                    <ConditionallyRender
                        condition={hasPermission(CREATE_FEATURE)}
                        show={
                            <Link
                                to={{
                                    pathname: "/features/create",
                                    query: { name: featureToggleName }
                                }}
                            >
                                {featureToggleName}
                            </Link>
                        }
                        elseShow={<span>featureToggleName</span>}
                    />
                </span>
            );
        }

        const activeTabId = TABS[this.props.activeTab]
            ? TABS[this.props.activeTab]
            : TABS.strategies;
        const tabContent = this.getTabContent(activeTab);

        const removeToggle = () => {
            if (
                // eslint-disable-next-line no-alert
                window.confirm("Are you sure you want to remove this toggle?")
            ) {
                removeFeatureToggle(featureToggle.name);
                this.props.history.push("/features");
            }
        };
        const reviveToggle = () => {
            revive(featureToggle.name);
            this.props.history.push("/features");
        };
        const updateDescription = description => {
            let feature = { ...featureToggle, description };
            if (Array.isArray(feature.strategies)) {
                feature.strategies.forEach(s => {
                    delete s.id;
                });
            }

            this.props.editFeatureToggle(feature);
        };
        const updateType = evt => {
            evt.preventDefault();
            const type = evt.target.value;
            let feature = { ...featureToggle, type };
            if (Array.isArray(feature.strategies)) {
                feature.strategies.forEach(s => {
                    delete s.id;
                });
            }

            this.props.editFeatureToggle(feature);
        };

        const updateProject = evt => {
            evt.preventDefault();
            const project = evt.target.value;
            let feature = { ...featureToggle, project };
            if (Array.isArray(feature.strategies)) {
                feature.strategies.forEach(s => {
                    delete s.id;
                });
            }

            this.props.editFeatureToggle(feature);
        };

        const updateStale = stale => {
            this.props.setStale(stale, featureToggleName);
        };

        /**REFACTOR THIS */
        const a11yProps = index => ({
            id: `tab-${index}`,
            "aria-controls": `tabpanel-${index}`
        });

        return (
            <Paper
                shadow={0}
                className={commonStyles.fullwidth}
                style={{ overflow: "visible" }}
            >
                <div>
                    <div className={styles.header}>
                        <Typography variant="h1" className={styles.heading}>
                            {featureToggle.name}
                        </Typography>
                        <StatusComponent stale={featureToggle.stale} />
                    </div>
                    <div className={styles.featureInfoContainer}>
                        <UpdateDescriptionComponent
                            isFeatureView={this.isFeatureView}
                            description={featureToggle.description}
                            update={updateDescription}
                            hasPermission={hasPermission}
                        />
                        <div className={styles.selectContainer}>
                            <FeatureTypeSelect
                                value={featureToggle.type}
                                onChange={updateType}
                                label="Feature type"
                            />
                            &nbsp;
                            <ProjectSelect
                                value={featureToggle.project}
                                onChange={updateProject}
                                label="Project"
                                filled
                            />
                        </div>
                        <FeatureTagComponent
                            featureToggleName={featureToggle.name}
                            tags={featureTags}
                            tagTypes={tagTypes}
                            untagFeature={untagFeature}
                        />
                    </div>
                </div>

                <div className={styles.actions}>
                    <span style={{ paddingRight: "24px" }}>
                        <ConditionallyRender
                            condition={hasPermission(UPDATE_FEATURE)}
                            show={
                                <>
                                    <Switch
                                        disabled={!this.isFeatureView}
                                        checked={featureToggle.enabled}
                                        onChange={() =>
                                            toggleFeature(
                                                !featureToggle.enabled,
                                                featureToggle.name
                                            )
                                        }
                                    />
                                    <span>
                                        {featureToggle.enabled
                                            ? "Enabled"
                                            : "Disabled"}
                                    </span>
                                </>
                            }
                            elseShow={
                                <>
                                    <Switch
                                        disabled
                                        checked={featureToggle.enabled}
                                    />
                                    <span>
                                        {featureToggle.enabled
                                            ? "Enabled"
                                            : "Disabled"}
                                    </span>
                                </>
                            }
                        />
                    </span>

                    <ConditionallyRender
                        condition={this.isFeatureView}
                        show={
                            <div>
                                <AddTagDialog
                                    featureToggleName={featureToggle.name}
                                />
                                <StatusUpdateComponent
                                    stale={featureToggle.stale}
                                    updateStale={updateStale}
                                />
                                <Button
                                    title="Create new feature toggle by cloning configuration"
                                    component={Link}
                                    to={`/features/copy/${featureToggle.name}`}
                                >
                                    Clone
                                </Button>

                                <Button
                                    disabled={!hasPermission(DELETE_FEATURE)}
                                    onClick={removeToggle}
                                    title="Archive feature toggle"
                                    style={{ flexShrink: 0 }}
                                >
                                    Archive
                                </Button>
                            </div>
                        }
                        elseShow={
                            <Button
                                disabled={!hasPermission(UPDATE_FEATURE)}
                                onClick={reviveToggle}
                                style={{ flexShrink: 0 }}
                            >
                                Revive
                            </Button>
                        }
                    />
                </div>

                <hr />
                <Paper style={{ background: "#efefef" }}>
                    <Tabs
                        value={this.props.activeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab
                            onClick={() =>
                                this.goToTab("strategies", featureToggleName)
                            }
                            label="Activation"
                            {...a11yProps(0)}
                        />
                        <Tab
                            onClick={() =>
                                this.goToTab("view", featureToggleName)
                            }
                            label="Metrics"
                            {...a11yProps(1)}
                        />
                        <Tab
                            onClick={() =>
                                this.goToTab("variants", featureToggleName)
                            }
                            label="Variants"
                            {...a11yProps(2)}
                        />
                        <Tab
                            onClick={() =>
                                this.goToTab("history", featureToggleName)
                            }
                            label="Log"
                            {...a11yProps(3)}
                        />
                    </Tabs>
                </Paper>

                <div className={styles.tabContentContainer}>{tabContent}</div>
            </Paper>
        );
    }
}
