import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiLock, FiLoader } from "react-icons/fi";
import authService from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
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
      const { confirmPassword, ...registerData } = data;
      registerData.role = "user"; // default role
      await authService.register(registerData);
      navigate("/login");
    } catch (err) {
      setError("root", {
        message: err.message || "Failed to register. Please try again.",
      });
    }
  };

  return (
<<<<<<< HEAD
    <div className="max-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
=======
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),transparent_24%),linear-gradient(180deg,#020612_0%,#01050f_100%)] flex items-center justify-center px-4 py-12">
>>>>>>> 34707b7 (improved some styling)
      <div className="w-full max-w-md">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-[0_32px_120px_-48px_rgba(14,59,102,0.55)] backdrop-blur-xl">
          <div className="mb-8 text-center space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-300/70">Register</p>
            <h1 className="text-3xl font-semibold text-white">Create your CityConnect account</h1>
            <p className="text-sm text-slate-400">
              Sign up to start adding reviews, saving favorites, and discovering trusted local businesses.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Username</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="johndoe"
                  disabled={isSubmitting}
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border text-white bg-slate-900 placeholder-slate-500 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
                    errors.username
                      ? "border-red-600 focus:ring-red-500"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-400">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Email address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
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
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border text-white bg-slate-900 placeholder-slate-500 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
                    errors.email
                      ? "border-red-600 focus:ring-red-500"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: "Password must include uppercase, lowercase, and a number",
                    },
                  })}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border text-white bg-slate-900 placeholder-slate-500 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
                    errors.password
                      ? "border-red-600 focus:ring-red-500"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Confirm password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`w-full pl-12 pr-4 py-3 rounded-2xl border text-white bg-slate-900 placeholder-slate-500 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
                    errors.confirmPassword
                      ? "border-red-600 focus:ring-red-500"
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
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
              className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-white hover:text-slate-200">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
