import { ReactNode, VFC } from 'react';
import { Button, ButtonProps, Icon } from '@material-ui/core';

interface IDropdownButtonProps {
    label: string;
    id?: string;
    title?: ButtonProps['title'];
    className?: string;
    icon?: ReactNode;
    startIcon?: ButtonProps['startIcon'];
    style?: ButtonProps['style'];
    onClick: ButtonProps['onClick'];
}

export const DropdownButton: VFC<IDropdownButtonProps> = ({
    label,
    id,
    title,
    icon,
    startIcon,
    style,
    ...rest
}) => (
    <Button
        id={id}
        title={title}
        style={style}
        {...rest}
        startIcon={startIcon} // TODO: unify
        endIcon={<Icon>{icon}</Icon>}
    >
        {label}
    </Button>
);
