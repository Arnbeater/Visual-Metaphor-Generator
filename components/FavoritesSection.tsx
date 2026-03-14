import type { MetaphorCardData } from '@/types/metaphor';

type FavoritesSectionProps = {
  favorites: MetaphorCardData[];
  onCopyAllFavorites: () => void;
};

export function FavoritesSection({ favorites, onCopyAllFavorites }: FavoritesSectionProps) {
  if (!favorites.length) return null;

  return (
    <section className="editorial-shell p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Favorites ({favorites.length})</h2>
        <button
          onClick={onCopyAllFavorites}
          className="rounded-2xl border border-black/15 bg-white px-3 py-2 text-sm font-medium hover:bg-black hover:text-white"
        >
          Copy favorites
        </button>
      </div>
      <ul className="space-y-2 text-sm text-black/80">
        {favorites.map((item) => (
          <li key={item.id} className="soft-panel px-3 py-2.5">
            <span className="font-semibold">{item.title}</span> — {item.concept}
          </li>
        ))}
      </ul>
    </section>
  );
}
