import BusinessCard from "./BusinessCard";

const BusinessList = ({ businesses }) => {
  if (!businesses?.length) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-slate-950/95 p-10 text-center text-slate-400">
        No businesses found in this category.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {businesses.map((business) => (
        <BusinessCard key={business._id} business={business} />
      ))}
    </div>
  );
};

export default BusinessList;