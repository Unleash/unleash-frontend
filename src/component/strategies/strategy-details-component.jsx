import React, { PropTypes, Component } from 'react';
import { hashHistory } from 'react-router';
import { Tabs, Tab, ProgressBar, Grid, Cell } from 'react-mdl';
import ShowStrategy from './show-strategy-component';
import EditStrategy from './edit-container';
import { HeaderTitle } from '../common';

const TABS = {
    view: 0,
    edit: 1,
};

export default class StrategyDetails extends Component {
    static propTypes = {
        strategyName: PropTypes.string.isRequired,
        toggles: PropTypes.array,
        applications: PropTypes.array,
        activeTab: PropTypes.string.isRequired,
        strategy: PropTypes.object.isRequired,
        fetchStrategies: PropTypes.func.isRequired,
        fetchApplications: PropTypes.func.isRequired,
        fetchFeatureToggles: PropTypes.func.isRequired,
    };

    componentDidMount() {
        if (!this.props.strategy) {
            this.props.fetchStrategies();
        }
        if (!this.props.applications || this.props.applications.length === 0) {
            this.props.fetchApplications();
        }
        if (!this.props.toggles || this.props.toggles.length === 0) {
            this.props.fetchFeatureToggles();
        }
    }

    getTabContent(activeTabId) {
        if (activeTabId === TABS.edit) {
            return <EditStrategy strategy={this.props.strategy} />;
        } else {
            return (
                <ShowStrategy
                    strategy={this.props.strategy}
                    toggles={this.props.toggles}
                    applications={this.props.applications}
                />
            );
        }
    }

    goToTab(tabName) {
        hashHistory.push(`/strategies/${tabName}/${this.props.strategyName}`);
    }

    render() {
        const activeTabId = TABS[this.props.activeTab]
            ? TABS[this.props.activeTab]
            : TABS.view;
        const strategy = this.props.strategy;
        if (!strategy) {
            return <ProgressBar indeterminate />;
        }

        const tabContent = this.getTabContent(activeTabId);

        return (
            <Grid className="mdl-color--white">
                <Cell col={12}>
                    <HeaderTitle
                        title={strategy.name}
                        subtitle={strategy.description}
                    />
                    {strategy.editable === false
                        ? ''
                        : <Tabs activeTab={activeTabId} ripple>
                              <Tab onClick={() => this.goToTab('view')}>
                                  Details
                              </Tab>
                              <Tab onClick={() => this.goToTab('edit')}>
                                  Edit
                              </Tab>
                          </Tabs>}

                    <section>
                        <div className="content">
                            {tabContent}
                        </div>
                    </section>
                </Cell>
            </Grid>
        );
    }
}
