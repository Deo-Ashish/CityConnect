import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

const MarkerComponent = ({ business }) => {
  const position = [
    business.location.coordinates[1],
    business.location.coordinates[0],
  ];

  return (
    <Marker position={position}>
      <Popup>
        <div className="space-y-1">
          <h3 className="font-semibold">{business.name}</h3>

          <p className="text-sm text-gray-500">{business.category}</p>

          <Link
            to={`/business/${business._id}`}
            className="text-blue-500 text-sm"
          >
            View Details
          </Link>
        </div>
      </Popup>
    </Marker>
  );
};

export default MarkerComponent;
