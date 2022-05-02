import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    header: {
        fontSize: theme.fontSizes.bodySize,
        fontWeight: 'normal',
        marginTop: '1rem',
        marginBottom: '0.25rem',
    },
}));

export const ConstraintFormHeader: React.FC<
    React.HTMLAttributes<HTMLDivElement>
> = ({ children, ...rest }) => {
    const styles = useStyles();
    return (
        <h3 {...rest} className={styles.header}>
            {children}
        </h3>
    );
};
