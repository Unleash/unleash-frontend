import { Button } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Input from 'component/common/Input/Input';
import React from 'react';

interface IMultiValueInputProps {
    inputValues: string;
    setInputValues: React.Dispatch<React.SetStateAction<string>>;
    addValues: () => void;
    error: string;
    setError?: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles()(theme => ({
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down(700)]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    },
    inputInnerContainer: {
        minWidth: '300px',
        [theme.breakpoints.down(700)]: {
            minWidth: '100%',
        },
    },
    input: {
        width: '100%',
        margin: '1rem 0',
    },
    button: {
        marginLeft: '1rem',
        [theme.breakpoints.down(700)]: {
            marginLeft: 0,
            marginBottom: '0.5rem',
        },
    },
    valuesContainer: { marginTop: '1rem' },
}));

const ENTER = 'Enter';

export const MultiValueInput = ({
    setInputValues,
    inputValues,
    addValues,
    error,
    setError,
}: IMultiValueInputProps) => {
    const { classes: styles } = useStyles();

    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ENTER) {
            event.preventDefault();
            addValues();
        }
    };

    return (
        <div>
            <div className={styles.inputContainer}>
                <div className={styles.inputInnerContainer}>
                    <Input
                        onKeyPress={onKeyPress}
                        label="Values"
                        name="values"
                        value={inputValues}
                        onFocus={() => {
                            if (setError && typeof setError === 'function') {
                                setError('');
                            }
                        }}
                        onChange={e => setInputValues(e.target.value)}
                        placeholder="value1, value2, value3..."
                        className={styles.input}
                        error={Boolean(error)}
                        errorText={error}
                    />
                </div>
                <Button
                    className={styles.button}
                    variant="outlined"
                    color="secondary"
                    onClick={() => addValues()}
                >
                    Add values
                </Button>
            </div>
        </div>
    );
};
