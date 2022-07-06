import {
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
    VFC,
} from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import useUnleashContext from 'hooks/api/getters/useUnleashContext/useUnleashContext';
import { formatUnknownError } from 'utils/formatUnknownError';
import { debounce } from 'debounce';

interface IPlaygroundCodeFieldsetProps {
    value: string | undefined;
    setValue: Dispatch<SetStateAction<string | undefined>>;
}

export const PlaygroundCodeFieldset: VFC<IPlaygroundCodeFieldsetProps> = ({
    value,
    setValue,
}) => {
    const theme = useTheme();
    const { context } = useUnleashContext();
    const contextOptions = useMemo(
        () =>
            context
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map(({ name }) => name),
        [context]
    );
    const [error, setError] = useState<string>();
    const debounceSetError = useMemo(
        () =>
            debounce((input?: string) => {
                if (!input) {
                    return setError(undefined);
                }

                try {
                    JSON.parse(input);
                } catch (error: unknown) {
                    return setError(formatUnknownError(error));
                }

                return setError(undefined);
            }, 250),
        [setError]
    );

    useEffect(() => {
        debounceSetError(value);
    }, [debounceSetError, value]);

    const [contextField, setContextField] = useState<string>('');
    const [contextValue, setContextValue] = useState<string>('');
    const onAddField = () => {
        try {
            const currentValue = JSON.parse(value || '{}');
            setValue(
                JSON.stringify(
                    {
                        ...currentValue,
                        [contextField]: contextValue,
                    },
                    null,
                    2
                )
            );
        } catch (error) {
            // Shouldn't happened, because button is disabled when there is an error
            // but needed because the error is debounced
        }
    };

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
                error={Boolean(error)}
                helperText={error}
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
                InputProps={{ minRows: 5 }}
                value={value}
                onChange={event => setValue(event.target.value)}
            />
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                <FormControl>
                    <InputLabel id="context-field-label" size="small">
                        Context field
                    </InputLabel>
                    <Select
                        label="Context field"
                        labelId="context-field-label"
                        id="context-field"
                        value={contextField}
                        onChange={event =>
                            setContextField(event.target.value || '')
                        }
                        variant="outlined"
                        size="small"
                        sx={{ width: 300, maxWidth: '100%' }}
                    >
                        {contextOptions.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Value"
                    id="context-value"
                    sx={{ width: 300, maxWidth: '100%' }}
                    size="small"
                    value={contextValue}
                    onChange={event =>
                        setContextValue(event.target.value || '')
                    }
                />
                <Button
                    variant="outlined"
                    disabled={!contextField || Boolean(error)}
                    onClick={onAddField}
                >
                    Add context field
                </Button>
            </Box>
        </Box>
    );
};
