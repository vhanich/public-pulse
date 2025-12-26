import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import GoogleIcon from '../assets/images/google.svg';
import GitHubIcon from '../assets/images/github.svg'
import '../index.css';
import PasswordInput from "../components/PasswordInput.jsx";
import NewsIcon from "../assets/images/news.png";
import {signInWithEmail, signInWithGitHub, signInWithGoogle} from "../firebase/authMethods";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const user = await signInWithEmail(email, password);
            console.log(user);
            if (user) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignWithGoogle = async () => {
        try {
            const user = await signInWithGoogle();
            console.log(user);
            if (user) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignInWithGitHub = async () => {
        try {
            const user = await signInWithGitHub();
            console.log(user);
            if (user) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='flex bg-gradient-to-b from-[#D2DDD5] to-white items-center justify-center min-h-screen p-4'>
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
                        <form onSubmit={handleSubmit}
                              className='flex flex-col space-y-2 md:space-y-3  mt-2 md:mt-5'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} type='email' name='email' className='form-input' required/>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <PasswordInput
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Link to='/forgot-password' className='font-inter-tight text-right text-emerald-600 font-semibold'>Forgot
                                Password? </Link>


                            <div className="flex items-center my-6">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="mx-4 text-gray-500 text-sm font-semibold">Or with</span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>
                            <div className="flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0">
                                <button
                                    onClick={handleSignWithGoogle}
                                    type="button"
                                    className="button-scale">
                                    <img src={GoogleIcon} alt="Google Icon"/>
                                    <span className="font-inter-tight font-semibold">Sign In with Google</span>
                                </button>
                                <button
                                    onClick={handleSignInWithGitHub}
                                    type="button"
                                    className="button-scale">
                                    <img src={GitHubIcon} alt="GitHub Icon"/>
                                    <span className="font-inter-tight font-semibold ">Sign In with GitHub</span>
                                </button>
                            </div>
                            <button

                                className='button-submit'>Sign In
                            </button>
                            <div className='flex items-center justify-center space-x-2'>
                                <p className=" text-sm text-gray-300 font-inter-tight font-semibold tracking-wide">Not a member yet? </p>
                                <Link to='/signup' className='font-inter-tight text-emerald-600 font-semibold'>Sign up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SignIn;
