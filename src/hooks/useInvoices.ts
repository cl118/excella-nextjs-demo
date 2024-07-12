import { Invoice } from '@/app/(logged-in)/dashboard/page';
import { fetcher } from '@/lib/utils';
import useSWR from 'swr';

export default function useInvoices() {
    const { data, error, mutate, isLoading, isValidating } = useSWR('/api/db/invoices', fetcher);

    return {
        invoices: data as Invoice[],
        isLoading,
        isValidating,
        error,
        mutate,
    };
}
