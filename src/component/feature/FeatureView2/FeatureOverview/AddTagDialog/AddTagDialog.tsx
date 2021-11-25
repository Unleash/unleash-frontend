import { DialogContentText } from '@material-ui/core';
import { useParams } from 'react-router';
import { useState } from 'react';
import { IFeatureViewParams } from '../../../../../interfaces/params';
import Dialogue from '../../../../common/Dialogue';
import Input from '../../../../common/Input/Input';
import { SyntheticEvent } from 'react-router/node_modules/@types/react';
import { useStyles } from './AddTagDialog.styles';
import { trim } from '../../../../common/util';
import TagSelect from '../../../../common/TagSelect/TagSelect';
import useFeatureApi from '../../../../../hooks/api/actions/useFeatureApi/useFeatureApi';
import useTags from '../../../../../hooks/api/getters/useTags/useTags';
import useToast from '../../../../../hooks/useToast';

interface IAddTagDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDefaultTag {
    type: string;
    value: string;
    [index: string]: string;
}

const AddTagDialog = ({ open, setOpen }: IAddTagDialogProps) => {
    const DEFAULT_TAG: IDefaultTag = { type: 'simple', value: '' };
    const styles = useStyles();
    const { featureId } = useParams<IFeatureViewParams>();
    const { addTagToFeature, loading } = useFeatureApi();
    const { refetch } = useTags(featureId);
    const [errors, setErrors] = useState({ tagError: '' });
    const { toast, setToastData } = useToast();
    const [tag, setTag] = useState(DEFAULT_TAG);

    const onCancel = () => {
        setOpen(false);
        setErrors({ tagError: '' });
        setTag(DEFAULT_TAG);
    };

    const setValue = (field: string, value: string) => {
        const newTag = { ...tag };
        newTag[field] = trim(value);
        setTag(newTag);
    };

    const onSubmit = async (evt: SyntheticEvent) => {
        evt.preventDefault();
        if (!tag.type) {
            tag.type = 'simple';
        }
        try {
            await addTagToFeature(featureId, tag);

            setOpen(false);
            setTag(DEFAULT_TAG);
            refetch();
            setToastData({
                type: 'success',
                show: true,
                text: 'Successfully created tag',
            });
        } catch (e) {
            setErrors({ tagError: e.message });
        }
    };

    const formId = 'add-tag-form';

    return (
        <>
            <Dialogue
                open={open}
                secondaryButtonText="Cancel"
                primaryButtonText="Add tag"
                title="Add tags to feature toggle"
                onClick={onSubmit}
                disabledPrimaryButton={loading}
                onClose={onCancel}
                formId={formId}
            >
                <>
                    <DialogContentText>
                        Tags allows you to group features together
                    </DialogContentText>
                    <form id={formId} onSubmit={onSubmit}>
                        <section className={styles.dialogFormContent}>
                            <TagSelect
                                autoFocus
                                name="type"
                                value={tag.type}
                                onChange={e => setValue('type', e.target.value)}
                            />
                            <br />
                            <Input
                                label="Value"
                                name="value"
                                placeholder="Your tag"
                                value={tag.value}
                                error={Boolean(errors.tagError)}
                                errorText={errors.tagError}
                                onChange={e =>
                                    setValue('value', e.target.value)
                                }
                            />
                        </section>
                    </form>
                </>
            </Dialogue>
            {toast}
        </>
    );
};

export default AddTagDialog;
