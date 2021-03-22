import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { debounce } from "debounce";

import { Link } from "react-router-dom";
import { Button, List } from "@material-ui/core";
import Feature from "./FeatureToggleListItem/FeatureToggleListItem";
import SearchField from "../../common/search-field";
import ListComponentHeader from "./list-component-header";
import ConditionallyRender from "../../common/conditionally-render";
import PageContent from "../../common/PageContent/PageContent";
import HeaderTitle from "../../common/HeaderTitle";

import { CREATE_FEATURE } from "../../../permissions";

import { useStyles } from "./styles";

const FeatureToggleList = ({
    fetchFeatureToggles,
    fetchArchive,
    features,
    hasPermission,
    settings,
    revive,
    updateSetting,
    featureMetrics,
    toggleFeature
}) => {
    const styles = useStyles();

    let updateFilter;
    useEffect(() => {
        if (fetchFeatureToggles) {
            fetchFeatureToggles();
        } else {
            fetchArchive();
        }

        updateFilter = debounce(updateSetting, 150);
    }, [updateSetting, fetchFeatureToggles]);

    const toggleMetrics = () => {
        updateSetting("showLastHour", !settings.showLastHour);
    };

    const setFilter = v => {
        const value = typeof v === "string" ? v : "";
        updateFilter(value);
    };

    const setSort = v => {
        updateSetting("sort", typeof v === "string" ? v.trim() : "");
    };

    const renderFeatures = () => {
        features.forEach(e => {
            e.reviveName = e.name;
        });

        return features.map(feature => (
            <Feature
                key={feature.name}
                settings={settings}
                metricsLastHour={featureMetrics.lastHour[feature.name]}
                metricsLastMinute={featureMetrics.lastMinute[feature.name]}
                feature={feature}
                toggleFeature={toggleFeature}
                revive={revive}
                hasPermission={hasPermission}
                setFilter={setFilter}
            />
        ));
    };

    return (
        <div className={styles.featureContainer}>
            <div className={styles.searchBarContainer}>
                <SearchField
                    value={settings.filter}
                    updateValue={updateSetting}
                    className={styles.searchBar}
                />
            </div>

            <PageContent
                headerContent={
                    <HeaderTitle
                        title="Feature toggles"
                        actions={
                            <div className={styles.actionsContainer}>
                                <ListComponentHeader
                                    settings={settings}
                                    toggleMetrics={toggleMetrics}
                                    setSort={setSort}
                                    updateSetting={updateSetting}
                                />
                                <ConditionallyRender
                                    condition={hasPermission(CREATE_FEATURE)}
                                    show={
                                        <Button
                                            to="/features/create"
                                            data-test="add-feature-btn"
                                            size="large"
                                            color="secondary"
                                            variant="contained"
                                            component={Link}
                                        >
                                            Add new feature
                                        </Button>
                                    }
                                />
                            </div>
                        }
                    />
                }
            >
                <List>
                    <ConditionallyRender
                        condition={features.length > 0}
                        show={renderFeatures}
                        elseShow={
                            <p className={styles.listParagraph}>
                                Empty list of feature toggles
                            </p>
                        }
                    />
                </List>
            </PageContent>
        </div>
    );
};

FeatureToggleList.propTypes = {
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

export default FeatureToggleList;
