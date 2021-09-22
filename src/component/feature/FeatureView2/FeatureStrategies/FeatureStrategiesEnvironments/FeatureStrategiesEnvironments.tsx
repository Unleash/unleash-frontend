import { useParams } from 'react-router-dom';
import useFeature from '../../../../../hooks/api/getters/useFeature/useFeature';
import { useStyles } from './FeatureStrategiesEnvironments.styles';
import { Tabs, Tab, Button } from '@material-ui/core';
import TabPanel from '../../../../common/TabNav/TabPanel';
import useTabs from '../../../../../hooks/useTabs';
import FeatureStrategiesEnvironmentList from './FeatureStrategiesEnvironmentList/FeatureStrategiesEnvironmentList';
import { useContext, useEffect } from 'react';
import FeatureStrategiesUIContext from '../../../../../contexts/FeatureStrategiesUIContext';
import ConditionallyRender from '../../../../common/ConditionallyRender';
import FeatureStrategiesConfigure from './FeatureStrategiesConfigure/FeatureStrategiesConfigure';
import classNames from 'classnames';
import useToast from '../../../../../hooks/useToast';
import { IFeatureViewParams } from '../../../../../interfaces/params';

const FeatureStrategiesEnvironments = () => {
    const startingTabId = 1;
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { toast, setToastData } = useToast();

    const styles = useStyles();
    const { a11yProps, activeTab, setActiveTab } = useTabs(startingTabId);
    const {
        setActiveEnvironment,
        configureNewStrategy,
        expandedSidebar,
        setExpandedSidebar,
    } = useContext(FeatureStrategiesUIContext);
    const { feature } = useFeature(projectId, featureId, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
    });

    useEffect(() => {
        setActiveEnvironment(feature?.environments[activeTab]);
        /* eslint-disable-next-line */
    }, [feature]);

    const renderTabs = () => {
        return feature?.environments?.map((env, index) => {
            return (
                <Tab
                    disabled={configureNewStrategy}
                    key={`${env.name}_${index}`}
                    label={env.name}
                    {...a11yProps(index)}
                    onClick={() => setActiveTab(index)}
                    className={styles.tabButton}
                />
            );
        });
    };

    const renderTabPanels = () => {
        return feature.environments?.map((env, index) => {
            return (
                <TabPanel
                    key={`tab_panel_${index}`}
                    value={activeTab}
                    index={index}
                >
                    <FeatureStrategiesEnvironmentList
                        strategies={env.strategies}
                    />
                </TabPanel>
            );
        });
    };

    const classes = classNames(styles.container, {
        [styles.fullWidth]: !expandedSidebar,
    });

    return (
        <div className={classes}>
            <div className={styles.environmentsHeader}>
                <h2 className={styles.header}>Environments</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setExpandedSidebar(prev => !prev)}
                >
                    {expandedSidebar ? 'Hide sidebar' : 'Add new strategy'}
                </Button>
            </div>
            <div className={styles.tabContainer}>
                <Tabs
                    value={activeTab}
                    onChange={(_, tabId) => {
                        setActiveTab(tabId);
                        setActiveEnvironment(feature?.environments[tabId]);
                    }}
                    indicatorColor="primary"
                    textColor="primary"
                    className={styles.tabNavigation}
                >
                    {renderTabs()}
                </Tabs>
            </div>

            <div>
                {renderTabPanels()}
                <ConditionallyRender
                    condition={configureNewStrategy}
                    show={
                        <FeatureStrategiesConfigure
                            setToastData={setToastData}
                        />
                    }
                />
            </div>
            {toast}
        </div>
    );
};

export default FeatureStrategiesEnvironments;
