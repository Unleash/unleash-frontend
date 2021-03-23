import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Paper } from '@material-ui/core';

import TabPanel from './TabPanel';

import { useStyles } from './styles';

const a11yProps = index => ({
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
});

const TabNav = ({ tabData, className }) => {
    const styles = useStyles();
    const [activeTab, setActiveTab] = useState(0);

    const renderTabs = () =>
        tabData.map((tab, index) => <Tab key={`${tab.label}_${index}`} label={tab.label} {...a11yProps(index)} />);

    const renderTabPanels = () =>
        tabData.map((tab, index) => (
            <TabPanel key={`tab_panel_${index}`} value={activeTab} index={index}>
                {tab.component}
            </TabPanel>
        ));

    return (
        <>
            <Paper className={styles.tabNav}>
                <Tabs
                    value={activeTab}
                    onChange={(_, tabId) => {
                        setActiveTab(tabId);
                    }}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    {renderTabs()}
                </Tabs>
            </Paper>
            <div className={className}>{renderTabPanels()}</div>
        </>
    );
};

TabNav.propTypes = {
    tabData: PropTypes.array.isRequired,
    className: PropTypes.string,
};

export default TabNav;
