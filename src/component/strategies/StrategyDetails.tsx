import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import ShowStrategy from './show-strategy-component';
import EditStrategy from './CreateStrategy';
import { UPDATE_STRATEGY } from '../providers/AccessProvider/permissions';
import ConditionallyRender from '../common/ConditionallyRender/ConditionallyRender';
import TabNav from '../common/TabNav/TabNav';
import PageContent from '../common/PageContent/PageContent';
import AccessContext from '../../contexts/AccessContext';
import useStrategies from '../../hooks/api/getters/useStrategies/useStrategies';
import { useParams } from 'react-router-dom';

const StrategyDetails = props => {
    const { hasAccess } = useContext(AccessContext);
    const { strategies, refetchStrategies } = useStrategies();
    const { strategyName } = useParams<{ strategyName: string }>();
    const strategy = strategies.find(n => n.name === strategyName);
    
    useEffect(() => {
        if (!strategy) {
            refetchStrategies();
        }
        if (!props.applications || props.applications.length === 0) {
            props.fetchApplications();
        }
        if (!props.toggles || props.toggles.length === 0) {
            props.fetchFeatureToggles();
        }
        //eslint-disable-next-line
    }, []);

    const tabData = [
        {
            label: 'Details',
            component: (
                <ShowStrategy
                    strategy={strategy}
                    toggles={props.toggles}
                    applications={props.applications}
                />
            ),
        },
        {
            label: 'Edit',
            component: (
                <EditStrategy
                    strategy={strategy}
                    history={props.history}
                    editMode
                />
            ),
        },
    ];

    if (!strategy) return null;
    return (
        <PageContent headerContent={strategy.name}>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Typography variant="subtitle1">
                        {strategy.description}
                    </Typography>
                    <ConditionallyRender
                        condition={
                            strategy.editable && hasAccess(UPDATE_STRATEGY)
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
                                        strategy={strategy}
                                        toggles={props.toggles}
                                        applications={props.applications}
                                    />
                                </div>
                            </section>
                        }
                    />
                </Grid>
            </Grid>
        </PageContent>
    );
};

StrategyDetails.propTypes = {
    toggles: PropTypes.array,
    applications: PropTypes.array,
    activeTab: PropTypes.string.isRequired,
    fetchStrategies: PropTypes.func.isRequired,
    fetchApplications: PropTypes.func.isRequired,
    fetchFeatureToggles: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default StrategyDetails;
