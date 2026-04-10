import useBusiness from "../hooks/useBusiness";
import MapView from "../components/map/MapView";
import BusinessList from "../components/business/BusinessList";
import Sidebar from "../components/layout/Sidebar";

const Explore = () => {
  const { businesses } = useBusiness("nearby");

  return (
    <div className="flex gap-6">
      
      <Sidebar />

      <div className="flex-1 space-y-6">
        <MapView businesses={businesses} />
        <BusinessList businesses={businesses} />
      </div>

    </div>
  );
};

export default Explore;