import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@material-ui/core';

const EnvironmentPermissionAccordion = ({ environment }) => {
    <Accordion>
        <AccordionSummary>{environment.name}</AccordionSummary>
        <AccordionDetails></AccordionDetails>
    </Accordion>;
};

export default EnvironmentPermissionAccordion;
