import type { MetaphorCardData } from '@/types/metaphor';
import { MetaphorCard } from '@/components/MetaphorCard';

type ResultsGridProps = {
  cards: MetaphorCardData[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onCopyCard: (card: MetaphorCardData) => void;
};

export function ResultsGrid({ cards, favorites, onToggleFavorite, onCopyCard }: ResultsGridProps) {
  return (
    <section className="editorial-shell p-5 sm:p-6">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Generated Metaphors</h2>
          <p className="text-sm text-black/65">Structured cards for campaign, brand, and editorial concept development.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <MetaphorCard
            key={card.id}
            card={card}
            isFavorite={favorites.includes(card.id)}
            onToggleFavorite={onToggleFavorite}
            onCopyCard={onCopyCard}
          />
        ))}
      </div>
    </section>
  );
}
