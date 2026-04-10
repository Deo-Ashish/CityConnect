const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-lg font-medium transition";

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-800",
    secondary:
      "border hover:bg-gray-100",
    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;