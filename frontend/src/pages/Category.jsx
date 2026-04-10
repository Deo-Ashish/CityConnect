import { useParams } from "react-router-dom";
import useBusiness from "../hooks/useBusiness";
import BusinessList from "../components/business/BusinessList";

const Category = () => {
  const { name } = useParams();
  const { businesses, loading } = useBusiness(
    "category",
    name
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 capitalize">
        {name}
      </h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <BusinessList businesses={businesses} />
      )}
    </div>
  );
};

export default Category;