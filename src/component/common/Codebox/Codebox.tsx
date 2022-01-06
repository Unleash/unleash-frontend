import { useStyles } from './Codebox.styles';

interface ICodeboxProps {
    text: string;
    color?: string;
    bgColor?: string;
    copy?: boolean;
}

const Codebox = ({ text, color, bgColor, copy = false }: ICodeboxProps) => {
    const styles = useStyles();
    return (
        <div className={styles.container} style={{backgroundColor: bgColor}}>
            <pre className={styles.code} style={{color: color}}>{text}</pre>
        </div>
    );
};

export default Codebox;
