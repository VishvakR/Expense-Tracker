import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { isValidEmail, isValidPassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/userContext";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const { updateUser } = React.useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    if(!isValidEmail(email)){
      setError("Please enter a valid email");
      return;
    }

    if (!password || password.trim() === "") {
      setError("Please enter the password");
      return;
    }

    // if (!isValidPassword(password)) {
    //   setError("Password must be at least 8 characters long, include uppercase, lowercase, number, and special character");
    //   return;
    // }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });

      const { token, user } = response.data;
      if (token) {
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
  };

  return (
    <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
            <h3 className="text-xl semibold text-black">Welcome Back</h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6">
                Please enter your details.
            </p>

            <form onSubmit={handleLogin}>
              <Input 
                type="text"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeHolder="Nova@gmail.com"
               />

               <Input 
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeHolder="Min 8 characters"
               />

               {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

               <button type="submit" className="primary-btn">
                LOGIN
               </button>

                <p className="text-[13px] text-slate-600 mt-4">
                   Don't have an account?{" "}
                   <Link className="font-medium text-primary underline" to="/signup"> SignUp</Link>
                </p>
               
            </form>
        </div>
    </AuthLayout>
  );
}

export default Login;