'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useInvoices from '@/hooks/useInvoices';
import { cn } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format, parseISO } from 'date-fns';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Invoice } from './page';

const addInvoiceDefaultValues = {
    invoice_date: '',
    total_amount: '',
    status: '',
    customer_name: '',
};

const addInvoiceSchema = Yup.object().shape({
    invoice_date: Yup.string().required('Invoice date is required'),
    total_amount: Yup.string().required('Total amount is required'),
    status: Yup.string().required('Status is required'),
    customer_name: Yup.string().required('Customer name is required'),
});

interface Props {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
}

const AddInvoiceModal = ({ modalOpen, setModalOpen }: Props) => {
    const form = useForm({ defaultValues: addInvoiceDefaultValues, resolver: yupResolver(addInvoiceSchema) });
    const {
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
        handleSubmit,
        control,
    } = form;
    const { invoices, mutate } = useInvoices();

    const formData = watch();
    // console.log(formData);

    useEffect(() => {
        reset();
    }, [modalOpen, reset]);

    const onSubmit = async (values: Yup.InferType<typeof addInvoiceSchema>) => {
        const tempId = Math.floor(Math.random() * 1000000000);
        const newInvoice = {
            id: tempId,
            ...values,
            total_amount: parseFloat(values.total_amount),
        };

        mutate([...invoices, newInvoice], false);

        try {
            const res = await fetch('/api/db/invoices', { body: JSON.stringify(values), method: 'POST', headers: { 'Content-Type': 'application/json' } });

            if (!res.ok) {
                throw new Error('An error occurred while adding the invoice.');
            }

            mutate((currentInvoices: Invoice[]) => currentInvoices.map((invoice) => (invoice.id === tempId ? newInvoice : invoice)), true);

            setModalOpen(false);
        } catch (error) {
            console.error('Error adding event:', error);
            // Revert optimistic update if error
            mutate(invoices.filter((invoice) => invoice.id !== tempId));
        }
    };

    const onSubmitError = () => {
        console.log(errors);
    };

    const handleBlur = (value: string): void => {
        const parsedValue = parseFloat(value);

        if (!isNaN(parsedValue)) {
            setValue('total_amount', parsedValue.toFixed(2), { shouldValidate: true });
        }
    };

    return (
        <DialogContent
            onInteractOutside={(e) => {
                e.preventDefault();
            }}
            className='w-full'
        >
            <DialogHeader>
                <DialogTitle>Add Invoice</DialogTitle>
            </DialogHeader>
            <DialogDescription>Fill in the form below to add a new invoice.</DialogDescription>

            <Form {...form}>
                <form className='flex flex-col pt-4 w-full gap-y-4' onSubmit={handleSubmit(onSubmit, onSubmitError)}>
                    <FormField
                        control={control}
                        name='invoice_date'
                        render={({ field }) => (
                            <FormItem className='flex flex-col w-full'>
                                <FormLabel>Invoice Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant={'outline'} className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                                {field.value ? format(parseISO(field.value), 'PPP') : <span>Pick a date</span>}
                                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-auto p-0' align='start'>
                                        <Calendar
                                            mode='single'
                                            selected={field.value ? parseISO(field.value) : undefined}
                                            onSelect={(date) => {
                                                if (date) {
                                                    field.onChange(format(date, 'yyyy-MM-dd'));
                                                } else {
                                                    field.onChange('');
                                                }
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name='customer_name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name='total_amount'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='$0.00'
                                        value={field.value ? `$${field.value}` : ''}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9.]/g, '');
                                            const parts = value.split('.');
                                            if (parts.length <= 2) {
                                                field.onChange(value);
                                            }
                                        }}
                                        onBlur={() => handleBlur(field.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select a status' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='Pending'>Pending</SelectItem>
                                        <SelectItem value='Paid'>Paid</SelectItem>
                                        <SelectItem value='Overdue'>Overdue</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-end gap-x-4 mt-8'>
                        <Button variant='outline' type='button' onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type='submit' disabled={isSubmitting}>
                            Add Invoice
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    );
};
export default AddInvoiceModal;
