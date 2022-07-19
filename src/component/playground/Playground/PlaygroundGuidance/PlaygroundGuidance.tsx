import { Typography, Box, Divider } from '@mui/material';
import { GuidanceIndicator } from 'component/common/GuidanceIndicator/GuidanceIndicator';
import { PlaygroundGuidanceSection } from './PlaygroundGuidanceSection/PlaygroundGuidanceSection';

export const PlaygroundGuidance = () => {
    return (
        <Box>
            <Typography variant="body1">
                Unleash playground is for helping you to undestand how unleash
                works, how feature toggles are evaluated and for you to easily
                debug your feature toggles.
            </Typography>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <Typography variant="body1" sx={{ mb: 1 }}>
                What you need to do is:
            </Typography>

            <PlaygroundGuidanceSection
                headerText="  Select in which environment you want to test your
                            feature toggle configuration"
                bodyText="  You can also specify specific projects, or check
                            toggles in all projects."
                sectionNumber="1"
            />

            <PlaygroundGuidanceSection
                headerText="Select a context field that you'd like to check"
                bodyText="Configure multiple context fields or leave empty to test against an empty context"
                sectionNumber="2"
            />

            <PlaygroundGuidanceSection
                headerText="Try configuration"
                sectionNumber="3"
            />

            <PlaygroundGuidanceSection
                headerText="View the results"
                sectionNumber="4"
            />
        </Box>
    );
};
