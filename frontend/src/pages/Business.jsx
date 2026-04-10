import { useParams } from "react-router-dom";
import useBusiness from "../hooks/useBusiness";
import BusinessDetails from "../components/business/BusinessDetails";
import BusinessReview from "../components/business/BusinessReview";

const Business = () => {
  const { id } = useParams();
  const { business, loading } = useBusiness("single", id);

  if (loading) return <div>Loading...</div>;
  if (!business) return null;

  return (
    <div className="space-y-8">
      <BusinessDetails business={business} />
      <BusinessReview
        businessId={business._id || business.id}
        reviews={business.reviews || []}
        onReviewAdded={() => {
          // Optionally refresh or update business details when a new review is created
        }}
      />
    </div>
  );
};

export default Business;