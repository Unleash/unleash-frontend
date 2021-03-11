import React from 'react';
import PropTypes from 'prop-types';

import { Snackbar, Icon } from '@material-ui/core';

const ErrorComponent = ({ errors, ...props }) => {
    const showError = errors.length > 0;
    const error = showError ? errors[0] : undefined;
    const muteError = () => props.muteError(error);
    return (
        <Snackbar
            action="Dismiss"
            open={showError}
            onActionClick={muteError}
            onTimeout={muteError}
            autoHideDuration={10000}
            message={
                <div>
                    <Icon>question_answer</Icon>
                    {error}
                </div>
            }
        />
    );
};

ErrorComponent.propTypes = {
    errors: PropTypes.array.isRequired,
    muteError: PropTypes.func.isRequired,
};

export default ErrorComponent;
