import React, { useState } from "react";
import axios from "axios";
import { API } from "../../utils/config";
import { useNavigate } from 'react-router-dom';

const Forgotpwbox = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        error: ''
    });

    const { email, error } = formData;

    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };

    // console.log(formData); //🔥 testing

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`${API.FORGOTPW}`, { email })
            .then(res => {
                if (res.status === 200) {
                    navigate('/login');
                }
            }).catch(err => {
                setFormData({ ...formData, error: "Failed to send the email. Please check your email." });
            });
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-4xl font-semibold text-center text-purple-700">
                    Forgot Password
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            onChange={handleChange('email')}
                            value={email}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    {error && <div className="text-red-500 mb-2">{error}</div>}
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Send Email
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Back to login page{" "}
                    <a
                        href="/login"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        login page
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Forgotpwbox;
