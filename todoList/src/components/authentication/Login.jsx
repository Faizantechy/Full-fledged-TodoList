import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { account } from "../appwrite/appwrite";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [email, setemail] = useState();
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setisLoading(true);

    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log(error, "No Sessions");
      setisLoading(false);
    }
    try {
      await account.createEmailPasswordSession(email.trim(), password);
      console.log("user logged in   Successfully");
      navigate("/layout");
    } catch (error) {
      console.log("Error Signing up the User", error);
      navigate("/signup");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full mt-[10rem] flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656085547/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_hghpbl.gif"
          className="w-[600px] object-cover"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
            Welcome Back: Login
          </h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1 text-gray-600 text-sm sm:text-base">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600 text-sm sm:text-base">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold text-sm sm:text-base"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-4 md:p-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnz1z_YpbKgX5qnwvLzgWnDuLvwYTtOQSDwtHDvZYII4ZsxoyVbPbSpEPqnw9isimM8cQ&usqp=CAU"
            alt="Sign up illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
