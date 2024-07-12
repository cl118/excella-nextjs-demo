import Link from 'next/link';
import { FC } from 'react';

interface Props {
    children: React.ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
    return (
        <div className='flex flex-col'>
            <div className='h-12 border-b-2 border-b-slate-500 px-8 flex justify-between items-center'>
                <Link href='/'>Excella Demo</Link>
                <div>
                    <form action='/logout' method='POST'>
                        <button>Logout</button>
                    </form>
                </div>
            </div>
            <div className='px-8 py-6'>{children}</div>
        </div>
    );
};
export default DashboardLayout;
