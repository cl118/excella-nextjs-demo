import { createClient } from '@/utils/supabase/server';
import { FC } from 'react';

export const dynamic = 'force-dynamic';

interface Props {
    params: { id: string };
}

const InvoicePage: FC<Props> = async ({ params }) => {
    const supabase = createClient();
    const { data } = await supabase.from('invoices').select('*').eq('id', params.id);

    return (
        <div>
            <ul>
                {data && data.length > 0
                    ? Object.entries(data[0]).map(([key, value], i) => {
                          return <li key={i}>{`${key}: ${value}`}</li>;
                      })
                    : 'No data returned.'}
            </ul>
        </div>
    );
};
export default InvoicePage;
