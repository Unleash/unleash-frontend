import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
} from '@material-ui/core';
import { Delete, Edit, TrackChanges } from '@material-ui/icons';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { values } from 'lodash';
import { useState } from 'react';
import ConditionallyRender from '../ConditionallyRender';
import PermissionIconButton from '../PermissionIconButton/PermissionIconButton';
import StringTruncator from '../StringTruncator/StringTruncator';
import { useStyles } from './ConstraintAccordion.styles';

interface IConstraintAccordionProps {
    initialMode?: string;
}

export const ConstraintAccordion = ({
    initialMode = '',
}: IConstraintAccordionProps) => {
    const [mode, setMode] = useState(initialMode);

    return (
        <ConditionallyRender
            condition={mode === 'edit'}
            show={<ConstraintAccordionEdit />}
            elseShow={<ConstraintAccordionView setMode={setMode} />}
        />
    );
};

const ConstraintAccordionView = ({ setMode, ...rest }) => {
    const styles = useStyles();
    return (
        <Accordion
            style={{ boxShadow: 'none' }}
            className={styles.accordion}
            {...rest}
        >
            <AccordionSummary
                className={styles.summary}
                expandIcon={<ExpandMore />}
            >
                <div className={styles.headerContainer}>
                    <div className={styles.headerMetaInfo}>
                        <ConstraintIcon />
                        <StringTruncator text="appName" maxWidth="200" />
                        <p className={styles.operator}>includes</p>
                        <p className={styles.values}>
                            30+ values. Expand to view
                        </p>
                    </div>
                    <div className={styles.headerActions}>
                        <IconButton onClick={() => setMode('edit')}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={() => setMode('')}>
                            <Delete />
                        </IconButton>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>This is the details</AccordionDetails>
        </Accordion>
    );
};

const ConstraintAccordionEdit = ({ ...rest }) => {
    const styles = useStyles();
    return (
        <Accordion
            expanded={true}
            style={{ boxShadow: 'none' }}
            className={styles.accordion}
        >
            <AccordionSummary className={styles.summary}>
                <ConstraintIcon />
            </AccordionSummary>
            <AccordionDetails>This is the details</AccordionDetails>
        </Accordion>
    );
};

const ConstraintIcon = () => {
    const styles = useStyles();

    return (
        <div className={styles.constraintIconContainer}>
            <TrackChanges className={styles.constraintIcon} />
        </div>
    );
};
