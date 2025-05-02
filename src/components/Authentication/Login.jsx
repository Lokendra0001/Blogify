import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Input, Button } from "../Index";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/authService";
import { addUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const submit = async (data) => {
    try {
      const session = await authService.loginAccount(data);
      console.log(session);
      if (session) {
        const user = await authService.getCurrentuser();
        if (user) {
          dispatch(addUser(user));
          navigate("/");
        } else {
          setErr("Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      // If rate limit exceeded, show the retry message
      if (error.message.includes("Rate limit")) {
        setErr(
          "You have exceeded the rate limit. Please try again after some time."
        );
      } else {
        setErr(error?.message || "Login failed. Please try again.");
      }
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const currentUser = await authService.getCurrentuser();

      if (currentUser) {
        await authService.logoutAccount();
        console.log("Logged out successfully");
      }

      // Now proceed to log in
      authService.loginWithGoogle();
    } catch (error) {
      console.error("Error during Google login:", error);
      setErr("Google login failed. Please try again.");
    }
  };

  // Handle Github login
  const handleGithubLogin = () => {
    try {
      authService.loginWithGithub();
    } catch (error) {
      console.error("Github login failed:", error);
      setErr("Github login failed. Please try again.");
    }
  };

  return (
    <Container>
      <div className="flex justify-center items-center px-2 py-6 bg-slate-50">
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-3 bg-white shadow-lg rounded-lg p-6 w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Login Now
          </h2>

          {err && <p>{err}</p>}

          <Input
            label="Email :"
            type="email"
            placeholder="e.g : abc@gmail.com"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm pl-2">{errors.email.message}</p>
          )}
          <Input
            label="Password :"
            type="password"
            placeholder="e.g : 23lw*********"
            className=" p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm pl-2">
              {errors.password.message}
            </p>
          )}

          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 mt-3 text-white font-semibold py-2 rounded-md"
            name="LogIn"
          />

          <p className="text-gray-300 text-center">
            ----------- or -----------
          </p>

          <div className="space-y-3">
            {/* Google Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleGoogleLogin();
              }}
              className="flex items-center justify-center bg-white hover:bg-gray-50 border border-gray-300 transition-colors duration-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm w-full cursor-pointer"
            >
              <svg
                className="w-5 h-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>

            {/* GitHub Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleGithubLogin();
              }}
              className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 transition-colors duration-300 text-white font-medium py-2 px-4 rounded-md shadow-sm w-full cursor-pointer"
            >
              <svg
                className="w-5 h-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                type="button"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Sign in with GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-0">
            Don't have an account?{" "}
            <span className="text-blue-500 hover:underline cursor-pointer">
              <Link to="/signUp">SignUp</Link>
            </span>
          </p>
        </form>
      </div>
    </Container>
  );
}
