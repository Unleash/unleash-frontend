import { colors } from '../../../themes/colors';

interface Props {
    context: object;
}

const styles = {
    container: {
        backgroundColor: colors.green['600'],
        borderRadius: '8px',
        width: '100%',
    },
    title: {
        color: colors.green['900'],
    },
    contextField: {
        color: colors.black,
    },
};

export const ContextBanner = ({ context }: Props) => {
    return (
        <div style={styles.container}>
            <p style={styles.title}>
                Your results are generated based on this configuration
            </p>
            <p style={styles.contextField}>
                {Object.entries(context).map(
                    ([key, value]) => `${key}: ${value}\n`
                )}
            </p>
        </div>
    );
};
