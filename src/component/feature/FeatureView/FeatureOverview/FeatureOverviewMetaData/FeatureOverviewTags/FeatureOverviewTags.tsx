import React, { useContext, useState } from 'react';
import { Chip } from '@material-ui/core';
import { Close, Label } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import useTags from '../../../../../../hooks/api/getters/useTags/useTags';
import { IFeatureViewParams } from '../../../../../../interfaces/params';
import { useStyles } from './FeatureOverviewTags.styles';
import slackIcon from '../../../../../../assets/icons/slack.svg';
import jiraIcon from '../../../../../../assets/icons/jira.svg';
import webhookIcon from '../../../../../../assets/icons/webhooks.svg';
import { formatAssetPath } from '../../../../../../utils/format-path';
import useTagTypes from '../../../../../../hooks/api/getters/useTagTypes/useTagTypes';
import useFeatureApi from '../../../../../../hooks/api/actions/useFeatureApi/useFeatureApi';
import Dialogue from '../../../../../common/Dialogue';
import { ITag } from '../../../../../../interfaces/tags';
import useToast from '../../../../../../hooks/useToast';
import { UPDATE_FEATURE } from '../../../../../providers/AccessProvider/permissions';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import AccessContext from '../../../../../../contexts/AccessContext';

interface IFeatureOverviewTagsProps extends React.HTMLProps<HTMLButtonElement> {
    projectId: string;
}

const FeatureOverviewTags: React.FC<IFeatureOverviewTagsProps> = ({
    projectId,
    ...rest
}) => {
    const [showDelDialog, setShowDelDialog] = useState(false);
    const [selectedTag, setSelectedTag] = useState<ITag>({
        value: '',
        type: '',
    });
    const styles = useStyles();
    const { featureId } = useParams<IFeatureViewParams>();
    const { tags, refetch } = useTags(featureId);
    const { tagTypes } = useTagTypes();
    const { deleteTagFromFeature } = useFeatureApi();
    const { setToastData, setToastApiError } = useToast();
    const { hasAccess } = useContext(AccessContext);
    const canDeleteTag = hasAccess(UPDATE_FEATURE, projectId);

    const handleDelete = async () => {
        try {
            await deleteTagFromFeature(
                featureId,
                selectedTag.type,
                selectedTag.value
            );
            refetch();
            setToastData({
                type: 'success',
                title: 'Tag deleted',
                text: 'Successfully deleted tag',
            });
        } catch (e) {
            setToastApiError(e.message);
        }
    };

    const tagIcon = (typeName: string) => {
        let tagType = tagTypes.find(type => type.name === typeName);

        const style = { width: '20px', height: '20px', marginRight: '5px' };

        if (tagType && tagType.icon) {
            switch (tagType.name) {
                case 'slack':
                    return (
                        <img
                            style={style}
                            alt="slack"
                            src={formatAssetPath(slackIcon)}
                        />
                    );
                case 'jira':
                    return (
                        <img
                            style={style}
                            alt="jira"
                            src={formatAssetPath(jiraIcon)}
                        />
                    );
                case 'webhook':
                    return (
                        <img
                            style={style}
                            alt="webhook"
                            src={formatAssetPath(webhookIcon)}
                        />
                    );
                default:
                    return <Label />;
            }
        } else {
            return <span>{typeName[0].toUpperCase()}</span>;
        }
    };

    const renderTag = t => (
        <Chip
            icon={tagIcon(t.type)}
            className={styles.tagChip}
            data-loading
            label={t.value}
            key={`${t.type}:${t.value}`}
            deleteIcon={<Close className={styles.closeIcon} />}
            onDelete={
                canDeleteTag
                    ? () => {
                          setShowDelDialog(true);
                          setSelectedTag({ type: t.type, value: t.value });
                      }
                    : undefined
            }
        />
    );

    return (
        <div className={styles.container} {...rest}>
            <Dialogue
                open={showDelDialog}
                onClose={() => {
                    setShowDelDialog(false);
                    setSelectedTag({ type: '', value: '' });
                }}
                onClick={() => {
                    setShowDelDialog(false);
                    handleDelete();
                    setSelectedTag({ type: '', value: '' });
                }}
                title="Are you sure you want to delete this tag?"
            />

            <div className={styles.tagContent}>
                <ConditionallyRender
                    condition={tags.length > 0}
                    show={tags.map(renderTag)}
                    elseShow={<p data-loading>No tags to display</p>}
                />
            </div>
        </div>
    );
};

export default FeatureOverviewTags;
