import { Tooltip } from '@material-ui/core';

interface IStringTruncatorProps {
    text: string;
    maxWidth: string;
}

const StringTruncator = ({ text, maxWidth }: IStringTruncatorProps) => {
    return (
        <Tooltip title={text} arrow>
            <span
                data-loading
                style={{
                    width: `${maxWidth}px`,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                }}
            >
                {text}
            </span>
        </Tooltip>
    );
};

export default StringTruncator;
