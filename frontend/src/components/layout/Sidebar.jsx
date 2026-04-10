import { Link } from "react-router-dom";

const categories = [
  "Electrician",
  "Plumber",
  "Tutor",
  "Restaurant",
  "Cafe",
  "Gym",
  "Salon",
  "Repair",
];

const Sidebar = () => {
  return (
    <aside className="w-64 border-r p-4 h-screen sticky top-0">
      <h2 className="font-semibold mb-4">Categories</h2>

      <div className="flex flex-col gap-2">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat.toLowerCase()}`}
            className="p-2 rounded hover:bg-gray-100"
          >
            {cat}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
