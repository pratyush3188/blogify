import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input } from './index.js'; // Assuming these are your custom components
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const session = await authService.createAccount(data); // createAccount returns a session
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="bg-white min-h-screen flex justify-center font-sans p-4 pt-16">            <div className="w-full max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">

                {/* Left Column: Signup Form */}
                <div className="pr-0 md:pr-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Create your account
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Join Aurora Blog and start sharing your ideas.
                    </p>

                    {error && <p className="text-red-600 mb-4 text-center bg-red-100 p-3 rounded-md">{error}</p>}

                    <form onSubmit={handleSubmit(create)} className="space-y-6">
                        <div>
                            <Input
                                label="Display name"
                                placeholder="Enter your full name"
                                {...register("name", {
                                    required: true,
                                })}
                            />
                        </div>

                        <div>
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                            />
                        </div>

                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full justify-center py-3 px-4 text-sm font-medium"
                            >
                                Sign up
                            </Button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                            Log in
                        </Link>
                    </p>
                </div>

                {/* Right Column: "What you get" Info Box */}
                <div className="relative hidden md:block">
                    {/* Background glow effect */}
                    <div className="absolute -inset-12 bg-purple-300 opacity-20 rounded-full blur-3xl"></div>

                    {/* Content card */}
                    <div className="relative bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">What you get</h2>
                        <ul className="space-y-3 list-disc list-inside text-gray-600">
                            <li>Beautiful, simple writing experience</li>
                            <li>Shareable posts and profiles</li>
                            <li>Reader engagement and feedback</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
        </div>
    );
}

export default Signup;