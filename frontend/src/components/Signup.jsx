import React, { useState } from 'react';
import Vector from "../assets/4957136.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.files ? e.target.files[0] : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("firstName", formData.firstName);
        data.append("lastName", formData.lastName);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("contactNumber", formData.contactNumber);
        data.append("userImage", formData.userImage);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/users/signup`, data);
            console.log(response);
            // If signup is successful, navigate to the login page
            if (response.status === 201) { // Check if the response indicates a successful signup
                navigate('/login');
            }
        } catch (error) {
            console.log(error);            
        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='bg-white w-4/5 flex shadow-2xl rounded-xl'>
                <div className='w-1/2'>
                    <img src={Vector} alt="" className='w-full rounded-s-xl' />
                </div>
                <div className='w-1/2 flex justify-center'>
                    <div className='w-full items-center flex flex-col justify-center'>
                        <h1 className='text-center text-2xl font-semibold'>Welcome!, Signup</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='my-5 w-full grid grid-cols-2 gap-3'>
                                <div>
                                    <label htmlFor="">First name</label>
                                    <input type="text" name='firstName' placeholder='First Name' className='block p-2 my-2 outline-none border rounded' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="">Last name</label>
                                    <input type="text" name='lastName' placeholder='Last Name' className='block p-2 my-2 outline-none border rounded' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="">Email</label>
                                    <input type="email" name='email' placeholder='Email' className='block p-2 my-2 outline-none border rounded' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="">Password</label>
                                    <input type="password" name='password' placeholder='Password' className='block p-2 outline-none border rounded my-2' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="">Contact No.</label>
                                    <input type="number" name='contactNumber' placeholder='Contact No.' className='block p-2 outline-none border rounded my-2' onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="">Profile Pic</label>
                                    <input type="file" name='userImage' className='block p-2 w-3/4 text-xs outline-none border rounded my-2' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='w-full'>
                                <button type='submit' className='p-2 bg-blue-600 w-full active:bg-blue-800 rounded text-white py-1 my-4'>Signup</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
