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
    Alert,
} from '@mui/material';

import { debounce } from 'debounce';
import useUnleashContext from 'hooks/api/getters/useUnleashContext/useUnleashContext';
import { formatUnknownError } from 'utils/formatUnknownError';
import useToast from 'hooks/useToast';
import { PlaygroundEditor } from './PlaygroundEditor/PlaygroundEditor';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { GuidanceIndicator } from 'component/common/GuidanceIndicator/GuidanceIndicator';

interface IPlaygroundCodeFieldsetProps {
    context: string | undefined;
    setContext: Dispatch<SetStateAction<string | undefined>>;
}

export const PlaygroundCodeFieldset: VFC<IPlaygroundCodeFieldsetProps> = ({
    context,
    setContext,
}) => {
    const theme = useTheme();
    const { setToastData } = useToast();
    const { context: contextData } = useUnleashContext();
    const contextOptions = contextData
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(({ name }) => name);
    const [error, setError] = useState<string>();
    const [fieldExist, setFieldExist] = useState<boolean>(false);
    const [contextField, setContextField] = useState<string>('');
    const [contextValue, setContextValue] = useState<string>('');
    const debounceJsonParsing = useMemo(
        () =>
            debounce((input?: string) => {
                if (!input) {
                    return setError(undefined);
                }

                try {
                    const contextValue = JSON.parse(input);

                    setFieldExist(contextValue[contextField] !== undefined);
                } catch (error: unknown) {
                    return setError(formatUnknownError(error));
                }

                return setError(undefined);
            }, 250),
        [setError, contextField, setFieldExist]
    );

    useEffect(() => {
        debounceJsonParsing(context);
    }, [debounceJsonParsing, context]);

    const onAddField = () => {
        try {
            const currentValue = JSON.parse(context || '{}');
            setContext(
                JSON.stringify(
                    {
                        ...currentValue,
                        [contextField]: contextValue,
                    },
                    null,
                    2
                )
            );
            setContextValue('');
        } catch (error) {
            setToastData({
                type: 'error',
                title: `Error parsing context: ${formatUnknownError(error)}`,
            });
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GuidanceIndicator type="secondary">2</GuidanceIndicator>
                <Typography
                    variant="body2"
                    color={theme.palette.text.secondary}
                    sx={{ ml: 1 }}
                >
                    Unleash context
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
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
                        sx={{ width: 200, maxWidth: '100%' }}
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
                    sx={{ width: 200, maxWidth: '100%' }}
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
                    sx={{ marginLeft: 'auto', width: '95px' }}
                >
                    {`${!fieldExist ? 'Add' : 'Replace'} `}
                </Button>
            </Box>

            <PlaygroundEditor
                context={context}
                setContext={setContext}
                error={error}
            />
        </Box>
    );
};
