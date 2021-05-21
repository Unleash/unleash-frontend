import { Typography } from '@material-ui/core';
import { useStyles } from './DividerText.styles';

interface IDividerTextProps {
    text: string;
}

const DividerText = ({ text }: IDividerTextProps) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <span className={styles.wing} />
            <Typography variant="body2" className={styles.text}>
                {text}
            </Typography>
            <span className={styles.wing} />
        </div>
    );
};

export default DividerText;
