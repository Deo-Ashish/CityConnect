/* eslint-disable react-hooks/incompatible-library */
import { useForm } from "react-hook-form";
import authService from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { FiLoader, FiArrowRight } from "react-icons/fi";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [errorRoot, setErrorRoot] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, username, ...rest } = data;
      const registerData = { ...rest, name: username, role: 'user' };
      await authService.register(registerData);
      navigate("/login");
    } catch (err) {
      setErrorRoot(err.message || "Failed to register. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper animate-fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">CityConnect</Link>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join us to start discovering.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="auth-input-group">
            <input
              type="text"
              autoComplete="username"
              placeholder="Username"
              disabled={isSubmitting}
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className="auth-input"
              style={errors.username ? { borderColor: '#f87171' } : {}}
            />
          </div>

          <div className="auth-input-group">
            <input
              type="email"
              autoComplete="email"
              placeholder="Email address"
              disabled={isSubmitting}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className="auth-input"
              style={errors.email ? { borderColor: '#f87171' } : {}}
            />
          </div>

          <div className="auth-input-group">
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              disabled={isSubmitting}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="auth-input"
              style={errors.password ? { borderColor: '#f87171' } : {}}
            />
          </div>

          <div className="auth-input-group">
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Confirm password"
              disabled={isSubmitting}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="auth-input"
              style={errors.confirmPassword ? { borderColor: '#f87171' } : {}}
            />
          </div>

          {(errors.username || errors.email || errors.password || errors.confirmPassword || errorRoot) && (
            <div className="auth-error">
              {errorRoot || errors.username?.message || errors.email?.message || errors.password?.message || errors.confirmPassword?.message}
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="auth-button">
            {isSubmitting ? <FiLoader className="auth-loading" /> : "Sign Up"}
            {!isSubmitting && <FiArrowRight className="auth-button-icon" />}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
