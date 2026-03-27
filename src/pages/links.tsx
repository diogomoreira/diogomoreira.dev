import { useEffect, useState } from "react";

const RAINDROP_COLLECTION_ID = "62311777"; // Replace with your collection ID
const RAINDROP_API_TOKEN = process.env.NEXT_PUBLIC_RAINDROP_TOKEN; // Store your token in .env.local
const PAGE_SIZE = 12;

interface RaindropItem {
  _id: number;
  title: string;
  link: string;
  excerpt?: string;
  cover?: string;
  tags?: string[];
}

const fetchRaindrops = async (collectionId: string, page: number, perPage: number) => {
  const res = await fetch(`https://api.raindrop.io/rest/v1/raindrops/${collectionId}?page=${page}&perpage=${perPage}`, {
    headers: {
      Authorization: `Bearer ${RAINDROP_API_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch bookmarks");
  const data = await res.json();
  return data.items as RaindropItem[];
};

export default function RaindropBookmarks() {
  const [bookmarks, setBookmarks] = useState<RaindropItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchRaindrops(RAINDROP_COLLECTION_ID, page + 1, PAGE_SIZE)
      .then(items => {
        setBookmarks(items);
        setHasMore(items.length === PAGE_SIZE);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Bookmarks</h1>
      {loading && <div className="loading loading-dots loading-lg" />}
      {error && <div className="alert alert-error">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bookmarks.map(b => (
          <div key={b._id} className="card bg-base-100 shadow-md">
            {b.cover && (
              <figure>
                <img src={b.cover} alt={b.title} className="w-full h-40 object-cover" />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title text-lg">
                <a href={b.link} target="_blank" rel="noopener noreferrer" className="link link-primary">
                  {b.title}
                </a>
              </h2>
              {b.excerpt && <p className="text-sm text-base-content/70 mt-2">{b.excerpt}</p>}
              {b.tags && b.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {b.tags.map(tag => (
                    <span key={tag} className="badge badge-outline badge-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <button
          className="btn btn-outline"
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0 || loading}
        >
          Previous
        </button>
        <button className="btn btn-outline" onClick={() => setPage(p => p + 1)} disabled={!hasMore || loading}>
          Next
        </button>
      </div>
    </div>
  );
}
