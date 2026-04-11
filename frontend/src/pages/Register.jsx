/* eslint-disable react-hooks/incompatible-library */
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FiLoader, FiArrowRight, FiUser, FiBriefcase } from "react-icons/fi";
import { API_BASE } from "../services/api";
import { useState } from "react";

const ROLES = [
  {
    value: "user",
    label: "Customer",
    description: "Discover and review local services",
    icon: FiUser,
  },
  {
    value: "business",
    label: "Business Owner",
    description: "List and manage your business",
    icon: FiBriefcase,
  },
];

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorRoot, setErrorRoot] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setErrorRoot("");
    try {
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword: _, ...rest } = data;
      const registerData = { ...rest, role: selectedRole };

      // Register the user
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Registration failed");

      // Auto-login with the returned token
      await login(data.email, data.password);
      navigate("/");
    } catch (err) {
      setErrorRoot(err.message || "Failed to register. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper animate-fade-in">
      <div className="auth-card" style={{ maxWidth: "480px" }}>
        <div className="auth-header">
          <Link to="/" className="auth-logo">CityConnect</Link>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join us to start discovering.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {/* Role selector */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {ROLES.map(({ value, label, description, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setSelectedRole(value)}
                style={{
                  padding: "1rem",
                  borderRadius: "0.875rem",
                  border: `1px solid ${selectedRole === value ? "var(--text-main)" : "var(--border-color)"}`,
                  background: selectedRole === value ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.2)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon
                  size={20}
                  style={{
                    marginBottom: "0.5rem",
                    color: selectedRole === value ? "var(--text-main)" : "#64748b",
                  }}
                />
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: selectedRole === value ? "var(--text-main)" : "#94a3b8", marginBottom: "0.2rem" }}>
                  {label}
                </p>
                <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.4 }}>
                  {description}
                </p>
              </button>
            ))}
          </div>

          {/* Full Name */}
          <div className="auth-input-group">
            <input
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              disabled={isSubmitting}
              {...register("name", {
                required: "Full name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              })}
              className="auth-input"
              style={errors.name ? { borderColor: "#f87171" } : {}}
            />
          </div>

          {/* Email */}
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
              style={errors.email ? { borderColor: "#f87171" } : {}}
            />
          </div>

          {/* Password */}
          <div className="auth-input-group">
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              disabled={isSubmitting}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              className="auth-input"
              style={errors.password ? { borderColor: "#f87171" } : {}}
            />
          </div>

          {/* Confirm Password */}
          <div className="auth-input-group">
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Confirm password"
              disabled={isSubmitting}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              className="auth-input"
              style={errors.confirmPassword ? { borderColor: "#f87171" } : {}}
            />
          </div>

          {(errors.name || errors.email || errors.password || errors.confirmPassword || errorRoot) && (
            <div className="auth-error">
              {errorRoot || errors.name?.message || errors.email?.message || errors.password?.message || errors.confirmPassword?.message}
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="auth-button">
            {isSubmitting ? <FiLoader className="auth-loading" /> : "Create account"}
            {!isSubmitting && <FiArrowRight />}
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
