import React, {useState} from "react";
import axios from "axios";
import {API} from "../../utils/config";
import { useNavigate } from 'react-router-dom';

const Signupbox = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, error } = formData;

    console.log('signup:  ', formData); //🔥 testing
    
    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`${API.SIGNUP}`, {
            name,
            email,
            password
        }).then((res) => {
            if (res.status === 200) {
                setFormData({ ...formData, error: '', success: true });
                navigate('/');
            } 
        }).catch((err) => {
            if (err.response && err.response.status === 400) {
                setFormData({ ...formData, error: '이미 존재하는 이메일입니다.', success: false });
            } else {
                setFormData({ ...formData, error: "An error occurred", success: false });
            }
        });
    };
    
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-4xl font-semibold text-center text-purple-700">
                   Sign up
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Name
                        </label>
                        <input
                            type="name"
                            value={name}
                            onChange={handleChange('name')}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleChange('email')}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={handleChange('password')}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Sign up
                        </button>
                    </div>
                </form>
                {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Back to {" "}
                    <a
                        href="/"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        login page 
                    </a>
                </p>
            </div>
        </div>
    );
    
}

export default Signupbox;