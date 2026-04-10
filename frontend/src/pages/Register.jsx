import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiLock, FiLoader } from "react-icons/fi";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
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
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      console.log(data);
      // Handle registration logic here
    } catch (err) {
      setError("root", {
        message: "Failed to register. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Register</h1>
          <p className="text-gray-400 text-sm">
            Create a new account to get started
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Full name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
              <input
                type="text"
                placeholder="John Doe"
                disabled={isSubmitting}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className={`w-full pl-11 pr-4 py-2.5 bg-gray-900 border text-white placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                  errors.name
                    ? "border-red-600 focus:ring-red-500"
                    : "border-gray-800 hover:border-gray-700 focus:border-gray-700 focus:ring-white"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

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
                className={`w-full pl-11 pr-4 py-2.5 bg-gray-900 border text-white placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                  errors.email
                    ? "border-red-600 focus:ring-red-500"
                    : "border-gray-800 hover:border-gray-700 focus:border-gray-700 focus:ring-white"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
              <input
                type="password"
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
                    message:
                      "Password must have uppercase, lowercase, and number",
                  },
                })}
                className={`w-full pl-11 pr-4 py-2.5 bg-gray-900 border text-white placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                  errors.password
                    ? "border-red-600 focus:ring-red-500"
                    : "border-gray-800 hover:border-gray-700 focus:border-gray-700 focus:ring-white"
                }`}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Confirm password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-500 pointer-events-none" />
              <input
                type="password"
                placeholder="••••••••"
                disabled={isSubmitting}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full pl-11 pr-4 py-2.5 bg-gray-900 border text-white placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                  errors.confirmPassword
                    ? "border-red-600 focus:ring-red-500"
                    : "border-gray-800 hover:border-gray-700 focus:border-gray-700 focus:ring-white"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Root Error */}
          {errors.root && (
            <div className="p-3 bg-red-950 border border-red-800 rounded-lg">
              <p className="text-sm text-red-400">{errors.root.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-7 bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-500">or</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="px-4 py-2.5 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-colors text-gray-300 text-sm font-medium"
            >
              Google
            </button>
            <button
              type="button"
              className="px-4 py-2.5 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-gray-900 transition-colors text-gray-300 text-sm font-medium"
            >
              GitHub
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-7">
          Already have an account?{" "}
          <a
            href="#"
            className="text-white hover:text-gray-300 transition-colors font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
