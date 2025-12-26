import ProfileIcon from '../assets/images/profile.svg';
import React, {useEffect, useRef, useState} from "react";
import {auth} from "@/firebase/config.js";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {Loader2, LogIn, LogOut} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsOpen(false);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsOpen(prev => !prev);
    };


    return (
        <header
            className="z-50 w-full bg-white/90 backdrop-blur-sm border-b border-emerald-900/5 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] px-6 py-3 flex items-center justify-between"
        >
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-800">
                    Eco<span className="text-emerald-600">Pulse</span>
                </span>
            </div>

            <div className="relative flex items-center gap-3" ref={dropdownRef}>
                {loading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-600"/>
                ) : user ? (
                    <>
                        <button
                            onClick={toggleMenu}
                            className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 focus:outline-none"
                        >
                            <img
                                src={user.photoURL || ProfileIcon}
                                alt="avatar"
                                className="w-8 h-8 rounded-full border border-emerald-200 object-cover"
                                onError={(e) => {
                                    e.target.src = ProfileIcon
                                }}
                            />
                            <span className="text-sm font-medium text-gray-700 hidden md:block">
                                {user.displayName || "User"}
                            </span>
                        </button>

                        {isOpen && (
                            <div
                                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60] origin-top-right">
                                <div className="px-4 py-2 border-b border-gray-50 mb-1 text-center sm:text-left">
                                    <p className="text-sm font-semibold text-gray-700 truncate">{user.email}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={16}/> Log Out
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <button
                        onClick={() => navigate('/signin')}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 font-medium text-sm"
                    >
                        <LogIn size={16}/>
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}
