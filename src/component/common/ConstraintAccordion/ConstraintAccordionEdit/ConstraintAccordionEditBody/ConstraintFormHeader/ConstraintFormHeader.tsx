import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    header: {
        fontSize: theme.fontSizes.bodySize,
        fontWeight: 'normal',
        marginTop: '1rem',
    },
}));

export const ConstraintFormHeader: React.FC = ({ children, ...rest }) => {
    const styles = useStyles();
    return (
        <h3 className={styles.header} {...rest}>
            {children}
        </h3>
    );
};
