import { useMemo, VFC } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import useUnleashContext from 'hooks/api/getters/useUnleashContext/useUnleashContext';

interface IPlaygroundCodeFieldsetProps {}

export const PlaygroundCodeFieldset: VFC<IPlaygroundCodeFieldsetProps> = () => {
    const theme = useTheme();
    const { context } = useUnleashContext();
    const contextOptions = useMemo(
        () =>
            context
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(({ name }) => name),
        [context]
    );

    return (
        <Box>
            <Typography
                variant="body2"
                sx={{ mb: 2 }}
                color={theme.palette.text.secondary}
            >
                Unleash context
            </Typography>
            <TextField
                autoCorrect="off"
                spellCheck={false}
                multiline
                label="JSON"
                placeholder={JSON.stringify(
                    {
                        currentTime: '2022-07-04T14:13:03.929Z',
                        appName: 'playground',
                        userId: 'test',
                        remoteAddress: '127.0.0.1',
                    },
                    null,
                    2
                )}
                fullWidth
                InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                <Autocomplete
                    disablePortal
                    id="context-field"
                    options={contextOptions}
                    sx={{ width: 300, maxWidth: '100%' }}
                    renderInput={params => (
                        <TextField {...params} label="Context field" />
                    )}
                    size="small"
                    // value={}
                    // onChange={}
                />
                <TextField
                    label="Value"
                    id="context-value"
                    sx={{ width: 300, maxWidth: '100%' }}
                    size="small"
                    // value={}
                    // onChange={}
                />
                <Button variant="outlined">Add context field</Button>
            </Box>
        </Box>
    );
};
