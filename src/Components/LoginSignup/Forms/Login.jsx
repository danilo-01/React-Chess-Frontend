import React from "react";
import { useForm } from "react-hook-form";

const Login = ({ setIsLogin, isLogin }) => {
  // Login form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="login">
      <h2>LOGIN</h2>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <input
          placeholder="username"
          {...register("username", { required: true })}
        />
        {errors.username && <span>Please enter a username</span>}

        {/* Password */}
        <input
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Please enter a password</span>}

        <input type="submit" />
      </form>
      <p>
        Don't have an account?{" "}
        <a
          href="#"
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          Signup here
        </a>
      </p>
    </div>
  );
};

export default Login;
