import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControlLabel,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { IPermission } from '../../../../../interfaces/user';
import StringTruncator from '../../../../common/StringTruncator/StringTruncator';
import { useStyles } from './EnvironmentPermissionAccordion.styles';

const EnvironmentPermissionAccordion = ({
    environment,
    handlePermissionChange,
    checkedPermissions,
}) => {
    const [permissionMap, setPermissionMap] = useState({});
    const [permissionCount, setPermissionCount] = useState(0);
    const styles = useStyles();

    useEffect(() => {
        const permissionMap = environment?.permissions?.reduce((acc, curr) => {
            acc[curr.id] = true;
            return acc;
        }, {});

        setPermissionMap(permissionMap);
        /* eslint-disable-next-line */
    }, [environment?.permissions?.length]);

    useEffect(() => {
        let count = 0;
        Object.keys(checkedPermissions).forEach(key => {
            if (permissionMap[key]) {
                count = count + 1;
            }
        });

        setPermissionCount(count);
        /* eslint-disable-next-line */
    }, [checkedPermissions]);

    const renderPermissions = () => {
        return environment.permissions.map((permission: IPermission) => {
            return (
                <FormControlLabel
                    classes={{ root: styles.label }}
                    key={permission.id}
                    control={
                        <Checkbox
                            checked={
                                checkedPermissions[permission.id] ? true : false
                            }
                            onChange={() => handlePermissionChange(permission)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label={permission.displayName || 'Dummy permission'}
                />
            );
        });
    };

    return (
        <div className={styles.environmentPermissionContainer}>
            <Accordion style={{ boxShadow: 'none' }}>
                <AccordionSummary
                    className={styles.accordionSummary}
                    expandIcon={<ExpandMore className={styles.icon} />}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <StringTruncator
                            text={environment.name}
                            className={styles.header}
                            maxWidth="120"
                        />
                        &nbsp;
                        <p className={styles.header}>
                            ({permissionCount} /{' '}
                            {environment?.permissions?.length} permissions)
                        </p>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionBody}>
                    {renderPermissions()}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default EnvironmentPermissionAccordion;
