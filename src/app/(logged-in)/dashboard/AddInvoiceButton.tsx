'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddInvoiceModal from './AddInvoiceModal';
import { useState } from 'react';

const AddInvoiceButton = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button>+ Invoice</Button>
            </DialogTrigger>
            <AddInvoiceModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </Dialog>
    );
};
export default AddInvoiceButton;
