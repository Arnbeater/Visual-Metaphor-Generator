import type { GeneratorOptions, MetaphorCardData } from '@/types/metaphor';

export type SavedConcept = {
  id: string;
  name: string;
  theme: string;
  options: GeneratorOptions;
  cards: MetaphorCardData[];
  savedAt: string;
};

type SavedConceptsSectionProps = {
  savedConcepts: SavedConcept[];
  onLoadConcept: (conceptId: string) => void;
  onDeleteConcept: (conceptId: string) => void;
  onCopyConcept: (conceptId: string) => void;
};

export function SavedConceptsSection({
  savedConcepts,
  onLoadConcept,
  onDeleteConcept,
  onCopyConcept,
}: SavedConceptsSectionProps) {
  if (!savedConcepts.length) return null;

  return (
    <section className="editorial-shell p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Saved Concepts ({savedConcepts.length})</h2>
      </div>

      <ul className="space-y-3">
        {savedConcepts.map((concept) => (
          <li key={concept.id} className="soft-panel p-3 sm:p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{concept.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.08em] text-black/55">
                  {concept.theme} · {concept.options.tone} · {concept.options.medium} · {concept.cards.length} cards
                </p>
                <p className="mt-1 text-xs text-black/50">Saved {new Date(concept.savedAt).toLocaleString()}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onLoadConcept(concept.id)}
                  className="rounded-xl border border-black/15 bg-white px-3 py-1.5 text-xs font-medium hover:bg-black hover:text-white"
                >
                  Load
                </button>
                <button
                  onClick={() => onCopyConcept(concept.id)}
                  className="rounded-xl border border-black/15 bg-white px-3 py-1.5 text-xs font-medium hover:bg-black hover:text-white"
                >
                  Copy
                </button>
                <button
                  onClick={() => onDeleteConcept(concept.id)}
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
