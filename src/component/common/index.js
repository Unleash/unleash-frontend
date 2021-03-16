import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, MenuItem, Icon, ListItem, ListItemText, ListItemAvatar, Button, Avatar } from '@material-ui/core';
import styles from './common.module.scss';
import ConditionallyRender from './conditionally-render';

export { styles };

export const shorten = (str, len = 50) => (str && str.length > len ? `${str.substring(0, len)}...` : str);
export const AppsLinkList = ({ apps }) => (
    <List>
        <ConditionallyRender
            condition={apps.length > 0}
            show={apps.map(({ appName, description, icon }) => (
                <ListItem key={appName}>
                    <ListItemAvatar>
                        <Avatar>
                            <ConditionallyRender
                                key={`avatar_conditional_${appName}`}
                                condition={icon}
                                show={<Icon>{icon}</Icon>}
                                elseShow={<Icon>apps</Icon>}
                            />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Link
                                to={`/applications/${appName}`}
                                className={[styles.listLink, styles.truncate].join(' ')}
                            >
                                {appName}
                            </Link>
                        }
                        secondary={description || 'No description'}
                    />
                </ListItem>
            ))}
        />
    </List>
);
AppsLinkList.propTypes = {
    apps: PropTypes.array.isRequired,
};
export const HeaderTitle = ({ title, actions, subtitle }) => (
    <div
        style={{
            display: 'flex',
            borderBottom: '1px solid #f9f9f9',
            marginBottom: '10px',
            padding: '16px',
            alignItems: 'center',
        }}
    >
        <div style={{ flex: '2' }}>
            <h6 className={styles.headerTitle}>{title}</h6>
            {subtitle && <small>{subtitle}</small>}
        </div>

        {actions && <div style={{ flex: '1', textAlign: 'right' }}>{actions}</div>}
    </div>
);
HeaderTitle.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    actions: PropTypes.any,
};

export const DataTableHeader = ({ title, actions }) => (
    <div className={styles.dataTableHeader}>
        <div className={styles.title}>
            <h2 className={styles.titleText}>{title}</h2>
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
    </div>
);
DataTableHeader.propTypes = {
    title: PropTypes.string,
    actions: PropTypes.any,
};

export const FormButtons = ({ submitText = 'Create', onCancel, primaryButtonTestId }) => (
    <div>
        <Button
            data-test={primaryButtonTestId}
            type="submit"
            color="primary"
            variant="contained"
            startIcon={<Icon>add</Icon>}
        >
            {submitText}
        </Button>
        &nbsp;
        <Button type="cancel" onClick={onCancel}>
            Cancel
        </Button>
    </div>
);
FormButtons.propTypes = {
    submitText: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
};

export function getIcon(type) {
    switch (type) {
        case 'feature-updated':
            return 'autorenew';
        case 'feature-created':
            return 'add';
        case 'feature-deleted':
            return 'remove';
        case 'feature-archived':
            return 'archived';
        default:
            return 'star';
    }
}

export const IconLink = ({ url, icon }) => (
    <a href={url} target="_blank" rel="noopener" className="mdl-color-text--grey-600">
        <Icon name={icon} />
    </a>
);
IconLink.propTypes = {
    url: PropTypes.string,
    icon: PropTypes.string,
};

export const DropdownButton = ({ label, id, className = styles.dropdownButton, title, icon, style, ...rest }) => (
    <Button id={id} className={className} title={title} style={style} {...rest} endIcon={<Icon>{icon}</Icon>}>
        {label}
    </Button>
);
DropdownButton.propTypes = {
    label: PropTypes.string,
    style: PropTypes.object,
    id: PropTypes.string,
    title: PropTypes.string,
};

export const MenuItemWithIcon = ({ icon, label, disabled, ...menuItemProps }) => (
    <MenuItem disabled={disabled} style={{ display: 'flex', alignItems: 'center' }} {...menuItemProps}>
        <Icon name={icon} style={{ paddingRight: '16px' }} />
        {label}
    </MenuItem>
);
MenuItemWithIcon.propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const badNumbers = [NaN, Infinity, -Infinity];
export function calc(value, total, decimal) {
    if (typeof value !== 'number' || typeof total !== 'number' || typeof decimal !== 'number') {
        return null;
    }

    if (total === 0) {
        return 0;
    }

    badNumbers.forEach(number => {
        if ([value, total, decimal].indexOf(number) > -1) {
            return number;
        }
    });

    return ((value / total) * 100).toFixed(decimal);
}
export function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const selectStyles = {
    control: provided => ({
        ...provided,
        border: '1px solid #607d8b',
        boxShadow: '0',
        ':hover': {
            borderColor: '#607d8b',
            boxShadow: '0 0 0 1px #607d8b',
        },
    }),
};
