import { Link } from "react-router-dom";

const BusinessCard = ({ business }) => {
  return (
    <Link to={`/business/${business._id}`}>
      <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/95 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.7)] transition hover:-translate-y-0.5 hover:border-sky-500/30 hover:bg-slate-900">
        <div className="h-44 overflow-hidden rounded-t-[28px] bg-slate-900">
          <img
            src={business.images?.[0] || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4="}
            alt={business.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
              {business.category}
            </p>
            <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">
              {business.rating?.toFixed(1) || "0.0"} ⭐
            </span>
          </div>

          <h3 className="text-xl font-semibold text-white">{business.name}</h3>

          <p className="line-clamp-2 text-sm text-slate-400">{business.description || "A trusted local service provider."}</p>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>{business.address?.split(",")[0] || "Nearby"}</span>
            <span className="text-slate-300">{business.reviewsCount || 0} reviews</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BusinessCard;