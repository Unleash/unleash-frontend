import { colors } from 'themes/colors';

interface Props {
    context: object;
}

const styles = {
    container: {
        backgroundColor: colors.green['100'],
        borderRadius: 8,
        width: '100%',
        padding: 16,
        margin: '16px 0',
    },
    title: {
        color: colors.green['700'],
        margin: 16,
    },
    contextField: {
        color: colors.black,
        listStyleType: 'none',
        paddingInlineStart: 16,
    },
};

export const ContextBanner = ({ context }: Props) => {
    return (
        <div style={styles.container}>
            <p style={styles.title}>
                Your results are generated based on this configuration
            </p>
            <ul style={styles.contextField}>
                {Object.entries(context).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                ))}
            </ul>
        </div>
    );
};
