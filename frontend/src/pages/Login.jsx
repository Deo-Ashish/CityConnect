import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiLoader, FiArrowRight } from "react-icons/fi";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorRoot, setErrorRoot] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorRoot("");
    try {
      await login(data.email, data.password);
      navigate("/explore");
    } catch (err) {
      setErrorRoot(err.response?.data?.message || err.message || 'Error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper animate-fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">CityConnect</Link>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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
              autoComplete="current-password"
              placeholder="Password"
              disabled={isSubmitting}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="auth-input"
              style={errors.password ? { borderColor: '#f87171' } : {}}
            />
          </div>

          {(errors.email || errors.password || errorRoot) && (
            <div className="auth-error">
              {errorRoot || errors.email?.message || errors.password?.message}
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="auth-button">
            {isSubmitting ? <FiLoader className="auth-loading" /> : "Sign in"}
            {!isSubmitting && <FiArrowRight className="auth-button-icon" />}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register" className="auth-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
