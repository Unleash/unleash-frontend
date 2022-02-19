import { useState } from 'react';
import PageContent from '../../../common/PageContent';
import { useStyles } from './FeatureSettings.styles';
import { List, ListItem } from '@material-ui/core';
import ConditionallyRender from '../../../common/ConditionallyRender';
import FeatureSettingsProject from './FeatureSettingsProject/FeatureSettingsProject';
import { useHistory, useParams } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import PermissionIconButton from '../../../common/PermissionIconButton/PermissionIconButton';
import { UPDATE_FEATURE } from '../../../providers/AccessProvider/permissions';
import { IFeatureViewParams } from '../../../../interfaces/params';

const PROJECT = 'project';

export const FeatureSettings = () => {
    const styles = useStyles();
    const history = useHistory();
    const { projectId, featureId } = useParams<IFeatureViewParams>();

    const [settings, setSettings] = useState(PROJECT);

    const handleEdit = () =>
        history.push(`/projects/${projectId}/features/${featureId}/edit`);

    return (
        <PageContent headerContent="Settings" bodyClass={styles.bodyContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.listContainer}>
                    <List>
                        <ListItem
                            className={styles.listItem}
                            button
                            onClick={() => setSettings(PROJECT)}
                        >
                            Project
                        </ListItem>
                        <ListItem className={styles.listItem}>
                            Metadata
                            <PermissionIconButton
                                permission={UPDATE_FEATURE}
                                tooltip={'Edit feature'}
                                projectId={projectId}
                                data-loading
                                onClick={handleEdit}
                            >
                                <Edit titleAccess="Edit feature" />
                            </PermissionIconButton>
                        </ListItem>
                    </List>
                </div>

                <div className={styles.innerBodyContainer}>
                    <ConditionallyRender
                        condition={settings === PROJECT}
                        show={<FeatureSettingsProject />}
                    />
                </div>
            </div>
        </PageContent>
    );
};
