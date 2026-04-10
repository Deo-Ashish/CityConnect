import { createContext, useContext, useEffect, useState } from "react";

export const LocationContext = createContext(); // ✅ export

export const LocationProvider = ({ children }) => {
  // ✅ receive children
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      },
    );
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        loading,
        getLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
