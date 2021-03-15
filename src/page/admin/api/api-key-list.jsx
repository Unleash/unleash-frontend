/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { formatFullDateTimeWithLocale } from '../../../component/common/util';
import CreateApiKey from './api-key-create';
import Secret from './secret';
import ApiHowTo from './api-howto';
import ConditionallyRender from '../../../component/common/conditionally-render';

function ApiKeyList({ location, fetchApiKeys, removeKey, addKey, keys, hasPermission }) {
    const deleteKey = async key => {
        if (confirm('Are you sure?')) {
            await removeKey(key);
        }
    };

    useEffect(() => {
        fetchApiKeys();
    }, []);

    return (
        <div>
            <ApiHowTo />
            <Table className="mdl-data-table mdl-shadow--2dp">
                <TableHead>
                    <TableRow>
                        <TableCell>Created</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Access Type</TableCell>
                        <TableCell>Secret</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {keys.map(item => (
                        <TableRow key={item.secret}>
                            <TableCell style={{ textAlign: 'left' }}>
                                {formatFullDateTimeWithLocale(item.created, location.locale)}
                            </TableCell>
                            <TableCell style={{ textAlign: 'left' }}>{item.username}</TableCell>
                            <TableCell style={{ textAlign: 'left' }}>{item.type}</TableCell>
                            <TableCell style={{ textAlign: 'left' }}>
                                <Secret value={item.secret} />
                            </TableCell>
                            <ConditionallyRender
                                condition={hasPermission('ADMIN')}
                                show={
                                    <TableCell style={{ textAlign: 'right' }}>
                                        <a
                                            href=""
                                            onClick={e => {
                                                e.preventDefault();
                                                deleteKey(item.secret);
                                            }}
                                        >
                                            <Icon>delete</Icon>
                                        </a>
                                    </TableCell>
                                }
                            />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ConditionallyRender condition={hasPermission('ADMIN')} show={<CreateApiKey addKey={addKey} />} />
        </div>
    );
}

ApiKeyList.propTypes = {
    location: PropTypes.object,
    fetchApiKeys: PropTypes.func.isRequired,
    removeKey: PropTypes.func.isRequired,
    addKey: PropTypes.func.isRequired,
    keys: PropTypes.array.isRequired,
    hasPermission: PropTypes.func.isRequired,
};

export default ApiKeyList;
