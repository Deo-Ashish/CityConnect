import { useEffect, useState } from "react";
import useLocation from "./useLocation";
import businessService from "../services/businessService";

const useBusiness = (type, value) => {
  const { location } = useLocation();

  const [businesses, setBusinesses] = useState([]);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "nearby" && location) {
      fetchNearby();
    }

    if (type === "category" && value) {
      fetchByCategory();
    }

    if (type === "single" && value) {
      fetchSingle();
    }
  }, [type, value, location]);

  const fetchNearby = async () => {
    setLoading(true);

    const data = await businessService.getNearby(location.lat, location.lng);
    setBusinesses(data.data || data);
    setLoading(false);
  };

  const fetchByCategory = async () => {
    setLoading(true);

    const data = await businessService.getByCategory(value);
    setBusinesses(data.data || data);
    setLoading(false);
  };

  const fetchSingle = async () => {
    setLoading(true);

    const data = await businessService.getById(value);
    setBusiness(data.data || data);
    setLoading(false);
  };

  return {
    businesses,
    business,
    loading,
  };
};

export default useBusiness;
