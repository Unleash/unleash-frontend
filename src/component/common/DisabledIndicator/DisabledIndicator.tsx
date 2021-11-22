interface IDisabledIndicator {
    className?: string;
}

const DisabledIndicator = ({ className }: IDisabledIndicator) => {
    return (
        <span
            style={{
                padding: '0.2rem',
                borderRadius: '5px',
                marginLeft: '0.5rem',
                backgroundColor: '#000',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 'bold',
            }}
            className={className}
        >
            disabled
        </span>
    );
};

export default DisabledIndicator;
