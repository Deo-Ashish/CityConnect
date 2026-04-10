import { useEffect, useState } from "react";
import useLocation from "./useLocation";

const API = "http://localhost:5000/api";

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

    const res = await fetch(
      `${API}/search/nearby?lat=${location.lat}&lng=${location.lng}`,
    );

    const data = await res.json();
    setBusinesses(data);
    setLoading(false);
  };

  const fetchByCategory = async () => {
    setLoading(true);

    const res = await fetch(`${API}/search?category=${value}`);

    const data = await res.json();
    setBusinesses(data);
    setLoading(false);
  };

  const fetchSingle = async () => {
    setLoading(true);

    const res = await fetch(`${API}/business/${value}`);

    const data = await res.json();
    setBusiness(data);
    setLoading(false);
  };

  return {
    businesses,
    business,
    loading,
  };
};

export default useBusiness;
