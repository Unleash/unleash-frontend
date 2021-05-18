import { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from '@material-ui/core';
import OpenInNew from '@material-ui/icons/OpenInNew';
import { formatDateWithLocale } from '../../../component/common/util';
import PageContent from '../../../component/common/PageContent';
import HeaderTitle from '../../../component/common/HeaderTitle';
import ConditionallyRender from '../../../component/common/ConditionallyRender';
import { formatApiPath } from '../../../utils/format-path';

const PORTAL_URL = formatApiPath('api/admin/invoices/portal');

function InvoiceList({
    location,
    fetchInvoices,
    invoices,
}) {

    useEffect(() => {
        fetchInvoices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageContent headerContent={<HeaderTitle title="Invoices" actions={
            <ConditionallyRender condition={invoices.length > 0} 
                    show={
                    <Button href={PORTAL_URL} rel="noreferrer" target="_blank" endIcon={<OpenInNew />}>
                        Billing portal
                    </Button>}>
                </ConditionallyRender>
        }/>} >
            <div>
                
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Due date</TableCell>
                            <TableCell>PDF</TableCell>
                            <TableCell>Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map(item => (
                            <TableRow key={item.invoiceURL} style={{backgroundColor: item.status === 'past-due' ? '#ff9194' : 'inherit'}}>
                                <TableCell style={{ textAlign: 'left' }}>
                                    {item.amountFomratted}
                                </TableCell>
                                <TableCell style={{ textAlign: 'left' }}>
                                    {item.status}
                                </TableCell>
                                <TableCell style={{ textAlign: 'left' }}>
                                {formatDateWithLocale(
                                        item.dueDate,
                                        location.locale
                                    )}
                                </TableCell>
                                <TableCell style={{ textAlign: 'left' }}>
                                    <a href={item.invoicePDF}>PDF</a>
                                </TableCell>
                                <TableCell style={{ textAlign: 'left' }}>
                                    <a href={item.invoiceURL} target="_blank" rel="noreferrer">Payment link</a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </PageContent>
    );
}

InvoiceList.propTypes = {
    location: PropTypes.object,
    fetchInvoices: PropTypes.func.isRequired,
    invoices: PropTypes.array.isRequired,
};

export default InvoiceList;
