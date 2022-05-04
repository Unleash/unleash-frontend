import {
    useState,
    useRef,
    useEffect,
    FormEventHandler,
    ChangeEventHandler,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    Switch,
    Paper,
    FormControlLabel,
    Alert,
} from '@mui/material';
import { FileCopy } from '@mui/icons-material';
import { styles as themeStyles } from 'component/common';
import { formatUnknownError } from 'utils/formatUnknownError';
import styles from './CopyFeature.module.scss';
import { trim } from 'component/common/util';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';
import { getTogglePath } from 'utils/routePathHelpers';
import useFeatureApi from 'hooks/api/actions/useFeatureApi/useFeatureApi';
import { useFeature } from 'hooks/api/getters/useFeature/useFeature';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';

export const CopyFeatureToggle = () => {
    const [replaceGroupId, setReplaceGroupId] = useState(true);
    const [apiError, setApiError] = useState('');
    const [nameError, setNameError] = useState<string | undefined>();
    const [newToggleName, setNewToggleName] = useState<string>();
    const { cloneFeatureToggle, validateFeatureToggleName } = useFeatureApi();
    const inputRef = useRef<HTMLInputElement>();
    const copyToggleName = useRequiredPathParam('name');
    const projectId = useRequiredPathParam('id');
    const { feature } = useFeature(projectId, copyToggleName);
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const setValue: ChangeEventHandler<HTMLInputElement> = event => {
        const value = trim(event.target.value);
        setNewToggleName(value);
    };

    const toggleReplaceGroupId = () => {
        setReplaceGroupId(prev => !prev);
    };

    const onValidateName = async () => {
        try {
            await validateFeatureToggleName(newToggleName);

            setNameError(undefined);
        } catch (error) {
            setNameError(formatUnknownError(error));
        }
    };

    const onSubmit: FormEventHandler = async event => {
        event.preventDefault();

        if (nameError) {
            return;
        }

        try {
            await cloneFeatureToggle(projectId, copyToggleName, {
                name: newToggleName as string,
                replaceGroupId,
            });
            navigate(getTogglePath(projectId, newToggleName as string));
        } catch (error) {
            setApiError(formatUnknownError(error));
        }
    };

    if (!feature || !feature.name) return <span>Toggle not found</span>;

    return (
        <Paper
            className={themeStyles.fullwidth}
            style={{ overflow: 'visible' }}
        >
            <div className={styles.header}>
                <h1>Copy&nbsp;{copyToggleName}</h1>
            </div>
            <ConditionallyRender
                condition={Boolean(apiError)}
                show={<Alert severity="error">{apiError}</Alert>}
            />
            <section className={styles.content}>
                <p className={styles.text}>
                    You are about to create a new feature toggle by cloning the
                    configuration of feature toggle&nbsp;
                    <Link to={getTogglePath(projectId, copyToggleName)}>
                        {copyToggleName}
                    </Link>
                    . You must give the new feature toggle a unique name before
                    you can proceed.
                </p>
                <form onSubmit={onSubmit}>
                    <TextField
                        label="Feature toggle name"
                        name="name"
                        value={newToggleName || ''}
                        onBlur={onValidateName}
                        onChange={setValue}
                        error={nameError !== undefined}
                        helperText={nameError}
                        variant="outlined"
                        size="small"
                        inputRef={inputRef}
                        required
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                value={replaceGroupId}
                                checked={replaceGroupId}
                                onChange={toggleReplaceGroupId}
                            />
                        }
                        label="Replace groupId"
                    />

                    <Button type="submit" color="primary" variant="contained">
                        <FileCopy />
                        &nbsp;&nbsp;&nbsp; Create from copy
                    </Button>
                </form>
            </section>
        </Paper>
    );
};
