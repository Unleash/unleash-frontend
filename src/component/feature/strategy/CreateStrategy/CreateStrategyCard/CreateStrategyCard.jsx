import { Typography, Card, Box, Button, CardHeader, CardContent } from '@material-ui/core';
import React from 'react';

import { useStyles } from './CreateStrategyCard.styles';

const CreateStrategyCard = ({ strategy }) => {
    const styles = useStyles();

    return (
        <Card className={styles.createStrategyCard}>
            <CardHeader title={strategy.name} />
            <Box height="100%">
                <CardContent
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="body2">{strategy.description}</Typography>
                    <Button style={{ marginTop: 'auto' }}>Configure</Button>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CreateStrategyCard;
