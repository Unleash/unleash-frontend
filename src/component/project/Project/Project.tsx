import { useHistory, useParams } from 'react-router';
import { useCommonStyles } from '../../../common.styles';
import useProject from '../../../hooks/api/getters/useProject/useProject';
import useLoading from '../../../hooks/useLoading';
import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
import ApiError from '../../common/ApiError/ApiError';
import ConditionallyRender from '../../common/ConditionallyRender';
import { useStyles } from './Project.styles';
import { IconButton, Tab, Tabs } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import useToast from '../../../hooks/useToast';
import useQueryParams from '../../../hooks/useQueryParams';
import { useEffect } from 'react';
import useTabs from '../../../hooks/useTabs';
import TabPanel from '../../common/TabNav/TabPanel';
import ProjectAccess from '../access-container';
import EditProject from '../edit-project-container';
import ProjectEnvironment from '../ProjectEnvironment/ProjectEnvironment';
import ProjectOverview from './ProjectOverview';
import ProjectHealth from './ProjectHealth/ProjectHealth';

const Project = () => {
    const { id, activeTab } = useParams<{ id: string, activeTab: string }>();
    const params = useQueryParams();
    const { project, error, loading, refetch } = useProject(id);
    const { uiConfig } = useUiConfig();
    const ref = useLoading(loading);
    const { toast, setToastData } = useToast();
    const commonStyles = useCommonStyles();
    const styles = useStyles();
    const history = useHistory();

    const { a11yProps, activeTabIdx, setActiveTab } = useTabs(0);

    const basePath = `/projects/${id}`;
    const tabData = [
        {
            title: 'Overview',
            component: <ProjectOverview projectId={id} />,
            path: basePath,
            name: 'overview',
        },
        {
            title: 'Health',
            component: <ProjectHealth projectId={id} />,
            path: `${basePath}/health`,
            name: 'health',
        },
        {
            title: 'Access',
            component: <ProjectAccess projectId={id} />,
            path: `${basePath}/access`,
            name: 'access',
        },
        {
            title: 'Environments',
            component: <ProjectEnvironment projectId={id}  />,
            path: `${basePath}/environments`,
            name: 'environments',
            disabled: !uiConfig.flags.E
        },
        {
            title: 'Settings',
            // @ts-ignore (fix later)
            component: <EditProject projectId={id} history={history} title="Edit project" />,
            path: `${basePath}/settings`,
            name: 'settings',
        },
    ]

    useEffect(() => {
        const created = params.get('created');
        const edited = params.get('edited');

        if (created || edited) {
            const text = created ? 'Project created' : 'Project updated';
            setToastData({
                show: true,
                type: 'success',
                text,
            });
        }

        tabData.filter(tab => !tab.disabled);

        /* eslint-disable-next-line */
    }, []);

    useEffect(() => {
        const tabIdx = tabData.findIndex(tab => tab.name === activeTab);
        if(tabIdx > 0) {
            setActiveTab(tabIdx);
        } else {
            setActiveTab(0);
        }
        
        /* eslint-disable-next-line */
    }, []);

    const goToTabWithName = (name: string) => {
        const index = tabData.findIndex(t => t.name === name);
        if(index >= 0) {
            const tab = tabData[index];
            history.push(tab.path);
            setActiveTab(index);
        }
    }

    


    const renderTabs = () => {
        return tabData.map((tab, index) => {
            return (
                <Tab
                    data-loading    
                    key={tab.title}
                    label={tab.title}
                    {...a11yProps(index)}
                    onClick={() => {
                        setActiveTab(index);
                        history.push(tab.path);
                    }}
                    className={styles.tabButton}
                />
            );
        });
    };

    const renderTabContent = () => {
        return tabData.map((tab, index) => {
            return (
                <TabPanel value={activeTabIdx} index={index} key={tab.path}>
                    {tab.component}
                </TabPanel>
            );
        });
    };


    return (
        <div ref={ref}>
            <div className={styles.header}>
                <div className={styles.innerContainer}>
                    <h2 data-loading className={commonStyles.title} style={{margin: 0}}>
                        Project: {project?.name}{' '}
                        <IconButton onClick={() => goToTabWithName('settings')}>
                            <Edit />
                        </IconButton>
                    </h2>
                    <p data-loading>{project?.description}</p>
                </div>
                <ConditionallyRender
                    condition={error}
                    show={
                        <ApiError
                            data-loading
                            style={{ maxWidth: '400px', marginTop: '1rem' }}
                            onClick={refetch}
                            text="Could not fetch project"
                        />
                    }
                />
                <div className={styles.separator} />
                <div className={styles.tabContainer}>
                    <Tabs
                        value={activeTabIdx}
                        onChange={(_, tabId) => {
                            setActiveTab(tabId);
                        }}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {renderTabs()}
                    </Tabs>
                </div>
            </div>
            {renderTabContent()}
            {toast}
        </div>
    );
};

export default Project;
