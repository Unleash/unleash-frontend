import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControlLabel,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import StringTruncator from '../../../common/StringTruncator/StringTruncator';
import { useStyles } from './EnvironmentPermissionAccordion.styles';

const EnvironmentPermissionAccordion = ({
    environment,
    handlePermissionChange,
    checkedPermissions,
}) => {
    const styles = useStyles();

    const renderPermissions = () => {
        return environment.permissions.map(permission => {
            return (
                <FormControlLabel
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
                            (4 / {environment?.permissions?.length} permissions)
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
