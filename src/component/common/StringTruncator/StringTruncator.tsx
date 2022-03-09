import { Tooltip } from '@material-ui/core';
import { useCallback } from 'react';
import ConditionallyRender from '../ConditionallyRender';

interface IStringTruncatorProps {
    text: string;
    maxWidth: string;
    className?: string;
}

const StringTruncator = ({
    text,
    maxWidth,
    className,
    ...rest
}: IStringTruncatorProps) => {
    const calculateOverflowGenerator = useCallback(() => {
        let calculated = false;
        let clientWidth = 0;
        let result = false;

        return (): boolean => {
            if (!calculated) {
                const element = document.createElement('p');
                element.innerHTML = text;
                element.style.position = 'absolute';
                element.style.left = '-10000px';

                document.body.appendChild(element);
                clientWidth = element.clientWidth;
                document.body.removeChild(element);
                calculated = true;
                result = Number(maxWidth) <= clientWidth;
            }
            return result;
        };
    }, [text, maxWidth]);

    const overflow = calculateOverflowGenerator();

    return (
        <ConditionallyRender
            condition={overflow()}
            show={
                <Tooltip title={text} arrow>
                    <span
                        data-loading
                        className={className}
                        style={{
                            maxWidth: `${maxWidth}px`,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            display: 'inline-block',
                        }}
                        {...rest}
                    >
                        {text}
                    </span>
                </Tooltip>
            }
            elseShow={<>{text}</>}
        />
    );
};

export default StringTruncator;
