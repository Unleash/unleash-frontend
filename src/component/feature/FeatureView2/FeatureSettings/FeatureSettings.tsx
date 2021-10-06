import { useParams } from 'react-router';
import { useContext } from 'react';
import AccessContext from '../../../../contexts/AccessContext';
import useFeatureApi from '../../../../hooks/api/actions/useFeatureApi/useFeatureApi';
import useUser from '../../../../hooks/api/getters/useUser/useUser';
import useToast from '../../../../hooks/useToast';
import { IFeatureViewParams } from '../../../../interfaces/params';
import { projectFilterGenerator } from '../../../../utils/project-filter-generator';
import {
    CREATE_FEATURE,
    UPDATE_FEATURE,
} from '../../../AccessProvider/permissions';
import { useState, useEffect } from 'react';
import PageContent from '../../../common/PageContent';
import { useStyles } from './FeatureSettings.styles';
import FeatureProjectSelect from './FeatureSettingsProject/FeatureProjectSelect/FeatureProjectSelect';
import useFeature from '../../../../hooks/api/getters/useFeature/useFeature';
import { List, ListItem } from '@material-ui/core';
import * as jsonpatch from 'fast-json-patch';
import ConditionallyRender from '../../../common/ConditionallyRender';
import FeatureSettingsMetadata from './FeatureSettingsMetadata/FeatureSettingsMetadata';
import FeatureSettingsProject from './FeatureSettingsProject/FeatureSettingsProject';

const METADATA = 'metadata';
const PROJECT = 'project';

const FeatureSettings = () => {
    const styles = useStyles();

    const [settings, setSettings] = useState(METADATA);

    return (
        <PageContent headerContent="Settings" bodyClass={styles.bodyContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.listContainer}>
                    <List className={styles.list}>
                        <ListItem
                            className={styles.listItem}
                            button
                            onClick={() => setSettings(METADATA)}
                        >
                            Metadata
                        </ListItem>
                        <ListItem
                            className={styles.listItem}
                            button
                            onClick={() => setSettings(PROJECT)}
                        >
                            Project
                        </ListItem>
                    </List>
                </div>

                <div className={styles.innerBodyContainer}>
                    <ConditionallyRender
                        condition={settings === METADATA}
                        show={<FeatureSettingsMetadata />}
                    />
                    <ConditionallyRender
                        condition={settings === PROJECT}
                        show={<FeatureSettingsProject />}
                    />
                </div>
            </div>
        </PageContent>
    );
};

export default FeatureSettings;
