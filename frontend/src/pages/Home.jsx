import { Link } from "react-router-dom";

const Home = () => {
  const categories = [
    "electrician",
    "plumber",
    "tutor",
    "restaurant",
    "cafe",
    "gym",
  ];

  return (
    <div className="space-y-8">
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">
          Find Local Services Near You
        </h1>

        <Link
          to="/explore"
          className="inline-block mt-4 bg-black text-white px-6 py-2 rounded"
        >
          Explore
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat}`}
            className="p-6 bg-white shadow rounded-xl"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;