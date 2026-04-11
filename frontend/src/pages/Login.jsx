<<<<<<< HEAD
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
=======
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const { login, register } = useAuth();
  const navigate = useNavigate();
>>>>>>> 9abce5f (code written again)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      await login(data);
      navigate("/");
=======
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
      navigate('/explore');
>>>>>>> 9abce5f (code written again)
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="max-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
=======
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_22%),linear-gradient(180deg,#020612_0%,#01050f_100%)] flex items-center justify-center px-4 py-12">
>>>>>>> 34707b7 (improved some styling)
      <div className="w-full max-w-md">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-[0_32px_120px_-48px_rgba(14,59,102,0.55)] backdrop-blur-xl">
          <div className="mb-8 text-center space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300/70">Sign in</p>
            <h1 className="text-3xl font-semibold text-white">Welcome back to CityConnect</h1>
            <p className="text-sm text-slate-400">
              Sign in to access businesses, reviews, and your profile.
            </p>
          </div>

<<<<<<< HEAD
        {/* Form Card */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Email address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
              <input
                type="email"
                placeholder="you@example.com"
                disabled={isSubmitting}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`w-full pl-11 pr-4 py-2.5 bg-slate-900 border text-white placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                  errors.email
                    ? "border-red-600 focus:ring-red-500"
                    : "border-gray-800 hover:border-gray-700 focus:border-gray-700 focus:ring-white"
                }`}
              />
=======
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Email address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-4 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border text-white bg-slate-900 placeholder-slate-500 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-sky-400/60 disabled:opacity-60 disabled:cursor-not-allowed ${
                    errors.email
                      ? "border-red-600 focus:ring-red-500"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                />
              </div>
>>>>>>> 34707b7 (improved some styling)
              {errors.email && (
                <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-4 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border text-white bg-slate-900 placeholder-slate-500 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-sky-400/60 disabled:opacity-60 disabled:cursor-not-allowed ${
                    errors.password
                      ? "border-red-600 focus:ring-red-500"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1.5">{errors.password.message}</p>
              )}
            </div>

            {errors.root && (
              <div className="rounded-2xl border border-red-700/60 bg-red-950/70 p-3 text-sm text-red-200">
                {errors.root.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-7">
            Don’t have an account?{" "}
            <Link to="/register" className="text-sky-300 hover:text-sky-200 font-semibold transition-colors">
              Create account
            </Link>
          </p>
=======
    <div className="animate-fade-in container" style={{ padding: '4rem 1rem', display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="input-group">
                <label className="input-label">I am a...</label>
                <select 
                  className="input-field" 
                  value={formData.role} 
                  onChange={e => setFormData({...formData, role: e.target.value})}
                >
                  <option value="user">Customer (Looking for services)</option>
                  <option value="business">Business (Offering services)</option>
                </select>
              </div>
            </>
          )}
          
          <div className="input-group">
            <label className="input-label">Email</label>
            <input 
              type="email" 
              className="input-field" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </button>
>>>>>>> 9abce5f (code written again)
        </div>
      </div>
    </div>
  );
}
