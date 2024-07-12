import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = createClient();

    const fetchData = async () => {
        const { data, error } = await supabase.from('invoices').select('*').order('id', { ascending: true });

        if (error) {
            console.log('Error fetching events:');
            console.log(error);
            return error;
        }

        return data;
    };

    const response = await fetchData();

    return NextResponse.json(response);
}

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const supabase = createClient();

        const { data: userData, error: userError } = await supabase.auth.getUser();

        const { customer_name, invoice_date, status, total_amount } = data;

        if (!customer_name || !invoice_date || !status || !total_amount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!userData || userError) {
            return NextResponse.json({ error: 'Error getting user' }, { status: 401 });
        }

        const { data: insertedData, error } = await supabase
            .from('invoices')
            .insert([
                {
                    user_id: userData.user?.id,
                    customer_name,
                    invoice_date,
                    status,
                    total_amount,
                },
            ])
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(insertedData, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
