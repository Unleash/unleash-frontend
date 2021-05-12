import { useContext, useEffect } from 'react';
import { Typography, Button, List } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AccessContext from '../../../contexts/AccessContext';
import HeaderTitle from '../../common/HeaderTitle';
import PageContent from '../../common/PageContent';

import FeatureToggleListItem from '../../feature/FeatureToggleList/FeatureToggleListItem';

const ViewProjectComponent = ({
    project,
    features,
    settings,
    toggleFeature,
    featureMetrics,
    revive,
    fetchFeatureToggles,
}) => {
    const { hasAccess } = useContext(AccessContext);

    useEffect(() => {
        fetchFeatureToggles();
        /* eslint-disable-next-line */
    }, []);

    const renderProjectFeatures = () => {
        return features.map(feature => {
            return (
                <FeatureToggleListItem
                    key={feature.name}
                    settings={settings}
                    metricsLastHour={featureMetrics.lastHour[feature.name]}
                    metricsLastMinute={featureMetrics.lastMinute[feature.name]}
                    feature={feature}
                    toggleFeature={toggleFeature}
                    revive={revive}
                    hasAccess={hasAccess}
                />
            );
        });
    };

    return (
        <div>
            <PageContent
                headerContent={
                    <HeaderTitle
                        title={`${project.name}`}
                        actions={
                            <>
                                <Button
                                    component={Link}
                                    to={`/projects/edit/${project.id}`}
                                >
                                    Edit
                                </Button>
                                <Button
                                    component={Link}
                                    to={`/projects/${project.id}/access`}
                                >
                                    Manage access
                                </Button>
                            </>
                        }
                    />
                }
            >
                <Typography variant="subtitle2">
                    {project.description}
                </Typography>

                <List>{renderProjectFeatures()}</List>
            </PageContent>
        </div>
    );
};

export default ViewProjectComponent;
