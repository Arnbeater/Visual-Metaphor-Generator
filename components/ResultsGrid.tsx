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
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold">Generated metaphors</h2>
          <p className="text-sm text-black/70">Structured ideas ready for concepting, campaigns, or content.</p>
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
