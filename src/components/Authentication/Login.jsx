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
    setError,
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

          <p className="text-center text-sm text-gray-500 mt-0">
            Don't have an account?{" "}
            <span className="text-blue-500 hover:underline cursor-pointer">
              <Link to="/signUp">SignIn</Link>
            </span>
          </p>
        </form>
      </div>
    </Container>
  );
}
