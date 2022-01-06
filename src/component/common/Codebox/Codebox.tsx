import useToast from '../../../hooks/useToast';
import { useStyles } from './Codebox.styles';
import copy from 'copy-to-clipboard';
import { IconButton } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import ConditionallyRender from '../ConditionallyRender';

interface ICodeboxProps {
    text: string;
    color?: string;
    bgColor?: string;
    copyCode?: boolean;
}

const Codebox = ({ text, color, bgColor, copyCode = false }: ICodeboxProps) => {
    const styles = useStyles();
    const { setToastData } = useToast();

    const copyCommand = () => {
        if (copy(text)) {
            setToastData({
                title: 'Successfully copied code example',
                text: 'The command should now be automatically copied to your clipboard',
                type: 'success',
            });
        } else {
            setToastData({
                title: 'Could not copy the code',
                text: 'Sorry, but we could not copy the command.',
                type: 'error',
            });
        }
    };

    return (
        <div className={styles.container} style={{ backgroundColor: bgColor }}>
            <pre className={styles.code} style={{ color: color }}>
                {text}
            </pre>
            <ConditionallyRender
                condition={copyCode}
                show={
                    <IconButton
                        className={styles.iconButton}
                        onClick={copyCommand}
                    >
                        <FileCopy className={styles.icon} />
                    </IconButton>
                }
            />
        </div>
    );
};

export default Codebox;
