import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AddInvoiceButton from './AddInvoiceButton';
import InvoiceTableBody from './InvoiceTableBody';

export interface Invoice {
    id: number;
    user_id: string;
    invoice_date: string;
    total_amount: number;
    created_at: string;
    status: string;
    customer_name: string;
}

const Dashboard = async () => {
    console.log('This is rendered on the server');
    return (
        <div>
            <div className='flex justify-between mb-4'>
                <h1 className='text-2xl font-extrabold'>Dashboard</h1>
                <AddInvoiceButton />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'>Invoice ID</TableHead>
                        <TableHead>Invoice Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead className='text-right'>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <InvoiceTableBody />
            </Table>
        </div>
    );
};
export default Dashboard;
