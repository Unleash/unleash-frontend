import { useStyles } from './ConfirmScreen.styles';
import classnames from 'classnames';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CheckMarkBadge from '../../CheckmarkBadge/CheckMarkBadge';
import UIContext from '../../../../contexts/UIContext';
import ConditionallyRender from '../../ConditionallyRender';

interface IConfirmScreen {
    title: string;
    text?: string;
}

const ConfirmScreen = ({ title, text }: IConfirmScreen) => {
    const { setUpdatedResource } = useContext(UIContext);

    const styles = useStyles();
    const confettiColors = ['#d13447', '#ffbf00', '#263672'];
    const confettiAmount = 200;

    const getRandomNumber = (input: number) => {
        return Math.floor(Math.random() * input) + 1;
    };

    const renderConfetti = () => {
        const elements = new Array(confettiAmount).fill(1);

        const styledElements = elements.map((el, index) => {
            const width = getRandomNumber(8);
            const length = getRandomNumber(100);

            const style = {
                position: 'absolute',
                width: `${width}px`,
                height: `${width * 0.4}px`,
                backgroundColor: confettiColors[getRandomNumber(2)],
                left: `${length}%`,
                transform: `rotate(${getRandomNumber(101)}deg)`,
                animationDelay: `${getRandomNumber(7)}s`,
                animationDuration: `${getRandomNumber(7)}s`,
                animationEase: `${getRandomNumber(5)}s`,
            };

            return (
                <div
                    style={style}
                    className={classnames(styles.starting, styles.anim)}
                />
            );
        });

        return styledElements;
    };

    const hide = () => {
        setUpdatedResource(prev => ({ ...prev, show: false }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.confettiContainer}>
                {renderConfetti()}
                <div className={styles.createdContainer}>
                    <div className={styles.headerContainer}>
                        <CheckMarkBadge />

                        <h3 className={styles.headerStyles}>{title}</h3>
                    </div>

                    <ConditionallyRender
                        condition={Boolean(text)}
                        show={<p className={styles.paragraph}>{text}</p>}
                    />

                    <Button
                        type="contained"
                        color="primary"
                        onClick={hide}
                        className={styles.buttonStyle}
                    >
                        Hide
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmScreen;
