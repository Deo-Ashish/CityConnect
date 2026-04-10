import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";

const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error(
      "useLocation must be used within LocationProvider"
    );
  }

  return context;
};

export default useLocation;