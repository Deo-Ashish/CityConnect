import { Link } from "react-router-dom";

const Page = () => {
  const categories = [
    "Electricians",
    "Plumbers",
    "Tutors",
    "Restaurants",
    "Cafes",
    "Repair Shops",
    "Gyms",
    "Beauty Salons",
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold">
          Discover Local Services Near You
        </h1>

        <p className="text-gray-600 mt-2">
          Find electricians, tutors, cafes & more in your city
        </p>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Browse Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;