import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { isValidEmail, isValidPassword } from "../../utils/helper";
import ProfilePhotoPicker from "../../components/input/ProfilePhotoPicker";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/userContext";

function SignUp() {
  const [ProfilePic, setProfilePic] = useState(null);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = React.useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = ""

    if(!Name){
      setError("Please enter your name")
      return;
    }

    if(!isValidEmail(Email)){
      setError("Please enter a valid email");
      return;
    }

    if (!Password || Password.trim() === "") {
      setError("Please enter the password");
      return;
    }

    if (!isValidPassword(Password)) {
      setError("Password must be at least 8 characters long, include uppercase, lowercase, number, and special character");
      return;
    }
    setError("");

    try{

      if(ProfilePic){
        const imgUploadRes = await uploadImage(ProfilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        username: Name,
        email: Email,
        password: Password,
        profileImageUrl
      });


      const { token, user } = response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } 
  } 

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us by Entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
        <ProfilePhotoPicker ProfilePic={ProfilePic} setProfilePic={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={Name}
              onChange={({ target }) => setName(target.value)}
              label="Full Name"
              placeHolder="John"
              type="text"
            />
            <Input 
              type="text"
              value={Email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeHolder="Nova@gmail.com"
            />
            <div className="col-span-1 md:col-span-2">
              <Input 
              type="password"
              value={Password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeHolder="Min 8 characters"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          
          <button type="submit" className="primary-btn">
          SIGN UP
          </button>

          <p className="text-[13px] text-slate-600 mt-4">
              Already have an account?{" "}
              <Link className="font-medium text-primary underline" to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default SignUp;