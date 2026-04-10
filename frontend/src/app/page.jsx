import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import useBusiness from "../hooks/useBusiness";
import BusinessList from "../components/business/BusinessList";

const categories = [
  "Electrician",
  "Plumber",
  "Tutor",
  "Restaurant",
  "Cafe",
  "Repair",
  "Gym",
  "Salon",
];

const Page = () => {
  const { businesses, loading } = useBusiness("nearby");

  return (
    <div className="space-y-12">
      <section className="rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-[0_32px_120px_-48px_rgba(14,59,102,0.55)] backdrop-blur-xl">
        <div className="max-w-4xl space-y-6">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-sky-200">
              City services
            </span>
            <h1 className="text-4xl font-semibold text-white">
              Discover trusted local businesses near you.
            </h1>
            <p className="text-slate-400 max-w-2xl">
              Explore curated categories, browse nearby listings, and connect with service providers across your city.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.7fr_0.9fr]">
            <div className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3">
              <Search className="text-slate-400" />
              <input
                type="text"
                placeholder="Search services, businesses or categories"
                className="bg-transparent w-full text-white outline-none placeholder:text-slate-500"
              />
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/10 transition hover:bg-sky-400"
            >
              Explore nearby
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Browse categories</p>
            <h2 className="text-2xl font-semibold text-white">Popular service types</h2>
          </div>
          <Link
            to="/explore"
            className="text-sm text-sky-300 hover:text-sky-100 transition"
          >
            View everything
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-center text-sm font-semibold text-white transition hover:border-sky-500/40 hover:bg-slate-900"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Featured nearby</p>
            <h2 className="text-2xl font-semibold text-white">Top local businesses</h2>
          </div>
          <span className="rounded-full bg-slate-900/70 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
            {loading ? "Loading..." : `${businesses?.length || 0} listings`}
          </span>
        </div>

        <div className="mt-6">
          <BusinessList businesses={businesses} />
        </div>
      </section>
    </div>
  );
};

export default Page;