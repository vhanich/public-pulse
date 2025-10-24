import React from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '../assets/images/google.svg';
import AppleIcon from '../assets/images/apple.svg';
import '../index.css';
import PasswordInput from "../components/PasswordInput.jsx";
import NewsIcon from "../assets/images/news.png";


const SignIn = () => {
    return (
        <div className='flex bg-gradient-to-b from-sky-200 to-white items-center justify-center min-h-screen p-4'>
            <div className='w-full overflow-hidden'>
                <div className='flex flex-col sm:flex-row sm:mx-10 sm:my-6 '>
                    <div className='hidden sm:flex sm:flex-col sm:items-center sm:justify-center sm:p-8 sm:ml-6 sm:w-1/2 '>
                        <div className="md:w-1/2 flex justify-center">
                            <img src={NewsIcon}
                                 alt='News'
                                 className="w-full max-w-sm h-auto object-contain"
                            />
                        </div>
                        <div className='mt-6 space-y-2'>
                            <h3 className=' font-inter-tight font-semibold text-3xl'>
                                Fast, Efficient and Productive
                            </h3>
                            <p className='font-inter-tight font-medium text-xl '>You can do much more than just watching news. </p>
                        </div>
                    </div>

                    <div className=' py-10 p-6 md:p-12 rounded-3xl bg-white md:shadow-lg'>
                        <h2 className='font-inter-tight font-semibold text-3xl text-center text-black md:text-left'>Sign In</h2>
                        <p className='text'>to your account</p>
                        <div className='flex flex-col space-y-2 md:space-y-3  mt-2 md:mt-5'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input type='email' name='email' className='form-input' required/>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <PasswordInput/>
                            <Link to='/forgot-password' className='font-inter-tight text-right text-blue-600 font-semibold'>Forgot Password? </Link>


                            <div className="flex items-center my-6">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="mx-4 text-gray-500 text-sm font-semibold">Or with</span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>
                            <div className="flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0">
                                <button
                                    className="button-scale">
                                    <img src={GoogleIcon} alt="Google"/>
                                    <span className="font-inter-tight font-semibold">Sign In with Google</span>
                                </button>
                                <button
                                    className="button-scale">
                                    <img src={AppleIcon} alt="Apple"/>
                                    <span className="font-inter-tight font-semibold ">Sign In with Apple</span>
                                </button>
                            </div>
                            <button
                                className='flex-grow p-2  border border-blue-600 bg-blue-600 text-white rounded-md font-inter-tight font-semibold hover:bg-white hover:text-blue-600 '>Sign
                                In
                            </button>
                            <div className='flex items-center justify-center space-x-2'>
                                <p className=" text-sm text-gray-300 font-inter-tight font-semibold tracking-wide">Not a member yet? </p>
                                <Link to='/signup' className='font-inter-tight text-blue-600 font-semibold'>Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SignIn;