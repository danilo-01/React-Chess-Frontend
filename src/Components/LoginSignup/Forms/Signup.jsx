import React from "react";
import { useForm } from "react-hook-form";

export const Signup = ({ setIsLogin, isLogin }) => {
  // Signup form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchPassword = watch("password", false);
  const watchPasswordConfirmation = watch("passwordConfirmation", false);

  const onSubmit = (data) => console.log(data);
  return (
    <div className="signup">
      <h2>SIGNUP</h2>
      <form action="#" onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <input
          placeholder="username"
          {...register("username", { required: true })}
        />
        {errors.username && <span>Please enter a valid username</span>}

        {/* Password */}
        <input
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Please enter a password</span>}

        {/* Password confirmation */}
        <input
          placeholder="Re-enter password"
          {...register("passwordConfirmation", { required: true })}
        />
        {errors.passwordConfirmation && <span>Please enter a password</span>}

        {watchPassword &&
          watchPasswordConfirmation &&
          watchPassword !== watchPasswordConfirmation && (
            <span>Passwords must match</span>
          )}

        <input type="submit" />
      </form>
      <p>
        Already have an account?{" "}
        <a
          href="#"
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          Login here
        </a>
      </p>
    </div>
  );
};
