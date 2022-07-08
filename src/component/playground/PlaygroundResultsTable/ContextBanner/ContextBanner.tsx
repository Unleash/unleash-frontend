import { colors } from 'themes/colors';
import { Alert, styled } from '@mui/material';
import { SdkContextSchema } from 'openapi';

interface IContextBannerProps {
    context: SdkContextSchema;
}

const ContextFieldList = styled('ul')(() => ({
    color: colors.black,
    listStyleType: 'none',
    paddingInlineStart: 16,
}));

export const ContextBanner = ({ context }: IContextBannerProps) => {
    return (
        <Alert severity="info" sx={{ my: 2 }}>
            Your results are generated based on this configuration
            <ContextFieldList>
                {Object.entries(context).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                ))}
            </ContextFieldList>
        </Alert>
    );
};
