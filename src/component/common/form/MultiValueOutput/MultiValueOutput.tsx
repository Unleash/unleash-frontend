import { Chip } from '@mui/material';
import StringTruncator from 'component/common/StringTruncator/StringTruncator';
import { makeStyles } from 'tss-react/mui';

interface IConstraintValueChipsProps {
    values: string[];
    removeValue: (index: number) => void;
}

const useStyles = makeStyles()(theme => ({
    valueChip: {
        margin: '0 0.5rem 0.5rem 0',
    },
    chipValue: {
        whiteSpace: 'pre',
    },
    valuesContainer: { marginTop: '1rem' },
}));

interface IMultiValueOutputProps {
    removeValue: (index: number) => void;
    values: string[];
}

export const MultiValueOutput = ({
    removeValue,
    values,
}: IMultiValueOutputProps) => {
    const { classes: styles } = useStyles();
    return (
        <div className={styles.valuesContainer}>
            <ConstraintValueChips values={values} removeValue={removeValue} />
        </div>
    );
};

const ConstraintValueChips = ({
    values,
    removeValue,
}: IConstraintValueChipsProps) => {
    const { classes: styles } = useStyles();
    return (
        <>
            {values.map((value, index) => {
                // Key is not ideal, but we don't have anything guaranteed to
                // be unique here.
                return (
                    <Chip
                        label={
                            <StringTruncator
                                text={value}
                                maxLength={35}
                                maxWidth="100"
                                className={styles.chipValue}
                            />
                        }
                        key={`${value}-${index}`}
                        onDelete={() => removeValue(index)}
                        className={styles.valueChip}
                    />
                );
            })}
        </>
    );
};
