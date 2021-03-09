import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';
import classnames from 'classnames';

import { Link } from 'react-router-dom';
import { Button, Paper, List } from '@material-ui/core';
import Feature from './list-item-component';
import SearchField from '../../common/search-field';
import ListComponentHeader from './list-component-header';
import ConditionallyRender from '../../common/conditionally-render';

import { CREATE_FEATURE } from '../../../permissions';

import { styles as commonStyles } from '../../common';

import styles from './list.module.scss';
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
        hasPermission: PropTypes.func.isRequired,
    };

    constructor(props) {
        super();
        this.state = {
            filter: props.settings.filter,
            updateFilter: debounce(props.updateSetting.bind(this, 'filter'), 150),
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
        this.props.updateSetting('showLastHour', !this.props.settings.showLastHour);
    };

    setFilter = v => {
        const value = typeof v === 'string' ? v : '';
        this.setState({ filter: value });
        this.state.updateFilter(value);
    };

    setSort = v => {
        this.props.updateSetting('sort', typeof v === 'string' ? v.trim() : '');
    };

    renderFeatures = () => {
        const { features, toggleFeature, featureMetrics, settings, revive, hasPermission } = this.props;

        features.forEach(e => {
            e.reviveName = e.name;
        });

        return features.map((feature, i) => (
            <Feature
                key={feature.name}
                settings={settings}
                metricsLastHour={featureMetrics.lastHour[feature.name]}
                metricsLastMinute={featureMetrics.lastMinute[feature.name]}
                feature={feature}
                toggleFeature={toggleFeature}
                revive={revive}
                hasPermission={hasPermission}
                setFilter={this.setFilter}
            />
        ));
    };

    render() {
        const { features, hasPermission } = this.props;

        return (
            <div className={styles.featureContainer}>
                <div className={styles.searchBarContainer}>
                    <SearchField
                        value={this.props.settings.filter}
                        updateValue={this.props.updateSetting.bind(this, 'filter')}
                        className={styles.searchBar}
                    />
                    <ConditionallyRender
                        condition={hasPermission(CREATE_FEATURE)}
                        show={
                            <Button
                                to="/features/create"
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

                <Paper shadow={0}>
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
                        <ConditionallyRender
                            condition={features.length > 0}
                            show={this.renderFeatures}
                            elseShow={<p className={styles.listParagraph}>Empty list of feature toggles</p>}
                        />
                    </List>
                </Paper>
            </div>
        );
    }
}
