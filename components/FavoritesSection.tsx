import type { MetaphorCardData } from '@/types/metaphor';

type FavoritesSectionProps = {
  favorites: MetaphorCardData[];
  onCopyAllFavorites: () => void;
};

export function FavoritesSection({ favorites, onCopyAllFavorites }: FavoritesSectionProps) {
  if (!favorites.length) return null;

  return (
    <section className="rounded-xl border border-black/10 bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Favorites ({favorites.length})</h2>
        <button
          onClick={onCopyAllFavorites}
          className="rounded-lg border border-black/10 px-3 py-2 text-sm font-medium hover:bg-black/5"
        >
          Copy favorites
        </button>
      </div>
      <ul className="space-y-2 text-sm text-black/80">
        {favorites.map((item) => (
          <li key={item.id} className="rounded-lg bg-stone px-3 py-2">
            <span className="font-medium">{item.title}</span> — {item.concept}
          </li>
        ))}
      </ul>
    </section>
  );
}
