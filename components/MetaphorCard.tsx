import type { MetaphorCardData } from '@/types/metaphor';

type MetaphorCardProps = {
  card: MetaphorCardData;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCopyCard: (card: MetaphorCardData) => void;
};

export function MetaphorCard({ card, isFavorite, onToggleFavorite, onCopyCard }: MetaphorCardProps) {
  return (
    <article className="soft-panel flex h-full flex-col p-4 shadow-[0_8px_20px_rgba(0,0,0,0.07)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="max-w-[82%] text-lg font-semibold leading-tight tracking-tight">{card.title}</h3>
        <button
          onClick={() => onToggleFavorite(card.id)}
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
            isFavorite ? 'border-[#ff5938]/50 bg-[#ff5938]/15 text-[#a8321b]' : 'border-black/10 bg-white/80 text-black/60'
          }`}
        >
          {isFavorite ? 'Saved' : 'Save'}
        </button>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/55">Concept</dt>
          <dd>{card.concept}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/55">Why it works</dt>
          <dd>{card.whyItWorks}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/55">Visual execution</dt>
          <dd>{card.visualExecution}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/55">Headline angle</dt>
          <dd className="italic">“{card.headlineAngle}”</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        {card.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-xs text-black/75">
            #{tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => onCopyCard(card)}
        className="mt-5 rounded-2xl border border-black/15 bg-white px-3 py-2 text-sm font-medium text-black/80 hover:bg-black hover:text-white"
      >
        Copy card
      </button>
    </article>
  );
}
