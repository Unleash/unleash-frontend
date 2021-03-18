import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import ShowStrategy from "./show-strategy-component";
import EditStrategy from "./form-container";
import { UPDATE_STRATEGY } from "../../permissions";
import ConditionallyRender from "../common/conditionally-render";
import TabNav from "../common/tabNav";
import PageContent from "../common/PageContent/PageContent";

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
        hasPermission: PropTypes.func.isRequired
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
                label: "Details",
                component: (
                    <ShowStrategy
                        strategy={this.props.strategy}
                        toggles={this.props.toggles}
                        applications={this.props.applications}
                    />
                )
            },
            {
                label: "Edit",
                component: (
                    <EditStrategy
                        strategy={this.props.strategy}
                        history={this.props.history}
                        editMode
                    />
                )
            }
        ];
        return (
            <PageContent headerContent={strategy.name}>
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="subtitle1">
                            {strategy.description}
                        </Typography>
                        <ConditionallyRender
                            condition={
                                strategy.editable &&
                                this.props.hasPermission(UPDATE_STRATEGY)
                            }
                            show={
                                <div>
                                    <TabNav tabData={tabData} />
                                </div>
                            }
                            elseShow={
                                <section>
                                    <div className="content">
                                        <ShowStrategy
                                            strategy={this.props.strategy}
                                            toggles={this.props.toggles}
                                            applications={
                                                this.props.applications
                                            }
                                        />
                                    </div>
                                </section>
                            }
                        />
                    </Grid>
                </Grid>
            </PageContent>
        );
    }
}
