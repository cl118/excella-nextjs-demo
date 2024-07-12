import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Home() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    return (
        <main className='flex min-h-screen flex-col items-center justify-center'>
            <h1>Excella Next.js Demo</h1>

            {data.user && (
                <div className='text-center mt-8'>
                    <p>User Signed In</p>
                    <p>Email: {data.user.email}</p>
                    <Link href='/dashboard' className='underline'>
                        Dashboard
                    </Link>
                </div>
            )}

            {!data.user ? (
                <Link href='/login' className='border rounded-md border-slate-500 px-8 py-2 mt-8 hover:bg-slate-100'>
                    Log In
                </Link>
            ) : (
                <form action='/logout' method='post'>
                    <button className='border rounded-md border-slate-500 px-8 py-2 mt-8 hover:bg-slate-100' type='submit'>
                        Sign Out
                    </button>
                </form>
            )}
        </main>
    );
}
