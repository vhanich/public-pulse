import {Link, useSearchParams} from "react-router-dom";
import React, {useState} from "react";
import PasswordInput from "../components/PasswordInput";
import ResetPassword from "../assets/images/reset-password.png";
import { confirmResetPassword } from "../firebase/authMethods";

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const oobCode = searchParams.get('oobCode');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords don\'t match');
            setError("Passwords don't match");
            return;
        }
        setError('');
        await ConfirmResetPassword(oobCode, newPassword);
    }


    return (
    <div className='flex bg-gradient-to-b from-blue-300 to-white items-center justify-center min-h-screen p-4'>
        <div className='w-full overflow-hidden'>
            <div className='flex flex-col sm:flex-row sm:mx-10 sm:my-6 '>
                <div className='hidden sm:flex sm:flex-col sm:items-center sm:justify-center sm:p-8 sm:ml-6 sm:w-1/2 '>
                    <div className="md:w-1/2 flex justify-center">
                        <img src={ResetPassword}
                             alt='News'
                             className="w-full max-w-sm h-auto object-contain"
                        />
                    </div>
                    <div className='mt-6 space-y-2'>
                        <h3 className=' font-inter-tight font-semibold text-3xl'>
                            Don't worry!
                        </h3>
                        <p className='font-inter-tight font-medium text-xl '>We will help you get back on track. </p>
                    </div>
                </div>

                <div className='flex flex-col justify-center sm:w-1/3 py-5  p-6 md:p-8 lg:p-12  rounded-3xl bg-white md:shadow-lg'>

                    <div className='flex flex-col justify-center space-y-2 md:space-y-3  mt-2 md:mt-4'>
                        <h2 className='font-inter-tight font-semibold text-3xl text-center text-black md:text-left'>
                            Change Password
                        </h2>
                        <p className='text'>Enter a new password below to change your password.</p>
                        <label htmlFor='password' className='form-label'>New Password</label>
                        <PasswordInput
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <label htmlFor='confirm' className='form-label'>Repeat Password</label>
                        <PasswordInput
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={() => handleReset()}
                            className=' w-full mt-6 p-2 border border-blue-600 bg-blue-600 text-white rounded-md font-inter-tight font-semibold hover:bg-white hover:text-blue-600'>Confirm Reset Password
                    </button>
                    <Link to='/signin' className=' mt-4 font-inter-tight text-center text-blue-600 font-semibold'>Back to Login </Link>
                </div>
            </div>
        </div>
    </div>
)
}