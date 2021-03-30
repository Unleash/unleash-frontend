import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Button, List, Tooltip, IconButton, Icon } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import FeatureToggleListItem from './FeatureToggleListItem';
import SearchField from '../../common/SearchField/SearchField';
import FeatureToggleListActions from './FeatureToggleListActions';
import ConditionallyRender from '../../common/ConditionallyRender/ConditionallyRender';
import PageContent from '../../common/PageContent/PageContent';
import HeaderTitle from '../../common/HeaderTitle';

import loadingFeatures from './loadingFeatures';

import { CREATE_FEATURE } from '../../../permissions';

import { useStyles } from './styles';

const FeatureToggleList = ({
    fetcher,
    features,
    hasPermission,
    settings,
    revive,
    updateSetting,
    featureMetrics,
    toggleFeature,
    loading,
}) => {
    const styles = useStyles();
    const smallScreen = useMediaQuery('(max-width:700px)');

    useEffect(() => {
        fetcher();
    }, [fetcher]);

    const toggleMetrics = () => {
        updateSetting('showLastHour', !settings.showLastHour);
    };

    const setSort = v => {
        updateSetting('sort', typeof v === 'string' ? v.trim() : '');
    };

    const renderFeatures = () => {
        features.forEach(e => {
            e.reviveName = e.name;
        });

        if (loading) {
            return loadingFeatures.map(feature => (
                <FeatureToggleListItem
                    key={feature.name}
                    settings={settings}
                    metricsLastHour={featureMetrics.lastHour[feature.name]}
                    metricsLastMinute={featureMetrics.lastMinute[feature.name]}
                    feature={feature}
                    toggleFeature={toggleFeature}
                    revive={revive}
                    hasPermission={hasPermission}
                    className={'skeleton'}
                />
            ));
        }

        return features.map(feature => (
            <FeatureToggleListItem
                key={feature.name}
                settings={settings}
                metricsLastHour={featureMetrics.lastHour[feature.name]}
                metricsLastMinute={featureMetrics.lastMinute[feature.name]}
                feature={feature}
                toggleFeature={toggleFeature}
                revive={revive}
                hasPermission={hasPermission}
            />
        ));
    };

    return (
        <div className={styles.featureContainer}>
            <div className={styles.searchBarContainer}>
                <SearchField
                    value={settings.filter}
                    updateValue={updateSetting.bind(this, 'filter')}
                    className={classnames(styles.searchBar, {
                        skeleton: loading,
                    })}
                />
            </div>

            <PageContent
                headerContent={
                    <HeaderTitle
                        loading={loading}
                        title="Feature toggles"
                        actions={
                            <div className={styles.actionsContainer}>
                                <ConditionallyRender
                                    condition={!smallScreen}
                                    show={
                                        <FeatureToggleListActions
                                            settings={settings}
                                            toggleMetrics={toggleMetrics}
                                            setSort={setSort}
                                            updateSetting={updateSetting}
                                            loading={loading}
                                        />
                                    }
                                />

                                <ConditionallyRender
                                    condition={hasPermission(CREATE_FEATURE)}
                                    show={
                                        <ConditionallyRender
                                            condition={smallScreen}
                                            show={
                                                <Tooltip title="Create feature toggle">
                                                    <IconButton
                                                        component={Link}
                                                        to="/features/create"
                                                        data-test="add-feature-btn"
                                                    >
                                                        <Icon>add</Icon>
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            elseShow={
                                                <Button
                                                    to="/features/create"
                                                    data-test="add-feature-btn"
                                                    size="large"
                                                    color="secondary"
                                                    variant="contained"
                                                    component={Link}
                                                    className={classnames({
                                                        skeleton: loading,
                                                    })}
                                                >
                                                    Create feature toggle
                                                </Button>
                                            }
                                        />
                                    }
                                />
                            </div>
                        }
                    />
                }
            >
                <List>{renderFeatures()}</List>
            </PageContent>
        </div>
    );
};

FeatureToggleList.propTypes = {
    features: PropTypes.array.isRequired,
    featureMetrics: PropTypes.object.isRequired,
    fetcher: PropTypes.func,
    revive: PropTypes.func,
    updateSetting: PropTypes.func.isRequired,
    toggleFeature: PropTypes.func,
    settings: PropTypes.object,
    history: PropTypes.object.isRequired,
    hasPermission: PropTypes.func.isRequired,
};

export default FeatureToggleList;
