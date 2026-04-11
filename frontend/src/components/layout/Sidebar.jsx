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
    <aside className="hidden lg:block w-72 shrink-0 rounded-[32px] border border-white/10 bg-slate-950/95 p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)] sticky top-6 h-[calc(100vh-3rem)] overflow-y-auto">

      <div className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Browse</p>
          <h2 className="text-xl font-semibold text-white">Categories</h2>
        </div>

        <div className="grid gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-sky-500/40 hover:bg-slate-900"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
