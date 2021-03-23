import React, { useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Paper, Typography, Button, Switch, LinearProgress } from '@material-ui/core';

import HistoryComponent from '../../history/history-list-toggle-container';
import MetricComponent from '../view/metric-container';
import UpdateStrategies from '../view/update-strategies-container';
import EditVariants from '../variant/update-variant-container';
import FeatureTypeSelect from '../feature-type-select-container';
import ProjectSelect from '../project-select-container';
import UpdateDescriptionComponent from '../view/update-description-component';
import { styles as commonStyles } from '../../common';
import { CREATE_FEATURE, DELETE_FEATURE, UPDATE_FEATURE } from '../../../permissions';
import StatusComponent from '../status-component';
import FeatureTagComponent from '../feature-tag-component';
import StatusUpdateComponent from '../view/status-update-component';
import AddTagDialog from '../add-tag-dialog-container';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';
import TabNav from '../../common/tabNav';

import { scrollToTop } from '../../common/util';

import styles from './FeatureView.module.scss';

const ViewFeatureToggleComponent = ({
    activeTab,
    featureToggleName,
    features,
    toggleFeature,
    setStale,
    removeFeatureToggle,
    revive,
    fetchArchive,
    fetchFeatureToggles,
    fetchFeatureToggle,
    editFeatureToggle,
    featureToggle,
    history,
    hasPermission,
    fetchTags,
    untagFeature,
    featureTags,
    tagTypes,
}) => {
    const isFeatureView = !!fetchFeatureToggles;
    useEffect(() => {
        scrollToTop();
    }, []);

    useLayoutEffect(() => {
        if (features.length === 0) {
            if (isFeatureView) {
                fetchFeatureToggles();
            } else {
                fetchArchive();
            }
        }
    }, [features]);

    const getTabComponent = key => {
        switch (key) {
            case 'activation':
                if (isFeatureView && hasPermission(UPDATE_FEATURE)) {
                    return <UpdateStrategies featureToggle={featureToggle} features={features} history={history} />;
                }
                return (
                    <UpdateStrategies
                        featureToggle={featureToggle}
                        features={features}
                        history={history}
                        editable={false}
                    />
                );
            case 'metrics':
                return <MetricComponent featureToggle={featureToggle} />;
            case 'variants':
                return (
                    <EditVariants
                        featureToggle={featureToggle}
                        features={features}
                        history={history}
                        hasPermission={hasPermission}
                    />
                );
            case 'log':
                return <HistoryComponent toggleName={featureToggleName} />;
        }
    };
    const getTabData = () => [
        {
            label: 'Activation',
            component: getTabComponent('activation'),
        },
        {
            label: 'Metrics',
            component: getTabComponent('metrics'),
        },
        {
            label: 'Variants',
            component: getTabComponent('variants'),
        },
        {
            label: 'Log',
            component: getTabComponent('log'),
        },
    ];

    if (!featureToggle) {
        if (features.length === 0) {
            return <LinearProgress />;
        }
        return (
            <span>
                Could not find the toggle{' '}
                <ConditionallyRender
                    condition={hasPermission(CREATE_FEATURE)}
                    show={
                        <Link
                            to={{
                                pathname: '/features/create',
                                query: { name: featureToggleName },
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

    const removeToggle = () => {
        if (
            // eslint-disable-next-line no-alert
            window.confirm('Are you sure you want to remove this toggle?')
        ) {
            removeFeatureToggle(featureToggle.name);
            history.push('/features');
        }
    };
    const reviveToggle = () => {
        revive(featureToggle.name);
        history.push('/features');
    };
    const updateDescription = description => {
        let feature = { ...featureToggle, description };
        if (Array.isArray(feature.strategies)) {
            feature.strategies.forEach(s => {
                delete s.id;
            });
        }

        editFeatureToggle(feature);
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

        editFeatureToggle(feature);
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

        editFeatureToggle(feature);
    };

    const updateStale = stale => {
        setStale(stale, featureToggleName);
    };

    return (
        <Paper className={commonStyles.fullwidth} style={{ overflow: 'visible' }}>
            <div>
                <div className={styles.header}>
                    <Typography variant="h1" className={styles.heading}>
                        {featureToggle.name}
                    </Typography>
                    <StatusComponent stale={featureToggle.stale} />
                </div>
                <div className={styles.featureInfoContainer}>
                    <UpdateDescriptionComponent
                        isFeatureView={isFeatureView}
                        description={featureToggle.description}
                        update={updateDescription}
                        hasPermission={hasPermission}
                    />
                    <div className={styles.selectContainer}>
                        <FeatureTypeSelect value={featureToggle.type} onChange={updateType} label="Feature type" />
                        &nbsp;
                        <ProjectSelect value={featureToggle.project} onChange={updateProject} label="Project" filled />
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
                <span style={{ paddingRight: '24px' }}>
                    <ConditionallyRender
                        condition={hasPermission(UPDATE_FEATURE)}
                        show={
                            <>
                                <Switch
                                    disabled={!isFeatureView}
                                    checked={featureToggle.enabled}
                                    onChange={() => toggleFeature(!featureToggle.enabled, featureToggle.name)}
                                />
                                <span>{featureToggle.enabled ? 'Enabled' : 'Disabled'}</span>
                            </>
                        }
                        elseShow={
                            <>
                                <Switch disabled checked={featureToggle.enabled} />
                                <span>{featureToggle.enabled ? 'Enabled' : 'Disabled'}</span>
                            </>
                        }
                    />
                </span>

                <ConditionallyRender
                    condition={isFeatureView}
                    show={
                        <div>
                            <AddTagDialog featureToggleName={featureToggle.name} />
                            <StatusUpdateComponent stale={featureToggle.stale} updateStale={updateStale} />
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

            <TabNav tabData={getTabData()} className={styles.tabContentContainer} />
        </Paper>
    );
};

ViewFeatureToggleComponent.propTypes = {
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
    tagTypes: PropTypes.array,
};

export default ViewFeatureToggleComponent;
