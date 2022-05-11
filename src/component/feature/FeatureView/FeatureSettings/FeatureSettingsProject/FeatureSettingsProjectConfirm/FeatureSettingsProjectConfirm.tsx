import { List, ListItem } from '@mui/material';
import { Check, Error, Cloud } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import useProject from 'hooks/api/getters/useProject/useProject';
import { IFeatureEnvironment, IFeatureToggle } from 'interfaces/featureToggle';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { Dialogue } from 'component/common/Dialogue/Dialogue';
import { useStyles } from './FeatureSettingsProjectConfirm.styles';

interface IFeatureSettingsProjectConfirm {
    projectId: string;
    open: boolean;
    onClose: () => void;
    onClick: (args: any) => void;
    feature: IFeatureToggle;
}

const FeatureSettingsProjectConfirm = ({
    projectId,
    open,
    onClose,
    onClick,
    feature,
}: IFeatureSettingsProjectConfirm) => {
    const { project } = useProject(projectId);
    const [incompatibleEnvs, setIncompatibleEnvs] = useState<string[]>([]);
    const { classes: styles } = useStyles();

    useEffect(() => {
        const incompatibleEnvNames = feature.environments
            .filter(env => env.enabled)
            .map(env => env.name)
            .filter(name => !project.environments.includes(name));
        setIncompatibleEnvs(incompatibleEnvNames);
    }, [feature, project]);

    return (
        <ConditionallyRender
            condition={incompatibleEnvs?.length === 0}
            show={
                <Dialogue
                    open={open}
                    onClose={onClose}
                    onClick={onClick}
                    title="Confirm change project"
                    primaryButtonText="Change project"
                    secondaryButtonText="Cancel"
                >
                    Are you sure you want to change the project for this feature
                    toggle?
                    <div className={styles.compatability}>
                        This feature toggle is compatible with the new project.
                        <div className={styles.iconContainer}>
                            <Check className={styles.check} />
                        </div>
                    </div>
                </Dialogue>
            }
            elseShow={
                <Dialogue
                    open={open}
                    onClose={onClose}
                    title="Confirm change project"
                    secondaryButtonText="OK"
                >
                    <div className={styles.topContent}>
                        <p>
                            {' '}
                            This feature toggle is not compatible with the new
                            project destination.
                        </p>
                        <div className={styles.iconContainer}>
                            <div className={styles.errorIconContainer}>
                                <Error
                                    className={styles.check}
                                    titleAccess="Error"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.compatability}>
                        <div>
                            <p className={styles.paragraph}>
                                This feature toggle has an environment that is
                                not activated in the target project:
                            </p>
                            <List>
                                {incompatibleEnvs.map(env => {
                                    return (
                                        <ListItem key={env}>
                                            <Cloud className={styles.cloud} />
                                            {env}
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                    </div>
                    <p className={styles.paragraph}>
                        In order to move this feature toggle, make sure you
                        enable the required environments in the target project.
                    </p>
                </Dialogue>
            }
        />
    );
};

export default FeatureSettingsProjectConfirm;
