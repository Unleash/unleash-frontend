import { useEffect, useState } from 'react';
import { Button, IconButton } from '@material-ui/core';
import classnames from 'classnames';
import CloseIcon from '@material-ui/icons/Close';

import { ReactComponent as Logo } from '../../../assets/icons/logo-plain.svg';
import { useCommonStyles } from '../../../common.styles';
import { useStyles } from './Feedback.styles';
import AnimateOnMount from '../AnimateOnMount/AnimateOnMount';
import ConditionallyRender from '../ConditionallyRender';
import { formatApiPath } from '../../../utils/format-path';

const Feedback = () => {
    const [show, setShow] = useState(true);
    const [answeredNotNow, setAnsweredNotNow] = useState(false);
    const styles = useStyles();
    const commonStyles = useCommonStyles();

    useEffect(() => {
        // Perform show logic
    }, []);

    const onConfirm = async () => {
        const feedbackId = 'pnps';
        const openUrl = 'https://getunleash.ai/pnps';
        const url = formatApiPath('api/admin/feedback');

        try {
            await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedbackId }),
            });
        } catch {
            setShow(false);
        }

        // Await api call to register confirmation
        window.open(openUrl, '_blank');
        setTimeout(() => {
            setShow(false);
        }, 200);
    };

    const onDontShowAgain = async () => {
        const feedbackId = 'pnps';
        const url = formatApiPath(
            `api/admin/feedback/${encodeURIComponent(feedbackId)}`
        );

        try {
            await fetch(url, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedbackId, neverShow: true }),
            });
        } catch {
            setShow(false);
        }

        setTimeout(() => {
            setShow(false);
        }, 100);
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
                                <Button
                                    variant="outlined"
                                    onClick={onDontShowAgain}
                                >
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
