import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Url } from '../service/constants';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        mail: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: { day: '', month: '', year: '' }
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { day, month, year, gender, confirmPassword, ...rest } = formData;
        if (!day || !month || !year) {
            console.error('Please select a valid date of birth.');
            return;
        }
        if (formData.password !== confirmPassword) {
            console.error('Password and confirm password do not match.');
            return;
        }
        const dateOfBirth = new Date(`${year}-${month}-${day}`);
        const isMale = gender === 'male';
        const updatedFormData = {
            ...rest,
            dateOfBirth: dateOfBirth.toISOString(),
            gender: isMale
        };

        try {
            const response = await axios.post(`${Url}user/auth/register`, updatedFormData);
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            if (error.response) {
                if (error.response.status === 400) {
                    setError(error.response.data);
                } else {
                    setError("An unexpected error occurred. Please try again later");
                }
            } else if (error.request) {
                setError("Network error: Please check your internet connection");
            } else {
                setError("An unexpected error occurred. Please try again later");
            }
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <img
                        src="https://source.unsplash.com/Mv9hjnEUHR4/600x800"
                        className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                        alt=""
                    />
                    <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    // required
                                    />
                                </div>
                                <div className="md:ml-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    // required
                                    />
                                </div>
                            </div>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="mail"
                                        type="mail"
                                        placeholder="Email"
                                        name="mail"
                                        value={formData.mail}
                                        onChange={handleChange}
                                    // required
                                    />
                                </div>
                                <div className="">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                                        Username
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    // required
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="phoneNumber">
                                    Phone Number
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                // required
                                />
                            </div>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    // required
                                    />
                                </div>
                                <div className="md:ml-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="******************"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    // required
                                    />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="day-month-year-container flex justify-between space-x-4 rounded-xl">
                                    <div>
                                        <select className="form-select w-24 rounded-xl text-center" name="day" value={formData.day} onChange={handleChange}>
                                            <option value="">Day</option>
                                            {[...Array(31)].map((_, index) => (
                                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select className="form-select w-24 rounded-xl text-center" name="month" value={formData.month} onChange={handleChange}>
                                            <option value="">Month</option>
                                            {[...Array(12)].map((_, index) => (
                                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select className="form-select w-24 rounded-xl text-center" name="year" value={formData.year} onChange={handleChange}>
                                            <option value="">Year</option>
                                            {[...Array(100)].map((_, index) => (
                                                <option key={index + 1920} value={index + 1920}>{index + 1920}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {error && <div className="text-red-500 text-sm mb-4 justify-center text-center">{error}</div>}
                            <div className="mb-6 text-center">
                                <button
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Register Account
                                </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <a
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    href="/reset"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="text-center">
                                <Link
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    to="/login"
                                >
                                    Already have an account? Login!
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;