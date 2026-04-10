import { MapContainer, TileLayer } from "react-leaflet";

import { useState } from "react";
import Marker from "./Marker";
import LocationSearch from "./LocationSearch";

const MapView = ({ businesses = [], center }) => {
  const [mapCenter, setMapCenter] = useState(center || [22.9734, 78.6569]);

  const handleSearch = ({ lat, lng }) => {
    setMapCenter([lat, lng]);
  };

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden relative">
      <LocationSearch onSearch={handleSearch} />

      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {businesses.map((business) => (
          <Marker key={business._id} business={business} />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
