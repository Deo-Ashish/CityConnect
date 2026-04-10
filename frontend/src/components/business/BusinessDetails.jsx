const BusinessDetails = ({ business }) => {
  return (
    <div className="space-y-6">

      <img
        src={business.images?.[0]}
        className="w-full h-64 object-cover rounded-xl"
      />

      <div>
        <h1 className="text-3xl font-bold">
          {business.name}
        </h1>

        <p className="text-gray-500">
          {business.category}
        </p>
      </div>

      <div className="flex gap-6 text-sm">
        <span>⭐ {business.rating}</span>
        <span>📍 {business.address}</span>
      </div>

      <p className="text-gray-700">
        {business.description}
      </p>

      <div className="flex gap-4">
        <a
          href={`tel:${business.phone}`}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Call
        </a>

        <a
          href={`https://wa.me/${business.phone}`}
          className="border px-4 py-2 rounded-lg"
        >
          WhatsApp
        </a>
      </div>

    </div>
  );
};

export default BusinessDetails;