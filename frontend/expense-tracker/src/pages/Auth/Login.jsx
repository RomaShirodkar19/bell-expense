import React, { useState } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Layouts/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate()

  //handle login

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

        try {
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
            email,
            password,
        });

        const { token, user } = response.data;

        if (token) {
            localStorage.setItem("token", token);
            updateUser(user);
            navigate("/dashboard");
        }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
  }
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-4xl font-semibold' style={{ color: "var(--color-primary)" }}>Welcome Back</h3>
        <p className='text-sm mt-[5px] mb-6'>Please fill the details to Login</p>

     <form onSubmit={handleLogin}>

      <Input
      value={email}
      type="email"
      onChange={({ target }) => setEmail(target.value)}
      placeholder="abc@example.com"
      label="Email Address"
      />

      <Input
      value={password}
      type="password"
      onChange={({ target }) => setPassword(target.value)}
      placeholder="Min 8 characters"
      label="Password"
      />

      {error && <p className='text-red-500 text-xs pb-0.5'>{error}</p>}

      <button type='submit' className='btn-primary'>
        Login
      </button>

      <p className='text-white mt-3'>
        Don't have an account?
        <Link className='px-2 text-primary font-medium hover:underline' to="/signup">
         Sign Up
        </Link>
      </p>

      </form>
    
      </div>

 

    </AuthLayout>
  )
}

export default Login