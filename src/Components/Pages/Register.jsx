import React, { useState } from "react";
import axios from "axios";

const Register = () => {
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

    const [error, setError] = useState(null); // Define setError function here

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
            const response = await axios.post('http://localhost:8080/user/auth/register', updatedFormData);
            console.log(response.data);
            window.location.href = '/login';
        } catch (error) {
            console.error('Error during registration:', error);
            if (error.response) {
                if (error.response.status === 400) {
                    setError(error.response.data); // Set error state with server response
                } else {
                    setError("An unexpected error occurred. Please try again later"); // Set generic error message
                }
            } else if (error.request) {
                setError("Network error: Please check your internet connection"); // Set network error message
            } else {
                setError("An unexpected error occurred. Please try again later"); // Set generic error message
            }
        }
    };

    return (
        <div className="mt-12 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg shadow p-6 space-y-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="username" value={formData.username} onChange={handleChange} id="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User name</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="mail" value={formData.mail} onChange={handleChange} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700" style={{ height: '35px', marginBottom:'20px', backgroundColor:'white'}}>
                        <input id="bordered-radio-1" type="radio" value="male" name="gender" onChange={handleChange} className="w-4 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900">Male</label>
                    </div>
                    <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700" style={{ height: '35px', marginBottom:'20px', backgroundColor:'white'}}>
                        <input id="bordered-radio-2" type="radio" value="female" name="gender" onChange={handleChange} className="w-4 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 ">Female</label>
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
                {error && <div className="text-red-500 text-center">{error}</div>}
                <div className="flex items-center justify-center">
                    <button 
                        type="submit" 
                        className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-20 py-3 text-center me-2 mb-2"
                    >
                        Register
                    </button>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">Already have an account? 
                    <a href="/login" className="text-blue-700 hover:underline dark:text-blue-500"> Login account</a>
                </div>
            </form>
        </div>
    );
};

export default Register;