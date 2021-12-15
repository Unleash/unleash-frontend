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
