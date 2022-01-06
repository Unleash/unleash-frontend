import PermissionButton from '../../../common/PermissionButton/PermissionButton';
import {
    ADMIN,
    CREATE_FEATURE,
    UPDATE_FEATURE,
} from '../../../providers/AccessProvider/permissions';
import Input from '../../../common/Input/Input';
import { Button } from '@material-ui/core';
import { useStyles } from './CreateFeatureForm.styles';
import FeatureTypeSelect from '../../FeatureView2/FeatureSettings/FeatureSettingsMetadata/FeatureTypeSelect/FeatureTypeSelect';
import { CF_DESC_ID, CF_TYPE_ID } from '../../../../testIds';
import useFeatureTypes from '../../../../hooks/api/getters/useFeatureTypes/useFeatureTypes';
import { KeyboardArrowDownOutlined } from '@material-ui/icons';
import { useContext } from 'react';
import Codebox from '../../../common/Codebox/Codebox';
import useUser from '../../../../hooks/api/getters/useUser/useUser';
import { projectFilterGenerator } from '../../../../utils/project-filter-generator';
import FeatureProjectSelect from '../../FeatureView2/FeatureSettings/FeatureSettingsProject/FeatureProjectSelect/FeatureProjectSelect';
import AccessContext from '../../../../contexts/AccessContext';
import ConditionallyRender from '../../../common/ConditionallyRender';
import { Alert } from '@material-ui/lab';

interface IFeatureToggleForm {
    type: string;
    name: string;
    description: string;
    project: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setProject: React.Dispatch<React.SetStateAction<string>>;
    SDKs: Object;
    sdkSelect: string;
    handleSubmit: (e: any) => void;
    handleCancel: () => void;
    errors: { [key: string]: string };
    submitButtonText: string;
    clearErrors: () => void;
}

const CreateFeatureForm = ({
    type,
    name,
    description,
    project,
    setType,
    setName,
    setDescription,
    setProject,
    SDKs,
    sdkSelect,
    handleSubmit,
    handleCancel,
    errors,
    submitButtonText,
    clearErrors,
}: IFeatureToggleForm) => {
    const styles = useStyles();
    const { hasAccess } = useContext(AccessContext);
    const { featureTypes } = useFeatureTypes();
    const { permissions } = useUser();
    const editable = hasAccess(UPDATE_FEATURE, project);

    const renderToggleDescription = () => {
        return featureTypes.find(toggle => toggle.id === type)?.description;
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.container}>
                <p className={styles.inputDescription}>
                    What kind of feature toggle do you want to create?
                </p>
                <FeatureTypeSelect
                    value={type}
                    onChange={e => setType(e.target.value)}
                    label={'Toggle type'}
                    id="feature-type-select"
                    editable
                    inputProps={{
                        'data-test': CF_TYPE_ID,
                    }}
                    IconComponent={KeyboardArrowDownOutlined}
                    className={styles.selectInput}
                />
                <p className={styles.typeDescription}>
                    {renderToggleDescription()}
                </p>

                <p className={styles.inputDescription}>
                    What would you like to call your toggle?
                </p>
                <Input
                    className={styles.input}
                    label="Name"
                    error={Boolean(errors.name)}
                    errorText={errors.name}
                    onFocus={() => clearErrors()}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <ConditionallyRender
                    condition={editable}
                    show={
                        <p className={styles.inputDescription}>
                            In which project you want to save this toggle?
                        </p>
                    }
                />
                <FeatureProjectSelect
                    value={project}
                    onChange={e => setProject(e.target.value)}
                    enabled={editable}
                    label="Project"
                    filter={projectFilterGenerator(
                        { permissions },
                        CREATE_FEATURE
                    )}
                    IconComponent={KeyboardArrowDownOutlined}
                    className={styles.selectInput}
                />

                <p className={styles.inputDescription}>
                    How would you describe your feature toggle?
                </p>
                <Input
                    className={styles.input}
                    multiline
                    rows={4}
                    label="Description"
                    placeholder="A short description of the feature toggle"
                    value={description}
                    inputProps={{
                        'data-test': CF_DESC_ID,
                    }}
                    onChange={e => setDescription(e.target.value)}
                />
                <p className={styles.inputDescription}>
                    Example usage of this feature toggle
                </p>
                <ConditionallyRender condition={SDKs[sdkSelect].type === 'frontend'} show={
                     <Alert severity="info">
                         You should set up proxy for this sdk.
                     </Alert>
                } />
                <p className={styles.inputDescription}>
                    You have selected to use {sdkSelect} <br/>
                    (feel free to copy the code - you don't have to)
                </p>
                <Codebox
                    color={'#BEBDBD'}
                    bgColor={'#E5E0E0'}
                    text={SDKs[sdkSelect].code}
                    copyCode={true}
                />
            </div>

            <div className={styles.buttonContainer}>
                <Button onClick={handleCancel} className={styles.cancelButton}>
                    Cancel
                </Button>
                <PermissionButton
                    onClick={handleSubmit}
                    permission={ADMIN}
                    type="submit"
                >
                    {submitButtonText} toggle
                </PermissionButton>
            </div>
        </form>
    );
};

export default CreateFeatureForm;
