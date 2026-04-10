import { Link } from "react-router-dom";

const BusinessCard = ({ business }) => {
  return (
    <Link to={`/business/${business._id}`}>
      <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
        
        <img
          src={business.images?.[0] || "/assets/placeholder.jpg"}
          alt={business.name}
          className="w-full h-40 object-cover"
        />

        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg">
            {business.name}
          </h3>

          <p className="text-sm text-gray-500">
            {business.category}
          </p>

          <div className="flex justify-between text-sm">
            <span>⭐ {business.rating || 4.2}</span>
            <span className="text-gray-500">
              {business.distance || "Nearby"}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default BusinessCard;