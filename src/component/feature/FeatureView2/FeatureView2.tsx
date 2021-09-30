import { Tabs, Tab } from '@material-ui/core';
import { useEffect } from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';
import useFeature from '../../../hooks/api/getters/useFeature/useFeature';
import useTabs from '../../../hooks/useTabs';
import { IFeatureViewParams } from '../../../interfaces/params';
import TabPanel from '../../common/TabNav/TabPanel';
import FeatureOverview from './FeatureOverview/FeatureOverview';
import FeatureStrategies from './FeatureStrategies/FeatureStrategies';
import { useStyles } from './FeatureView2.styles';

const FeatureView2 = () => {
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { feature } = useFeature(projectId, featureId);
    const { a11yProps } = useTabs(0);
    const styles = useStyles();
    const history = useHistory();

    const basePath = `/projects/${projectId}/features2/${featureId}`;

    const tabData = [
        {
            title: 'Overview',
            component: <FeatureOverview />,
            path: `${basePath}/overview`,
            name: 'overview',
        },
        {
            title: 'Strategies',
            component: <FeatureStrategies />,
            path: `${basePath}/strategies`,
            name: 'strategies',
        },
    ];

    const renderTabs = () => {
        return tabData.map((tab, index) => {
            return (
                <Tab
                    key={tab.title}
                    label={tab.title}
                    value={tab.path}
                    {...a11yProps(index)}
                    onClick={() => {
                        history.push(tab.path);
                    }}
                    className={styles.tabButton}
                />
            );
        });
    };
    console.log(history.location.pathname);
    return (
        <>
            <div className={styles.header}>
                <div className={styles.innerContainer}>
                    <h2 className={styles.featureViewHeader}>{feature.name}</h2>
                </div>
                <div className={styles.separator} />
                <div className={styles.tabContainer}>
                    <Tabs
                        value={history.location.pathname}
                        indicatorColor="primary"
                        textColor="primary"
                        className={styles.tabNavigation}
                    >
                        {renderTabs()}
                    </Tabs>
                </div>
            </div>
            <Route
                path={`/projects/:projectId/features2/:featureId/overview`}
                component={FeatureOverview}
            />
            <Route
                path={`/projects/:projectId/features2/:featureId/strategies`}
                component={FeatureStrategies}
            />
        </>
    );
};

export default FeatureView2;
