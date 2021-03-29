import {
    Typography,
    Card,
    Button,
    CardHeader,
    CardContent
} from "@material-ui/core";
import React from "react";

import { useStyles } from "./CreateStrategyCard.styles";

const CreateStrategyCard = ({ strategy, onClick }) => {
    const styles = useStyles();

    return (
        <Card className={styles.createStrategyCard}>
            <CardHeader title={strategy.name} />
            <CardContent>
                <Typography variant="body2">{strategy.description}</Typography>
            </CardContent>
            <Button style={{ marginTop: "auto" }} onClick={onClick}>
                Configure
            </Button>
        </Card>
    );
};

export default CreateStrategyCard;
