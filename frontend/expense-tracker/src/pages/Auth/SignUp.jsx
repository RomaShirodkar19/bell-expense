import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/Layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/Input"
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const { updateUser } = useContext(UserContext)

  const [error, setError] = useState(null);

  const navigate = useNavigate()

  // handle signup function

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl="";

    if(!fullName) {
      setError("Please enter your name");
      return;
    }

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");

    try{

      if(profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }



      const response= await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;

      if(token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please Try again.");
      }
    }
  }
  

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-3/4 md:h-3/4 mt-20 flex flex-col justify-center'>
        <h3 className='text-4xl font-semibold text-primary mb-3'>Create an Account</h3>
        <p className='text-lg font-semibold'>Let’s Get Started!</p>

        <form onSubmit={handleSignUp} >

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>



          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
          <Input
           value={fullName}
           onChange={({target})=> setFullName(target.value)}
           label="Full Name"
           placeholder="Alicia Keys"
           type="text"
          />

          <Input
          value={email}
          type="email"
          onChange={({ target }) => setEmail(target.value)}
          placeholder="abc@example.com"
          label="Email Address"
          />

          <div className='col-span-2'>
            <Input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Min 8 characters"
            label="Password"
            />
          </div>


          </div>

          {error && <p className='text-red-500 text-xs pb-0.5'>{error}</p>}
    
          <button type='submit' className='btn-primary'>
            Sign Up
          </button>
    
          <p className='text-white mt-3'>
            Already have an account?
            <Link className='px-2 text-primary font-medium hover:underline' to="/login">
              Login
            </Link>
          </p>

        </form>

      </div>

    </AuthLayout>
  )

}

export default SignUp