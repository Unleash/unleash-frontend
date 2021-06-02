import { useEffect, useState } from 'react';
import { Button, IconButton } from '@material-ui/core';
import classnames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';

import { ReactComponent as Logo } from '../../../assets/icons/logo-plain.svg';
import { useCommonStyles } from '../../../common.styles';
import { useStyles } from './Feedback.styles';
import AnimateOnMount from '../AnimateOnMount/AnimateOnMount';
import ConditionallyRender from '../ConditionallyRender';

const Feedback = () => {
    const [show, setShow] = useState(true);
    const [answeredNotNow, setAnsweredNotNow] = useState(false);
    const styles = useStyles();
    const commonStyles = useCommonStyles();

    useEffect(() => {
        // Perform show logic
    }, []);

    const onConfirm = async () => {
        // Await api call to register confirmation
        window.open('https://getunleash.ai', '_blank');
        setTimeout(() => {
            setShow(false);
        }, 200);
    };

    const onNeverAgain = async () => {
        // Await api call to register never again
    };

    return (
        <AnimateOnMount
            mounted={show}
            enter={styles.feedbackEnter}
            start={styles.feedbackStart}
            leave={styles.feedbackLeave}
            container={styles.animateContainer}
        >
            <div className={styles.feedback}>
                <div
                    className={classnames(
                        styles.container,
                        commonStyles.contentSpacingY
                    )}
                >
                    <IconButton
                        className={styles.close}
                        onClick={() => setShow(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Logo className={styles.logo} />
                    <ConditionallyRender
                        condition={answeredNotNow}
                        show={
                            <p>
                                Alright, apologies for the disruption. Have a
                                nice day!
                            </p>
                        }
                        elseShow={
                            <p>
                                Hi. Do you have 2 minutes to help us improve
                                Unleash?{' '}
                            </p>
                        }
                    />

                    <div>
                        <ConditionallyRender
                            condition={answeredNotNow}
                            show={
                                <Button variant="outlined">
                                    Don't show again
                                </Button>
                            }
                            elseShow={
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={onConfirm}
                                    >
                                        Yes, no problem
                                    </Button>
                                    <Button
                                        className={styles.cancel}
                                        onClick={() => setAnsweredNotNow(true)}
                                    >
                                        Not now
                                    </Button>
                                </>
                            }
                        />
                    </div>
                </div>
            </div>
        </AnimateOnMount>
    );
};

export default Feedback;
