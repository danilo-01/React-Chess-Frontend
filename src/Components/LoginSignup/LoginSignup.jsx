import React, { useState } from "react";
import Login from "./Forms/Login";
import { Signup } from "./Forms/Signup";
import "./loginSignup.scss";

const LoginSignup = () => {
  /* Login/signup section */
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-signup">
      <p className="warning">
        ***Login and signup features not yet implemented***
      </p>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} isLogin={isLogin} />
      ) : (
        <Signup setIsLogin={setIsLogin} isLogin={isLogin} />
      )}
    </div>
  );
};

export default LoginSignup;
