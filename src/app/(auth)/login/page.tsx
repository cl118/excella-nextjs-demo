import { Input } from '@/components/ui/input';
import { login, signup } from './actions';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-slate-50'>
            <form className='flex flex-col border rounded-md border-slate-300 bg-white py-8 px-12'>
                <h1 className='text-2xl font-extrabold text-center mb-6'>Excella Demo</h1>
                <Input id='email' name='email' type='email' placeholder='Email' required />
                <Input id='password' name='password' type='password' placeholder='Password' required className='mt-2' />
                <div className='mt-6 flex flex-col gap-y-2'>
                    <Button formAction={login}>Log In</Button>
                    <Button formAction={signup} variant='outline'>
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
}
