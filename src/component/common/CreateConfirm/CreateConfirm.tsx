import { useStyles } from './CreateConfirm.styles';
import classnames from 'classnames';
import CheckMarkBadge from '../CheckmarkBadge/CheckMarkBadge';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

interface ICreateConfirm {
    link: string;
    text: string;
}

const CreateConfirm = ({ link, text }: ICreateConfirm) => {
    const history = useHistory();

    // useEffect(() => {
    //     let timeout: NodeJS.Timeout | null = null;
    //     timeout = setTimeout(() => {
    //         history.push(link);
    //     }, 6000);

    //     return () => {
    //         if (timeout) {
    //             clearTimeout(timeout);
    //         }
    //     };
    //     /* eslint-disable-next-line */
    // }, []);

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

    const navigateToRoles = () => {
        history.push('/admin/roles');
    };

    return (
        <div className={styles.container}>
            <div className={styles.confettiContainer}>
                {renderConfetti()}
                <div className={styles.createdContainer}>
                    <CheckMarkBadge />

                    <h3>{text}</h3>
                    <p>
                        You will be redirected to the previous page in 6
                        seconds.
                    </p>
                    <Button
                        color="primary"
                        onClick={navigateToRoles}
                        className={styles.buttonStyle}
                    >
                        Redirect now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateConfirm;
