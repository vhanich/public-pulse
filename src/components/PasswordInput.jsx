import {useState} from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='w-full relative'>
            <input
                name='password'
                type={showPassword ? "password" : "text"}
                className="w-full border border-gray-300 rounded-lg px-4 py-2  focus:outline-blue-400"
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 "
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
}