'use client';

import { TableBody, TableCaption, TableCell, TableFooter, TableRow } from '@/components/ui/table';
import useInvoices from '@/hooks/useInvoices';
import { format } from 'date-fns';
import { Invoice } from './page';
import { useRouter } from 'next/navigation';

const sumTotalAmounts = (invoices: Invoice[]): number => {
    return invoices.reduce((accumulator, currentInvoice) => {
        return accumulator + currentInvoice.total_amount;
    }, 0);
};

const InvoiceTableBody = () => {
    const { invoices, isLoading } = useInvoices();
    const router = useRouter();

    console.log('This is rendered on the client');
    return (
        <>
            <TableCaption>{isLoading ? 'Loading...' : invoices && invoices.length > 0 ? 'A list of your recent invoices.' : 'No invoices found. Add an invoice to get started!'}</TableCaption>
            {invoices && invoices.length > 0 && (
                <>
                    <TableBody>
                        {invoices &&
                            invoices.map((invoice) => (
                                <TableRow key={invoice.id} className='cursor-pointer' onClick={() => router.push(`/invoice/${invoice.id}`)}>
                                    <TableCell className='font-medium'>{invoice.id}</TableCell>
                                    <TableCell>{format(invoice.invoice_date, 'P')}</TableCell>
                                    <TableCell>{invoice.status}</TableCell>
                                    <TableCell>{invoice.customer_name}</TableCell>
                                    <TableCell className='text-right'>
                                        {invoice.total_amount.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            minimumFractionDigits: 2,
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} className='text-right'>
                                Total
                            </TableCell>
                            <TableCell className='text-right'>
                                {sumTotalAmounts(invoices as Invoice[]).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2,
                                })}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </>
            )}
        </>
    );
};
export default InvoiceTableBody;
