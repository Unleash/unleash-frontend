import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';

import CreateStrategyCard from './CreateStrategyCard/CreateStrategyCard';
import { useStyles } from './CreateStrategy.styles';

const CreateStrategy = ({ strategies }) => {
    const styles = useStyles();
    const renderCreateStrategyCards = () =>
        strategies.map(strategy => <CreateStrategyCard strategy={strategy} key={strategy.name} />);

    return (
        <Dialog open aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
            <DialogTitle id="form-dialog-title">Create a new strategy</DialogTitle>
            <DialogContent className={styles.createStrategyCardContainer}>{renderCreateStrategyCards()}</DialogContent>
            <DialogActions>
                <Button color="secondary">Cancel</Button>
                <Button color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CreateStrategy.propTypes = {
    strategy: PropTypes.object.isRequired,
    updateStrategy: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    saveStrategy: PropTypes.func.isRequired,
    strategyDefinition: PropTypes.object.isRequired,
    context: PropTypes.array, // TODO: fix me
};

export default CreateStrategy;
