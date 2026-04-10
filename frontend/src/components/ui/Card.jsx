const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white shadow rounded-xl p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;