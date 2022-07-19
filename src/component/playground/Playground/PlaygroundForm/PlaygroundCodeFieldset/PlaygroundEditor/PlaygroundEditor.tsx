import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { Dispatch, SetStateAction, VFC, useCallback } from 'react';
import { styled, Alert, useTheme, Box } from '@mui/material';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import Check from '@mui/icons-material/Check';
import { Error } from '@mui/icons-material';

interface IPlaygroundEditorProps {
    context: string | undefined;
    setContext: Dispatch<SetStateAction<string | undefined>>;
    error: string | undefined;
}

const StyledEditorHeader = styled('aside')(({ theme }) => ({
    height: '50px',
    backgroundColor: theme.palette.grey[100],
    borderTopRightRadius: '5px',
    borderTopLeftRadius: '5px',
    padding: theme.spacing(1, 2),
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const StyledEditorStatusContainer = styled('div')(({ theme, style }) => ({
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `background-color 0.5s ease-in-out`,
    borderRadius: '50%',
    opacity: 0.8,
    ...style,
}));

const StyledErrorSpan = styled('div')(({ theme }) => ({
    fontSize: '0.9rem',
    color: theme.palette.error.main,
    marginRight: theme.spacing(1),
}));

const EditorStatusOk = () => {
    const theme = useTheme();
    return (
        <StyledEditorStatusContainer
            style={{
                color: '#fff',
                backgroundColor: theme.palette.success.main,
            }}
        >
            <Check sx={{ width: '20px', height: '20px' }} />
        </StyledEditorStatusContainer>
    );
};

const EditorStatusError = () => {
    const theme = useTheme();

    return (
        <StyledEditorStatusContainer
            style={{
                color: '#fff',
                backgroundColor: theme.palette.error.main,
            }}
        >
            <Error />
        </StyledEditorStatusContainer>
    );
};

export const PlaygroundEditor: VFC<IPlaygroundEditorProps> = ({
    context,
    setContext,
    error,
}) => {
    const onCodeFieldChange = useCallback(
        context => {
            setContext(context);
        },
        [setContext]
    );

    return (
        <Box sx={{ width: '100%' }}>
            <StyledEditorHeader>
                Json
                <ConditionallyRender
                    condition={Boolean(error)}
                    show={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StyledErrorSpan>{error}</StyledErrorSpan>
                            <EditorStatusError />
                        </Box>
                    }
                    elseShow={<EditorStatusOk />}
                />
            </StyledEditorHeader>
            <CodeMirror
                value={context}
                height="200px"
                extensions={[json()]}
                onChange={onCodeFieldChange}
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
            />
        </Box>
    );
};
