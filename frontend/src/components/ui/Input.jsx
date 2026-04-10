const Input = ({
  label,
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      <input
        type={type}
        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;