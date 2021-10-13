import useFeatureMetrics from '../../../../hooks/api/getters/useFeatureMetrics/useFeatureMetrics';
import { Link, useParams } from 'react-router-dom';
import { IFeatureViewParams } from '../../../../interfaces/params';
import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { useStyles } from './FeatureSeenApplications.styles';

const FeatureSeenApplications: React.FC = () => {
    const { projectId, featureId } = useParams<IFeatureViewParams>();
    const { metrics } = useFeatureMetrics(projectId, featureId);
    const styles = useStyles()
    let seenApplications;
    if (metrics?.seenApplications?.length > 0) {
        seenApplications = metrics.seenApplications.map(appName => {
            return (<ListItem><ListItemText primary={
                <Link
                    to={`/applications/${appName}`}
                    className={[
                        styles.listLink,
                        styles.truncate,
                    ].join(' ')}
                >
                    {appName}
                </Link>
            } /></ListItem>)
        });
    } else {
        seenApplications = (<ListItem><ListItemText primary={'Not seen in any applications'} /></ListItem>);
    }

    return (
        <div>
            <List className={styles.applicationList}>
                <ListItemText primary={'Seen in applications:'} />
                {seenApplications}
            </List>
        </div>
    );
}

export default FeatureSeenApplications;
