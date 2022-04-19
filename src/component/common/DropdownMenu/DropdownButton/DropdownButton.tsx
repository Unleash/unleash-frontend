import { VFC } from 'react';
import { Button, ButtonProps, Icon } from '@material-ui/core';

// DropdownButton.propTypes = { // FIXME: cleanup
//     label: PropTypes.string,
//     style: PropTypes.object,
//     id: PropTypes.string,
//     title: PropTypes.string,
//     icon: PropTypes.object,
//     startIcon: PropTypes.object,
// };

// .dropdownButton {
//     font-weight: normal;
// }

interface IDropdownButtonProps {
    label: string;
    id?: string;
    title?: ButtonProps['title'];
    // icon?: ButtonProps['icon']; // FIXME: icon
    icon?: any;
    startIcon?: ButtonProps['startIcon'];
    style?: ButtonProps['style'];
    onClick: ButtonProps['onClick'];
}

export const DropdownButton: VFC<IDropdownButtonProps> = ({
    label,
    id,
    // className = styles.dropdownButton,
    title,
    icon,
    startIcon,
    style,
    ...rest
}) => (
    <Button
        id={id}
        // className={className}
        title={title}
        style={style}
        {...rest}
        startIcon={startIcon} // TODO: unify
        endIcon={<Icon>{icon}</Icon>}
    >
        {label}
    </Button>
);
