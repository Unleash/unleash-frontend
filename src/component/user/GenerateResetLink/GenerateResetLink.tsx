import { Typography, TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import StandaloneLayout from '../common/StandaloneLayout/StandaloneLayout';

const GenerateResetLink = () => {
    const [email, setEmail] = useState('');

    return (
        <StandaloneLayout>
            <Typography>Send a new reset link</Typography>
            <TextField
                variant="outlined"
                size="small"
                placeholder="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <Button variant="contained" color="primary">
                Submit
            </Button>
        </StandaloneLayout>
    );
};

export default GenerateResetLink;
