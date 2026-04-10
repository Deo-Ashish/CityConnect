import { useState } from "react";

const LocationSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`,
    );

    const data = await res.json();

    if (data.length > 0) {
      const lat = data[0].lat;
      const lng = data[0].lon;

      onSearch({ lat, lng });
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]"
    >
      <input
        placeholder="Search location..."
        className="bg-white px-4 py-2 rounded-lg shadow w-72"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default LocationSearch;
