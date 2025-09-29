import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input } from "./index"; // Assuming these are your custom components
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="bg-white min-h-screen flex items-center justify-center font-sans p-4">
            <div className="w-full max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">

                    {/* Left Column: Login Form */}
                    <div className="pr-0 md:pr-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            Welcome back
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Log in to continue writing and exploring posts.
                        </p>
                        
                        {/* Display error message if it exists */}
                        {error && <p className="text-red-600 mb-4 text-center bg-red-100 p-3 rounded-md">{error}</p>}

                        <form onSubmit={handleSubmit(login)} className="space-y-6">
                            <div>
                                <Input
                                    label="Email"
                                    placeholder="Enter your email"
                                    type="email"
                                    // Note: Your custom <Input> component needs to be styled to match the design.
                                    // It should accept Tailwind classes or have them built-in.
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
                                    // Note: Your custom <Input> component needs to be styled to match the design.
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    // Added styling classes to match the design. Your <Button> component
                                    // should merge these with its default classes.
                                    className="w-full justify-center py-3 px-4 text-sm font-medium"
                                >
                                    Log in
                                </Button>
                            </div>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-600">
                            New here?{' '}
                            <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                                Create an account
                            </Link>
                        </p>
                    </div>

                    {/* Right Column: "Why log in?" Info Box */}
                    <div className="relative hidden md:block">
                        {/* Background glow effect */}
                        <div className="absolute -inset-12 bg-purple-300 opacity-20 rounded-full blur-3xl"></div>

                        {/* Content card */}
                        <div className="relative bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Why log in?</h2>
                            <ul className="space-y-3 list-disc list-inside text-gray-600">
                                <li>Publish and manage your posts</li>
                                <li>Discover writers you love</li>
                                <li>Join conversations</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;