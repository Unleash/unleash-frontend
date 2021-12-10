import { IconButton } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import copy from 'copy-to-clipboard';
import { useStyles } from './Codebox.styles';

interface ICodeboxProps {
    text: string;
}

const Codebox = ({ text }: ICodeboxProps) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <code className={styles.code}>{text}</code>
        </div>
    );
};

export default Codebox;
