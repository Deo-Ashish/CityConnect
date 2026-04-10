const BusinessDetails = ({ business }) => {
  return (
    <div className="space-y-6 rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-[0_24px_90px_-42px_rgba(0,0,0,0.75)]">
      <img
        src={business.images?.[0] || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4="}
        className="w-full rounded-[28px] object-cover shadow-lg shadow-slate-950/20"
      />

      <div className="space-y-3">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300/70">{business.category}</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">{business.name}</h1>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              {business.description}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-4 text-right">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Rating</p>
            <p className="mt-2 text-2xl font-semibold text-white">{business.rating?.toFixed(1) || "0.0"}</p>
            <p className="text-sm text-slate-400">{business.reviewsCount || 0} reviews</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 text-sm text-slate-300">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-slate-500">Address</p>
            <p className="mt-2 text-white">{business.address}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-slate-500">Contact</p>
            <p className="mt-2 text-white">{business.phone}</p>
            {business.email && <p className="text-slate-400">{business.email}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={`tel:${business.phone}`}
          className="inline-flex items-center justify-center rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
        >
          Call business
        </a>
        <a
          href={`https://wa.me/${business.phone}`}
          className="inline-flex items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-white transition hover:border-slate-600"
        >
          WhatsApp chat
        </a>
      </div>
    </div>
  );
};

export default BusinessDetails;