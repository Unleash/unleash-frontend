import { IconButton, Snackbar } from '@material-ui/core';
import CopyIcon from '@material-ui/icons/FileCopy';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';

interface IUserTokenProps {
    token: string;
}

interface ISnackbar {
    show: boolean;
    type: 'success' | 'error';
    text: string;
}

const UserToken = ({ token }: IUserTokenProps) => {
    const [snackbar, setSnackbar] = useState<ISnackbar>({
        show: false,
        type: 'success',
        text: '',
    });

    const handleCopy = () => {
        try {
            return navigator.clipboard
                .writeText(token)
                .then(() => {
                    setSnackbar({
                        show: true,
                        type: 'success',
                        text: 'Successfully copied token.',
                    });
                })
                .catch(() => {
                    setError();
                });
        } catch (e) {
            setError();
        }
    };

    const setError = () =>
        setSnackbar({
            show: true,
            type: 'error',
            text: 'Could not copy invite link.',
        });

    return (
        <div
            style={{
                backgroundColor: '#efefef',
                padding: '2rem',
                borderRadius: '3px',
                margin: '1rem 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                wordBreak: 'break-all',
            }}
        >
            {token}
            <IconButton onClick={handleCopy}>
                <CopyIcon />
            </IconButton>
            <Snackbar
                open={snackbar.show}
                autoHideDuration={6000}
                onClose={() =>
                    setSnackbar({ show: false, type: 'success', text: '' })
                }
            >
                <Alert severity={snackbar.type}>{snackbar.text}</Alert>
            </Snackbar>
        </div>
    );
};

export default UserToken;
