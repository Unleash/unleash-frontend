import { Typography } from '@material-ui/core';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import ConditionallyRender from '../../../../common/ConditionallyRender';
import { useStyles } from './PasswordChecker.styles';
import { debounce } from 'debounce';
import useLoading from '../../../../../hooks/useLoading';

interface IPasswordCheckerProps {
    password: string;
}

interface IErrorResponse {
    details: IErrorDetails[];
}

interface IErrorDetails {
    message: string;
    validationErrors: string[];
}

const BAD_REQUEST = 400;
const OK = 200;
const LENGTH_ERROR = 'The password must be at least 10 characters long.';
const NUMBER_ERROR = 'The password must contain at least one number.';
const SYMBOL_ERROR =
    'The password must contain at least one special character.';
const UPPERCASE_ERROR =
    'The password must contain at least one uppercase letter';
const LOWERCASE_ERROR =
    'The password must contain at least one lowercase letter.';

const PasswordChecker = ({ password }: IPasswordCheckerProps) => {
    const styles = useStyles();
    const [casingError, setCasingError] = useState(true);
    const [numberError, setNumberError] = useState(true);
    const [symbolError, setSymbolError] = useState(true);
    const [lengthError, setLengthError] = useState(true);

    useEffect(() => {
        checkPassword();
    }, [password]);

    const checkPassword = async () => {
        try {
            const res = await fetch('auth/reset/validate-password', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ password }),
            });

            if (res.status === BAD_REQUEST) {
                const data = await res.json();
                console.log(data);
                handleErrorResponse(data);
            }

            if (res.status === OK) {
                clearErrors();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const clearErrors = () => {
        setCasingError(false);
        setNumberError(false);
        setSymbolError(false);
        setLengthError(false);
    };

    const handleErrorResponse = (data: IErrorResponse) => {
        const errors = data.details[0].validationErrors;

        if (errors.includes(NUMBER_ERROR)) {
            setNumberError(true);
        } else {
            setNumberError(false);
        }

        if (errors.includes(SYMBOL_ERROR)) {
            setSymbolError(true);
        } else {
            setSymbolError(false);
        }

        if (errors.includes(LENGTH_ERROR)) {
            setLengthError(true);
        } else {
            setLengthError(false);
        }

        if (
            errors.includes(LOWERCASE_ERROR) ||
            errors.includes(UPPERCASE_ERROR)
        ) {
            setCasingError(true);
        } else {
            setCasingError(false);
        }
    };

    const lengthStatusBarClasses = classnames(styles.statusBar, {
        [styles.statusBarSuccess]: !lengthError,
    });

    const numberStatusBarClasses = classnames(styles.statusBar, {
        [styles.statusBarSuccess]: !numberError,
    });

    const symbolStatusBarClasses = classnames(styles.statusBar, {
        [styles.statusBarSuccess]: !symbolError,
    });

    const casingStatusBarClasses = classnames(styles.statusBar, {
        [styles.statusBarSuccess]: !casingError,
    });

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.checkContainer}>
                    <Typography variant="body2" data-loading>
                        Length
                    </Typography>
                </div>
                <div className={styles.checkContainer}>
                    <Typography variant="body2" data-loading>
                        Casing
                    </Typography>
                </div>
                <div className={styles.checkContainer}>
                    <Typography variant="body2" data-loading>
                        Number
                    </Typography>
                </div>
                <div className={styles.checkContainer}>
                    <Typography variant="body2" data-loading>
                        Symbol
                    </Typography>
                </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.statusBarContainer}>
                <div className={styles.checkContainer}>
                    <div className={lengthStatusBarClasses} data-loading />
                </div>
                <div className={styles.checkContainer}>
                    <div className={casingStatusBarClasses} data-loading />
                </div>{' '}
                <div className={styles.checkContainer}>
                    <div className={numberStatusBarClasses} data-loading />
                </div>
                <div className={styles.checkContainer}>
                    <div className={symbolStatusBarClasses} data-loading />
                </div>
            </div>
        </div>
    );
};

export default PasswordChecker;
