import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Paper } from "@material-ui/core";

const a11yProps = index => ({
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`
});

const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
};

TabPanel.propTypes = {
    value: PropTypes.number,
    index: PropTypes.number
};

const TabNav = ({ tabData, className }) => {
    const [activeTab, setActiveTab] = useState(0);

    const renderTabs = () => {
        return tabData.map((tab, index) => {
            return <Tab label={tab.label} {...a11yProps(index)} />;
        });
    };

    const renderTabPanels = () => {
        return tabData.map((tab, index) => {
            return (
                <TabPanel value={activeTab} index={index}>
                    {tab.component}
                </TabPanel>
            );
        });
    };

    return (
        <>
            <Paper style={{ background: "#efefef" }}>
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

export default TabNav;
