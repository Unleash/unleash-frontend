import { VFC } from 'react';
import {
    Box,
    Button,
    Divider,
    Paper,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { PlaygroundConnectionFieldset } from './PlaygroundConnectionFieldset/PlaygroundConnectionFieldset';

interface IPlaygroundProps {}

export const Playground: VFC<IPlaygroundProps> = () => {
    const theme = useTheme();

    return (
        <PageContent header={<PageHeader title="Unleash playground" />}>
            <Paper
                elevation={0}
                sx={{
                    px: 4,
                    py: 3,
                    background: theme.palette.grey[200],
                }}
            >
                <Box component="form">
                    <Typography
                        sx={{
                            mb: 3,
                        }}
                    >
                        Configure playground
                    </Typography>
                    <PlaygroundConnectionFieldset />
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Unleash context
                    </Typography>
                    <TextField
                        autoCorrect="off"
                        spellCheck={false}
                        multiline
                        label="JSON"
                        defaultValue={JSON.stringify(
                            {
                                currentTime: '2022-07-04T14:13:03.929Z',
                                appName: 'playground',
                                userId: 'test',
                            },
                            null,
                            2
                        )}
                        fullWidth
                    />
                    <Divider variant="fullWidth" sx={{ m: 3 }} />
                    <Button variant="contained">Try configuration</Button>
                </Box>
            </Paper>
        </PageContent>
    );
};
