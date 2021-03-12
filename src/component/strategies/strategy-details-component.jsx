import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper } from '@material-ui/core';
import ShowStrategy from './show-strategy-component';
import EditStrategy from './form-container';
import { HeaderTitle } from '../common';
import { UPDATE_STRATEGY } from '../../permissions';
import ConditionallyRender from '../common/conditionally-render';
import TabNav from '../common/tabNav';

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
        history: PropTypes.object.isRequired,
        hasPermission: PropTypes.func.isRequired,
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

    render() {
        const strategy = this.props.strategy;
        const tabData = [
            {
                label: 'Details',
                component: (
                    <ShowStrategy
                        strategy={this.props.strategy}
                        toggles={this.props.toggles}
                        applications={this.props.applications}
                    />
                ),
            },
            {
                label: 'Edit',
                component: <EditStrategy strategy={this.props.strategy} history={this.props.history} editMode />,
            },
        ];
        return (
            <Paper>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <HeaderTitle title={strategy.name} subtitle={strategy.description} />
                        <ConditionallyRender
                            condition={strategy.editable && this.props.hasPermission(UPDATE_STRATEGY)}
                            show={
                                <div>
                                    <TabNav tabData={tabData} />
                                </div>
                            }
                            elseShow={
                                <section>
                                    <div className="content">
                                        {
                                            <ShowStrategy
                                                strategy={this.props.strategy}
                                                toggles={this.props.toggles}
                                                applications={this.props.applications}
                                            />
                                        }
                                    </div>
                                </section>
                            }
                        />
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
