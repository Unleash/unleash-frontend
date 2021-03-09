import React from 'react';

import { MenuItem } from '@material-ui/core';
import { MenuItemWithIcon } from '../../common';
import DropdownMenu from '../../common/dropdown-menu';
import ProjectMenu from './project-container';

const sortingOptions = [
    { type: 'name', displayName: 'Name' },
    { type: 'type', displayName: 'Type' },
    { type: 'enabled', displayName: 'Enabled' },
    { type: 'stale', displayName: 'Stale' },
    { type: 'created', displayName: 'Created' },
    { type: 'Last seen', displayName: 'Last seen' },
    { type: 'strategies', displayName: 'Strategies' },
    { type: 'metrics', displayName: 'Metrics' },
];

import styles from './list.module.scss';

const ListComponentHeader = ({ settings, setSort, toggleMetrics, updateSetting }) => {
    const handleSort = e => {
        const target = e.target.getAttribute('data-target');
        setSort(target);
    };

    const renderSortingOptions = () =>
        sortingOptions.map(option => (
            <MenuItem key={option.type} disabled={isDisabled(option.type)} data-target={option.type}>
                {option.displayName}
            </MenuItem>
        ));

    const renderMetricsOptions = () => [
        <MenuItemWithIcon
            icon="hourglass_empty"
            disabled={!settings.showLastHour}
            data-target="minute"
            label="Last minute"
            key={1}
        />,
        <MenuItemWithIcon
            icon="hourglass_full"
            disabled={settings.showLastHour}
            data-target="hour"
            label="Last hour"
            key={2}
        />,
    ];

    const isDisabled = type => settings.sort === type;

    return (
        <div className={styles.listComponentHeader}>
            <DropdownMenu
                id={'metric'}
                label={`Last ${settings.showLastHour ? 'hour' : 'minute'}`}
                title="Metric interval"
                callback={toggleMetrics}
                renderOptions={renderMetricsOptions}
            />
            <DropdownMenu
                id={'sorting'}
                label={`By ${settings.sort}`}
                callback={handleSort}
                renderOptions={renderSortingOptions}
                title="Sort by"
            />
            <ProjectMenu settings={settings} updateSetting={updateSetting} />
        </div>
    );
};

export default ListComponentHeader;
