import type { MetaphorCardData } from '@/types/metaphor';

type MetaphorCardProps = {
  card: MetaphorCardData;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCopyCard: (card: MetaphorCardData) => void;
};

export function MetaphorCard({ card, isFavorite, onToggleFavorite, onCopyCard }: MetaphorCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-black/10 bg-white p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-tight">{card.title}</h3>
        <button
          onClick={() => onToggleFavorite(card.id)}
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isFavorite ? 'bg-amber-100 text-amber-900' : 'bg-black/5 text-black/70'
          }`}
        >
          {isFavorite ? 'Saved' : 'Save'}
        </button>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-medium text-black/70">Concept</dt>
          <dd>{card.concept}</dd>
        </div>
        <div>
          <dt className="font-medium text-black/70">Why it works</dt>
          <dd>{card.whyItWorks}</dd>
        </div>
        <div>
          <dt className="font-medium text-black/70">Visual execution</dt>
          <dd>{card.visualExecution}</dd>
        </div>
        <div>
          <dt className="font-medium text-black/70">Headline angle</dt>
          <dd className="italic">“{card.headlineAngle}”</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        {card.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-black/5 px-2.5 py-1 text-xs text-black/80">
            #{tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => onCopyCard(card)}
        className="mt-4 rounded-lg border border-black/10 px-3 py-2 text-sm font-medium text-black/80 hover:bg-black/5"
      >
        Copy card
      </button>
    </article>
  );
}
