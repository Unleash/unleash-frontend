import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HistoryItemDiff from './history-item-diff';
import HistoryItemJson from './history-item-json';
import { Card, List, Switch, FormControlLabel } from '@material-ui/core';

import { DataTableHeader } from '../common';
import { formatFullDateTimeWithLocale } from '../common/util';

import styles from './history.module.scss';

const getName = name => {
    if (name) {
        return (
            <React.Fragment>
                <dt>Name: </dt>
                <dd>{name}</dd>
            </React.Fragment>
        );
    } else {
        return null;
    }
};

const HistoryMeta = ({ entry, timeFormatted }) => (
    <div>
        <dl>
            <dt>Changed at:</dt>
            <dd>{timeFormatted}</dd>
            <dt>Changed by: </dt>
            <dd title={entry.createdBy}>{entry.createdBy}</dd>
            <dt>Type: </dt>
            <dd>{entry.type}</dd>
            {getName(entry.data.name)}
        </dl>
        <strong>Change</strong>
        <HistoryItemDiff entry={entry} />
    </div>
);
HistoryMeta.propTypes = {
    entry: PropTypes.object.isRequired,
    timeFormatted: PropTypes.string.isRequired,
};

class HistoryList extends Component {
    static propTypes = {
        title: PropTypes.string,
        history: PropTypes.array,
        settings: PropTypes.object,
        location: PropTypes.object,
        updateSetting: PropTypes.func.isRequired,
        hideName: PropTypes.bool,
    };

    toggleShowDiff() {
        this.props.updateSetting('showData', !this.props.settings.showData);
    }
    formatFulldateTime(v) {
        return formatFullDateTimeWithLocale(v, this.props.location.locale);
    }
    render() {
        const showData = this.props.settings.showData;
        const { history } = this.props;
        if (!history || history.length < 0) {
            return null;
        }

        let entries;

        const renderListItemCards = entry => (
            <Card
                key={entry.id}
                style={{ padding: '1rem', borderTop: '1px solid #f2f2f2', borderBottom: '1px solid #f2f2f2' }}
            >
                <HistoryMeta entry={entry} timeFormatted={this.formatFulldateTime(entry.createdAt)} />
            </Card>
        );

        if (showData) {
            entries = history.map(entry => <HistoryItemJson key={`log${entry.id}`} entry={entry} />);
        } else {
            entries = history.map(renderListItemCards);
        }

        return (
            <div className={styles.history}>
                <DataTableHeader
                    title={this.props.title}
                    actions={
                        <FormControlLabel
                            control={
                                <Switch checked={showData} onChange={this.toggleShowDiff.bind(this)} color="primary" />
                            }
                            label="Full events"
                        />
                    }
                />
                <List>{entries}</List>
                {/* <div className={commonStyles.horisontalScroll}>{entries}</div> */}
            </div>
        );
    }
}
export default HistoryList;
