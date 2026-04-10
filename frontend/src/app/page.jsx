import { Link } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

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
      {/* <section className="text-center py-10">
        <h1 className="text-4xl font-bold">
          Discover Local Services Near You
        </h1>

        <p className="text-gray-600 mt-2">
          Find electricians, tutors, cafes & more in your city
        </p>
      </section> */}

       <section className="text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4 ">
          Find and Book Local Services Near You
        </h2>
        <p className="text-gray-600 mb-8">
          Discover trusted electricians, food outlets, tutors, repair technicians, and more.
        </p>

        <div className="flex justify-center gap-2 max-w-3xl mx-auto">
          <div className="flex items-center bg-white px-3 py-2 rounded w-full">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for a service..."
              className="text-black ml-2 w-full outline-none bg-white"
            />
          </div>

          <div className="flex items-center bg-white px-3 py-2 rounded w-full">
            <MapPin className="text-gray-500" />
            <input
              type="text"
              placeholder="Enter your city"
              className="text-black ml-2 w-full outline-none bg-white"
            />
          </div>

          <button className="bg-blue-600 text-white px-6 rounded">
            Search
          </button>
        </div>
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
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition text-black"
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