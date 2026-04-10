import BusinessCard from "./BusinessCard";

const BusinessList = ({ businesses }) => {
  if (!businesses?.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No businesses found
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {businesses.map((business) => (
        <BusinessCard
          key={business._id}
          business={business}
        />
      ))}
    </div>
  );
};

export default BusinessList;